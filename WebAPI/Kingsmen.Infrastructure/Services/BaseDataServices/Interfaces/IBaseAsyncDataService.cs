using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Kingsmen.Infrastructure.Data;
using Kingsmen.Infrastructure.Repositories;

namespace Kingsmen.Infrastructure.Interfaces
{
    public interface IBaseAsyncDataService<T> where T : class
    {
        Task<IEnumerable<T>> GetAllAsync();
        Task<T> AddAsync(T newEntity);
        T Update(T updatedEntity);
        void Delete(T entity);

        Task<T> AddAndSaveAsync(T newEntity);
        Task<T> UpdateAndSaveAsync(T updatedEntity);
        Task DeleteAndSaveAsync(T entity);
        Task SaveChangesAsync();

        IUnitOfWork<KingsmendbContext> ThisUnitOfWork { get; }
    }
}
