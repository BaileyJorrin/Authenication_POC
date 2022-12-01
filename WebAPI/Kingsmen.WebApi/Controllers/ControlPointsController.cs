using AutoMapper;
using Kingsmen.Domain.Entities;
using Kingsmen.Infrastructure.Interfaces.DataServices;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Kingsmen.WebApi.Controllers
{
    [Produces("application/json")]
    [EnableCors("kingsmenCORS")]
    [Route("api/[controller]")]
    [ApiController]
    public class ControlPointsController : BaseEntityController<ControlPoint>
    {
        public ControlPointsController(IControlPointDataService dataService, ILogger<ControlPointsController> logger, IMapper mapper) : base(dataService, logger, mapper)
        {

        }
    }
}
