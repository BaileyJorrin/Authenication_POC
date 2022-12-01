using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Kingsmen.Domain;
using Kingsmen.Infrastructure.Data;
using Kingsmen.Infrastructure.Interfaces;
using Kingsmen.Infrastructure.Interfaces.BaseDataService;
using Kingsmen.Infrastructure.Repositories;

namespace Kingsmen.Infrastructure.Services
{
public class BaseAsyncGuidEntityBaseDataService<T> : IBaseAsyncGuidEntityBaseDataService<T> where T : Entity
    {
        internal readonly IEntityService _entityService;
        internal readonly IUnitOfWork<KingsmendbContext> _unitOfWork;

        public BaseAsyncGuidEntityBaseDataService(
            IEntityService entityService,
            IUnitOfWork<KingsmendbContext> unitOfWork)
        {
            _entityService = entityService;
            _unitOfWork = unitOfWork;
        }

        public IUnitOfWork<KingsmendbContext> ThisUnitOfWork => _unitOfWork;

        public virtual async Task<T> GetByIdAsync(Guid id)
        {
            return await _unitOfWork.GetAsyncRepository<T>().SingleAsync(x => x.Id == id);
        }

        public virtual async Task<IEnumerable<T>> GetAllAsync()
        {
            var result = await _unitOfWork.GetAsyncRepository<T>().GetListAsync();
            return result.Items;
        }

        public virtual async Task<IEnumerable<T>> GetActiveAsync()
        {
            var result = await _unitOfWork.GetAsyncRepository<T>().GetListAsync(predicate: x => x.IsActive);
            return result.Items;
        }

        public virtual async Task<T> AddAsync(T newEntity)
        {
            _entityService.SetCreateFields(newEntity);

            var repo = _unitOfWork.GetAsyncRepository<T>();

            await repo.AddAsync(newEntity);

            return newEntity;
        }

        public virtual T Update(T updatedEntity)
        {
            _entityService.SetUpdateFields(updatedEntity);

            var repo = _unitOfWork.GetAsyncRepository<T>();

            repo.Update(updatedEntity);

            return updatedEntity;
        }

        public virtual void Delete(T entity)
        {
            var repo = _unitOfWork.GetAsyncRepository<T>();

            repo.Delete(entity);
        }

        public virtual async Task<T> AddAndSaveAsync(T newEntity)
        {
            _entityService.SetCreateFields(newEntity);

            var repo = _unitOfWork.GetAsyncRepository<T>();

            await repo.AddAsync(newEntity);
            await _unitOfWork.SaveChangesAsync();

            return newEntity;
        }

        public virtual async Task<T> UpdateAndSaveAsync(T updatedEntity)
        {
            _entityService.SetUpdateFields(updatedEntity);

            var repo = _unitOfWork.GetAsyncRepository<T>();

            repo.Update(updatedEntity);
            await _unitOfWork.SaveChangesAsync();

            return updatedEntity;
        }

        public virtual async Task DeleteAndSaveAsync(T entity)
        {
            var repo = _unitOfWork.GetAsyncRepository<T>();

            await repo.DeleteAsync(entity.Id);
            await _unitOfWork.SaveChangesAsync();
        }

        public virtual async Task SaveChangesAsync()
        {
            await _unitOfWork.SaveChangesAsync();
        }
    }
}