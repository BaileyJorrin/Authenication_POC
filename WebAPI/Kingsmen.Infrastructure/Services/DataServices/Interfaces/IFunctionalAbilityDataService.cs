using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Kingsmen.Domain.Entities;
using Kingsmen.Infrastructure.Interfaces.BaseDataService;

namespace Kingsmen.Infrastructure.Interfaces.DataServices
{
    public interface IFunctionalAbilityDataService : IBaseAsyncGuidEntityBaseDataService<FunctionalAbility>
    {
        Task<object> DoesEntityHaveDownstreamAssociations(FunctionalAbility newEntity);

        Task<bool> DoesEntityWithDuplicateNameAndDifferentIdExistAsync(FunctionalAbility entity);

        Task<ICollection<string>> AddWithValidationsAsync(FunctionalAbility newEntity);

        new Task<FunctionalAbility> UpdateAndSaveAsync(FunctionalAbility updatedEntity);

        System.Threading.Tasks.Task DeleteEntityAndDependenciesAndSaveAsync(FunctionalAbility entity);

        System.Threading.Tasks.Task<FunctionalAbility> GetByIdWithControlPointsAsync(Guid Id);
    }
}
