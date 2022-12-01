using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Kingsmen.Domain;

namespace Kingsmen.Infrastructure.Interfaces.BaseDataService
{
    public interface IBaseAsyncGuidEntityBaseDataService<T> : IBaseAsyncDataService<T> where T : Entity
    {
        Task<T> GetByIdAsync(Guid id);
        Task<IEnumerable<T>> GetActiveAsync();
    }
}
