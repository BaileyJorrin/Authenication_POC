using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Kingsmen.Domain;
using Kingsmen.Domain.Entities;
using Kingsmen.Infrastructure.Interfaces.BaseDataService;

namespace Kingsmen.Infrastructure.Services.DataServices
{
    public interface IClientDataService : IBaseAsyncGuidEntityBaseDataService<Client>
    {
        Task<ICollection<String>> AddWithValidationsAsync(Client entity);
        Task<bool> DoesEntityWithDuplicateNameExistAsync(String clientName);
        Task<bool> DoesEntityWithDuplicateNameAndDifferentIdExistAsync(Client entity);
   }
}
