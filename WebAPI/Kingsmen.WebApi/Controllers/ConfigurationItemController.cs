using System;
using System.Collections.Generic;
using System.Threading.Tasks;
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
    public class ConfigurationItemController
    {
        //private readonly ILogger _logger;
        private readonly IConfigurationItemDataService _configurationItemDataService;

        public ConfigurationItemController(IConfigurationItemDataService dataService)
        {
            _configurationItemDataService = dataService;
        }

        [HttpGet("[action]/{id}")]
        public async Task<ICollection<ConfigurationItem>> GetByParentId ([FromRoute]Guid id)
        {
            return await _configurationItemDataService.GetActiveConfigurationItems(id);
        }
    }
}

