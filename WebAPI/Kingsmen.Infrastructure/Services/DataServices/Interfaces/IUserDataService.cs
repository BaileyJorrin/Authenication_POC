using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Kingsmen.Domain;
using Kingsmen.Domain.Dtos;
using Kingsmen.Domain.Entities;
using Kingsmen.Infrastructure.Interfaces.BaseDataService;

namespace Kingsmen.Infrastructure.Services.DataServices
{
    public interface IUserDataService : IBaseAsyncGuidEntityBaseDataService<User>
    {
        User FindByUserName(String userName);
        List<AssignedPermissionDto> RetrievePermissions(string userName);
        Task<ICollection<string>> UpdateUsersFromAzureAsync(List<User> azureUsers);
        Task <UserRoleDto> GetUserWithDetailsAsync(Guid id);
        Task<User> UpdateWithValidationsAsync(RequestUserRoleDto user);
        List<String> UserHasRoles(string userName);
        Task<ICollection<User>> GetAllUsersWithTeamMemberDetailsAsync();
    }
}
