using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Kingsmen.CoreServices.Interfaces;
using Kingsmen.Domain.Entities;
using Kingsmen.Infrastructure.Data;
using Kingsmen.Infrastructure.Interfaces;
using Kingsmen.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Kingsmen.Infrastructure.Services.DataServices
{
    public class RoleDataService : BaseAsyncGuidEntityBaseDataService<Role>, IRoleDataService
    {

        internal readonly ILoggingService _loggingService;
        public RoleDataService(
            IEntityService entityService,
            IUnitOfWork<KingsmendbContext> unitOfWork,
            ILoggingService loggingService)
            : base(entityService, unitOfWork)
        {

            _loggingService = loggingService;
        }

        public async Task<object> DoesEntityHaveDownstreamAssociations(Role entity)
        {
            var associatedUser = await _unitOfWork.GetAsyncRepository<UserRole>().SingleAsync(x => x.Role_Id == entity.Id);

            foreach (var x in new object[] { associatedUser })
            {
                if (x != null)
                {
                    return x.GetType().ToString().Substring(26);
                }
            }
            return null;
        }

        public async Task<ICollection<string>> AddWithValidationsAsync(Role newEntity)
        {
            ICollection<String> statuses = new List<String>();
            bool isDuplicate = await DoesEntityWithDuplicateNameExist(newEntity);
            try
            {
                if (isDuplicate)
                {
                    throw new ArgumentException("Failure: Role Name Already Exists");
                }
                else
                {
                    newEntity.RoleFunctionalAbilities.ForEach(cp => _entityService.SetCreateFields(cp));
                    await AddAndSaveAsync(newEntity);
                }
            }
            catch (Exception e)
            {
                _loggingService.LogError(e);
                statuses.Add(e.Message);
            }
            return statuses;
        }

        public async Task<Role> GetByIdWithFunctionalAbilitiesAsync(Guid Id)
        {
            var result = await _unitOfWork
                            .GetAsyncRepository<Role>()
                            .SingleAsync(predicate: x => x.Id == Id,
                                include: y => y.Include(z => z.RoleFunctionalAbilities)
                            );

            return result;
        }

        public override async Task<Role> AddAndSaveAsync(Role newEntity)
        {
            _entityService.SetCreateFieldsExceptIsActive(newEntity);
            var repo = _unitOfWork.GetAsyncRepository<Role>();
            await repo.AddAsync(newEntity);
            await _unitOfWork.SaveChangesAsync();
            return newEntity;
        }

        public async Task<bool> DoesEntityWithDuplicateNameExist(Role newEntity)
        {
            var duplicateEntity = await _unitOfWork.GetAsyncRepository<Role>().SingleAsync(w => w.Name == newEntity.Name);
            if (duplicateEntity == null)
            {
                return false;
            }
            return true;
        }

        public async Task<bool> DoesEntityWithDuplicateNameAndDifferentIdExistAsync(Role entity)
        {
            var duplicateRole = await _unitOfWork.GetAsyncRepository<Role>()
                 .SingleAsync(fa => fa.Name == entity.Name && fa.Id != entity.Id);

            if (duplicateRole == null)
                return false;

            return true;
        }

        public override async Task<Role> UpdateAndSaveAsync(Role updatedEntity)
        {
            var repo = _unitOfWork.GetAsyncRepository<Role>();

            await DeleteRoleFunctionalAbilitiesAndSaveAsync(updatedEntity.Id);

            foreach (var rfa in updatedEntity.RoleFunctionalAbilities)
            {
                _entityService.SetCreateFields(rfa);
                rfa.Role_Id = updatedEntity.Id;
            }

            _entityService.SetUpdateFields(updatedEntity);

            repo.Update(updatedEntity);

            await _unitOfWork.SaveChangesAsync();

            return updatedEntity;
        }

        public async System.Threading.Tasks.Task DeleteEntityAndDependenciesAndSaveAsync(Role entity)
        {
            await DeleteRoleFunctionalAbilitiesAndSaveAsync(entity.Id);

            await DeleteAndSaveAsync(entity);
        }

        private async System.Threading.Tasks.Task DeleteRoleFunctionalAbilitiesAndSaveAsync(Guid Id)
        {
            var faCPs = await _unitOfWork.GetAsyncRepository<RoleFunctionalAbility>().GetListAsync(rfa => rfa.Role_Id == Id);

            _unitOfWork.GetRepository<RoleFunctionalAbility>().Delete( faCPs.Items.ToList());

           _unitOfWork.SaveChanges();
        }
    }
}
