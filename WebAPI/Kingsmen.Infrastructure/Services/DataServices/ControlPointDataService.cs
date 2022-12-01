using Kingsmen.CoreServices.Interfaces;
using Kingsmen.Domain.Entities;
using Kingsmen.Infrastructure.Data;
using Kingsmen.Infrastructure.Interfaces;
using Kingsmen.Infrastructure.Interfaces.DataServices;
using Kingsmen.Infrastructure.Repositories;

namespace Kingsmen.Infrastructure.Services.DataServices
{
    public class ControlPointDataService : BaseAsyncGuidEntityBaseDataService<ControlPoint>, IControlPointDataService
    {

        internal readonly ILoggingService _loggingService;
        public ControlPointDataService(
            IEntityService entityService,
            IUnitOfWork<KingsmendbContext> unitOfWork,
            ILoggingService loggingService)
            : base(entityService, unitOfWork)
        {
            _loggingService = loggingService;
        }
    }
}
