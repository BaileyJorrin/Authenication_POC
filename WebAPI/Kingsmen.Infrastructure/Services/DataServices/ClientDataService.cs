using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Kingsmen.CoreServices.Interfaces;
using Kingsmen.Domain.Entities;
using Kingsmen.Infrastructure.Data;
using Kingsmen.Infrastructure.Interfaces;
using Kingsmen.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Kingsmen.Infrastructure.Services.DataServices
{
    public class ClientDataService : BaseAsyncGuidEntityBaseDataService<Client>, IClientDataService
    {
       
        internal readonly ILoggingService _loggingService;
        public ClientDataService(
            IEntityService entityService,
            IUnitOfWork<KingsmendbContext> unitOfWork,
            ILoggingService loggingService)
            : base(entityService, unitOfWork)
        {
      
            _loggingService = loggingService;
        }

        public async Task<bool> DoesEntityWithDuplicateNameExistAsync(string clientName)
        {
        
            Client duplicateClient = await _unitOfWork.GetAsyncRepository<Client>().SingleAsync(w => w.Name == clientName);

            if (duplicateClient == null)
            {
                return false;
            }

            return true;
               
        }

        public async Task<bool> DoesEntityWithDuplicateNameAndDifferentIdExistAsync(Client entity)
        {
            Client duplicateClient = await _unitOfWork.GetAsyncRepository<Client>()
                .SingleAsync(w => w.Name == entity.Name && w.Id != entity.Id);

            if(duplicateClient == null)
            {
                return false;
            }

            return true;
        }


        public async Task<ICollection<String>> AddWithValidationsAsync(Client entity)
        {
            ICollection<String> statuses = new List<String>();

            bool isDuplicate = await DoesEntityWithDuplicateNameExistAsync(entity.Name);

            try
            {   

                if (isDuplicate)
                {
                    throw new ArgumentException("Failure: Client Already Exists");                   
                }
                else
                {
                    await AddAndSaveAsync(entity);
                }

            }
            catch (Exception e)
            {
                _loggingService.LogError(e);
                statuses.Add(e.Message);
            }

            return statuses;
        }

    }
}
