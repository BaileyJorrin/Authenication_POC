using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Kingsmen.CoreServices.Interfaces;
using Kingsmen.Domain.Entities;
using Kingsmen.Infrastructure.Data;
using Kingsmen.Infrastructure.Interfaces;
using Kingsmen.Infrastructure.Interfaces.DataServices;
using Kingsmen.Infrastructure.Repositories;

namespace Kingsmen.Infrastructure.Services.DataServices
{
    public class ConfigurationItemDataService : BaseAsyncGuidEntityBaseDataService<ConfigurationItem>, IConfigurationItemDataService
    {
        private new readonly IUnitOfWork<KingsmendbContext> _unitOfWork;
        internal readonly ILoggingService _loggingService;
        public ConfigurationItemDataService(
            IEntityService entityService,
            IUnitOfWork<KingsmendbContext> unitOfWork,
            ILoggingService loggingService)
            : base(entityService, unitOfWork)
        {
            this._unitOfWork = unitOfWork;
            _loggingService = loggingService;
        }

        public async Task<ICollection<ConfigurationItem>> GetActiveConfigurationItems(Guid parentId)
        {
            
            var configurationItems = (await _unitOfWork.GetAsyncRepository<ConfigurationItem>().GetListAsync(ci => ci.ParentId == parentId && ci.IsActive)).Items;

            return configurationItems;

        }
    }
}
