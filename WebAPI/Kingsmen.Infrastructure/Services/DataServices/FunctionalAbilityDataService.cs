using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Kingsmen.CoreServices.Interfaces;
using Kingsmen.Domain.Entities;
using Kingsmen.Infrastructure.Data;
using Kingsmen.Infrastructure.Interfaces;
using Kingsmen.Infrastructure.Interfaces.DataServices;
using Kingsmen.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Kingsmen.Infrastructure.Services.DataServices
{
    public class FunctionalAbilityDataService : BaseAsyncGuidEntityBaseDataService<FunctionalAbility>, IFunctionalAbilityDataService
    {

        internal readonly ILoggingService _loggingService;
        public FunctionalAbilityDataService(
            IEntityService entityService,
            IUnitOfWork<KingsmendbContext> unitOfWork,
            ILoggingService loggingService)
            : base(entityService, unitOfWork)
        {
            _loggingService = loggingService;
        }

        public async Task<object> DoesEntityHaveDownstreamAssociations(FunctionalAbility newEntity)
        {
            var associatedRole = await _unitOfWork.GetAsyncRepository<RoleFunctionalAbility>().SingleAsync(x => x.FunctionalAbility.Id == newEntity.Id);

            foreach (var x in new object[] { associatedRole })
            {
                if(x != null)
                {
                    return x.GetType().ToString().Substring(26);
                }
            }
            return null;
        }

        public async Task<bool> DoesEntityWithDuplicateNameAndDifferentIdExistAsync(FunctionalAbility entity)
        {
            var duplicateFA = await _unitOfWork.GetAsyncRepository<FunctionalAbility>()
                            .SingleAsync(fa => fa.Name == entity.Name && fa.Id != entity.Id);

            if (duplicateFA == null)
                return false;

            return true;
        }

        public async Task<ICollection<string>> AddWithValidationsAsync(FunctionalAbility newEntity)
        {
            ICollection<String> statuses = new List<String>();

            bool isDuplicate = await DoesEntityWithDuplicateNameExist(newEntity);

            try
            {
                if (isDuplicate)
                {
                    throw new ArgumentException("Failure: Functional Ability Name Already Exists");
                }
                else
                {
                    newEntity.FunctionalAbilityControlPoints.ForEach(cp => _entityService.SetCreateFields(cp));

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

        public override async Task<FunctionalAbility> UpdateAndSaveAsync(FunctionalAbility updatedEntity)
        {
            var repo = _unitOfWork.GetAsyncRepository<FunctionalAbility>();

            await DeleteFunctionalAbilityControlPointsAndSaveAsync(updatedEntity);

            var newCP = new List<FunctionalAbilityControlPoint>();

            foreach(var item in updatedEntity.FunctionalAbilityControlPoints)
            {
                var facp = new FunctionalAbilityControlPoint
                {
                    Id = Guid.NewGuid(),
                    ControlPoint_Id = item.ControlPoint_Id,
                    FunctionalAbility_Id = item.FunctionalAbility_Id,
                    CanAddUpdate = item.CanAddUpdate,
                    CanDelete = item.CanDelete,
                    CanExecute = item.CanExecute,
                    CanView = item.CanView
                };

                newCP.Add(facp);
            }

            newCP.ForEach(cp => _entityService.SetCreateFields(cp));
        
            await _unitOfWork.GetAsyncRepository<FunctionalAbilityControlPoint>().AddAsync(newCP);
            _unitOfWork.SaveChanges();

            updatedEntity.UpdateDateTime = DateTime.Now;
            updatedEntity.FunctionalAbilityControlPoints = newCP;

            repo.Update(updatedEntity);

            await _unitOfWork.SaveChangesAsync();

            return updatedEntity;
        }

        public async System.Threading.Tasks.Task DeleteEntityAndDependenciesAndSaveAsync(FunctionalAbility entity)
        {
            await DeleteFunctionalAbilityControlPointsAndSaveAsync(entity);

            await DeleteAndSaveAsync(entity);
        }

        public async System.Threading.Tasks.Task<FunctionalAbility> GetByIdWithControlPointsAsync(Guid Id)
        {
            var result = await _unitOfWork
                            .GetAsyncRepository<FunctionalAbility>()
                            .SingleAsync(predicate: x => x.Id == Id,
                                include: y => y.Include(z => z.FunctionalAbilityControlPoints)
                            );

            var allControlPoints = await _unitOfWork.GetAsyncRepository<ControlPoint>().GetListAsync();

            HashSet<Guid> associatedIds = new HashSet<Guid>(result.FunctionalAbilityControlPoints.Select(r => r.ControlPoint_Id));

            var unassociatedControlPoints = allControlPoints.Items.Where(cp => !associatedIds.Contains(cp.Id));

            foreach(var cp in unassociatedControlPoints)
            {
                var faCP = new FunctionalAbilityControlPoint
                {
                    ControlPoint = cp,
                    FunctionalAbility = result,
                    ControlPoint_Id = cp.Id,
                    FunctionalAbility_Id = result.Id,
                    CanAddUpdate = false,
                    CanDelete = false,
                    CanExecute = false,
                    CanView = false
                };

                result.FunctionalAbilityControlPoints.Add(faCP);
            }

            return result;
        }

        public override async Task<FunctionalAbility> AddAndSaveAsync(FunctionalAbility newEntity)
        {
            _entityService.SetCreateFieldsExceptIsActive(newEntity);

            var repo = _unitOfWork.GetAsyncRepository<FunctionalAbility>();

            await repo.AddAsync(newEntity);
            await _unitOfWork.SaveChangesAsync();

            return newEntity;
        }

        private async System.Threading.Tasks.Task DeleteFunctionalAbilityControlPointsAndSaveAsync(FunctionalAbility entity)
        {
            var repo = _unitOfWork.GetAsyncRepository<FunctionalAbilityControlPoint>();

            var faCPs = await _unitOfWork.GetAsyncRepository<FunctionalAbilityControlPoint>().GetListAsync(fa => fa.FunctionalAbility_Id == entity.Id);

            repo.DeleteMany(faCPs.Items.ToList());

            await _unitOfWork.SaveChangesAsync();
        }

        private async Task<bool> DoesEntityWithDuplicateNameExist(FunctionalAbility newEntity)
        {
            FunctionalAbility duplicateEntity = await _unitOfWork.GetAsyncRepository<FunctionalAbility>().SingleAsync(w => w.Name == newEntity.Name);

            if (duplicateEntity == null)
            {
                return false;
            }

            return true;
        }
    }
}
