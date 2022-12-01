using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Kingsmen.Domain.Entities;
using Kingsmen.Infrastructure.Interfaces.BaseDataService;

namespace Kingsmen.Infrastructure.Services.DataServices
{
    public interface IRoleDataService : IBaseAsyncGuidEntityBaseDataService<Role>
    {
        Task<object> DoesEntityHaveDownstreamAssociations(Role entity);
        Task<ICollection<string>> AddWithValidationsAsync(Role newEntity);
        Task<Role> GetByIdWithFunctionalAbilitiesAsync(Guid Id);
        Task<bool> DoesEntityWithDuplicateNameAndDifferentIdExistAsync(Role entity);
        new Task<Role> UpdateAndSaveAsync(Role updatedEntity);
        System.Threading.Tasks.Task DeleteEntityAndDependenciesAndSaveAsync(Role entity);
    }
}
