using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Kingsmen.CoreServices.Interfaces;
using Kingsmen.Domain.Dtos;
using Kingsmen.Domain.Entities;
using Kingsmen.Infrastructure.Data;
using Kingsmen.Infrastructure.Interfaces;
using Kingsmen.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Kingsmen.Infrastructure.Services.DataServices
{
    public class UserDataService : BaseAsyncGuidEntityBaseDataService<User>, IUserDataService
    {

        internal readonly ILoggingService _loggingService;
        public UserDataService(
            IEntityService entityService,
            IUnitOfWork<KingsmendbContext> unitOfWork,
            ILoggingService loggingService)
            : base(entityService, unitOfWork)
        {
            _loggingService = loggingService;
        }


        public async Task<UserRoleDto> GetUserWithDetailsAsync(Guid id)
        {

            var user = await _unitOfWork
                .GetAsyncRepository<User>()
                .SingleAsync(
                predicate: user => user.Id == id,
                include: u => u
                    .Include(u => u.UserRoles)
                    .ThenInclude(u => u.Role)
                );

            var allRoles = _unitOfWork.GetAsyncRepository<Role>().GetListAsync(
                include: r => r
                .Include(r => r.RoleFunctionalAbilities)
                .ThenInclude(rfa => rfa.FunctionalAbility)
                ).Result.Items;

            List<RoleDto> roles = new List<RoleDto>();

            foreach (var role in allRoles)
            {
                var isRoleAssociatedWithUser = user.UserRoles.Select(r => r.Role.Id).Contains(role.Id);

                if (isRoleAssociatedWithUser)

                    roles.Add(new RoleDto(role, true));
                else
                    roles.Add(new RoleDto(role, false));
            }

            var UserRoleDto = new UserRoleDto(user, roles);

            return UserRoleDto;
        }

        public async Task<ICollection<String>> UpdateUsersFromAzureAsync(List<User> azureUsers)
        {
            ICollection<string> statuses = new List<string>();

            foreach (User azureUser in azureUsers)
            {
                //If some No- Human users slipped through the Azure Function Check. Also applied a filter to prevent first names from coming back as "Kingsmen"
                if (azureUser.FirstName != null && azureUser.LastName != null && azureUser.FirstName != "Kingsmen")
                {

                    User ksUser = await GetByIdAsync(azureUser.Id);

                    //If this user doesn't exist in the database, Add them
                    if (ksUser == null)
                    {
                        var newksUser = azureUser;

                        newksUser.CreateUser = "System";
                        newksUser.UpdateUser = "System";
                        newksUser.CreateDateTime = DateTime.Now;
                        newksUser.UpdateDateTime = DateTime.Now;

                        await _unitOfWork.GetAsyncRepository<User>().AddAsync(newksUser);
                        await _unitOfWork.SaveChangesAsync();
                    }

                    //If this user DOES exist in DB update them
                    else
                    {
                        if (!ksUser.Equals(azureUser))
                        {
                            ksUser.FirstName = azureUser.FirstName;
                            ksUser.LastName = azureUser.LastName;
                            ksUser.Email = azureUser.Email;
                            ksUser.UpdateUser = "System";
                            ksUser.IsActive = azureUser.IsActive;
                            ksUser.UpdateDateTime = DateTime.Now;
        
                            _unitOfWork.GetAsyncRepository<User>().Update(ksUser);
                            await _unitOfWork.SaveChangesAsync();
                        }
                    }
                }
            }

            _unitOfWork.Context.ChangeTracker.Clear();

            CheckIfAzureUserHasBeenDeleted(azureUsers);

            return statuses;
        }

        public User FindByUserName(String userName)
        {
            return (from aUser in _unitOfWork.Context.User
                   where aUser.Email.ToLower().Equals(userName.ToLower())
                   select aUser).FirstOrDefault();
        }

        public void CheckIfAzureUserHasBeenDeleted(List<User> azureUsers)
        {
            List<User> allksUsers = _unitOfWork.Context.User.ToList();

            var usersInAzure =
                (from user in azureUsers
                 select user.Id)
                .ToList();

            var usersDeletedFromAzure =
                (from user in allksUsers
                 where !usersInAzure.Contains(user.Id)
                 select user)
                .ToList();

            foreach (User deletedUser in usersDeletedFromAzure)
            {
                if (!deletedUser.IsActive) continue;

                deletedUser.IsActive = false;
                deletedUser.UpdateDateTime = DateTime.Now;

                _unitOfWork.GetAsyncRepository<User>().Update(deletedUser);
                _unitOfWork.SaveChanges();
                _unitOfWork.Context.ChangeTracker.Clear();
            }
        }

        public List<AssignedPermissionDto> RetrievePermissions(string userName)
        {
            var db = _unitOfWork.Context;

            var data = (from facp in db.FunctionalAbilityControlPoint
                        join fa in db.FunctionalAbility on facp.FunctionalAbility.Id equals fa.Id
                        join far in db.RoleFunctionalAbility on fa.Id equals far.FunctionalAbility.Id
                        join r in db.Role on far.Role.Id equals r.Id
                        join ur in db.UserRole on r.Id equals ur.Role.Id
                        join u in db.User on ur.User_Id equals u.Id
                        where  facp.FunctionalAbility.IsActive  && r.IsActive 
                            && u.Email == userName
                        select new { controlPoint = facp.ControlPoint.Name,
                             canView = facp.CanView,
                             canAddUpdate = facp.CanAddUpdate,
                             canDelete = facp.CanDelete,
                             canExecute = facp.CanExecute}
                       );


            List<AssignedPermissionDto> dtos = (from permission in data.AsQueryable()
                                                select new AssignedPermissionDto(
                                                     permission.controlPoint,
                                                     permission.canView,
                                                     permission.canAddUpdate,
                                                     permission.canDelete,
                                                     permission.canExecute
                                                    )).ToList();



            return ConsolidatePermissions(dtos);
        }

        /// <summary>
        /// If a user haas multiple control points we want to consolidate them
        /// down and apply the least restrictive permissions
        /// </summary>
        /// <returns>A list of combined permissions</returns>
        private static List<AssignedPermissionDto> ConsolidatePermissions(List<AssignedPermissionDto> completeList)
        {
            List<AssignedPermissionDto> finalList = new();

            foreach(AssignedPermissionDto assignedPermission in completeList)
            {
                AssignedPermissionDto alreadyLogged = finalList.Find(f => f.ControlPointName == assignedPermission.ControlPointName);

                if(alreadyLogged == null)
                {
                    finalList.Add(assignedPermission);
                    continue;
                }

                PropertyInfo[] pi = typeof(AssignedPermissionDto).GetProperties().Where(p=>p.Name.Contains("Can")).ToArray();

                foreach(PropertyInfo p in pi)
                {
                    if(!(bool)p.GetValue(alreadyLogged) && (bool)p.GetValue(assignedPermission))
                    { 
                        p.SetValue(alreadyLogged, true);
                    }
                }

            }

            return finalList;
        }

        public List<String> UserHasRoles(string userName)
        {
            var db = _unitOfWork.Context;

            var data = (from r in db.Role
                        join ur in db.UserRole on r.Id equals ur.Role.Id
                        join u in db.User on ur.User_Id equals u.Id
                        where r.IsActive == true
                            && u.Email == userName
                        select r.Name
                ).ToList();


            return data;

        }

        public async Task<User> UpdateWithValidationsAsync(RequestUserRoleDto userDto)
        {

            var updatedUser = await _unitOfWork
                .GetAsyncRepository<User>()
                .SingleAsync(
                predicate: user => user.Id == userDto.ID,
                include: u => u
                    .Include(u => u.UserRoles)
                    .ThenInclude(u => u.Role)
                    );

            List<UserRole> userRoles = new List<UserRole>();

            foreach(var r in userDto.Roles)
            {
                UserRole userRole = new UserRole();
                userRole.Role_Id = r.Id;
                userRoles.Add(userRole);
            }

            updatedUser.UserRoles = userRoles;

            await UpdateUserRolesAsync(updatedUser);

             return updatedUser;
        }

        public async Task<User> UpdateUserRolesAsync(User updateUser)
        {
            var repo = _unitOfWork.GetAsyncRepository<User>();

            await DeleteUserRolesAndSaveAsync(updateUser);

            foreach (var userRole in updateUser.UserRoles)
            {
                userRole.User_Id = updateUser.Id;
            }

            _entityService.SetUpdateFields(updateUser);

            repo.Update(updateUser);

            await _unitOfWork.SaveChangesAsync();

            return updateUser;
        }

        private async System.Threading.Tasks.Task DeleteUserRolesAndSaveAsync(User entity)
        {
            var repo = _unitOfWork.GetAsyncRepository<UserRole>();

            var userRoles = await _unitOfWork.GetAsyncRepository<UserRole>().GetListAsync(ur => ur.User_Id == entity.Id);

            repo.DeleteMany(userRoles.Items.ToList());

            await _unitOfWork.SaveChangesAsync();
        }

        public async Task<ICollection<User>> GetAllUsersWithTeamMemberDetailsAsync()
        {
            var users = (await _unitOfWork.GetAsyncRepository<User>().GetListAsync()).Items.ToList();

            return users;
        }
    }


}
