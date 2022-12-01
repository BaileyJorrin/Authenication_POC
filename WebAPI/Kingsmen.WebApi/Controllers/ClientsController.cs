using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using AutoMapper;
using Kingsmen.Domain.Dtos;
using Kingsmen.Domain.Entities;
using Kingsmen.Infrastructure.Services.DataServices;
using Kingsmen.WebApi.Helpers;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Kingsmen.WebApi.Controllers
{
    [Produces("application/json")]
    [EnableCors("kingsmenCORS")]
    [Route("api/[controller]")]
    [ApiController]
    public class ClientsController : BaseEntityController<Client>
    {

        public ClientsController(IClientDataService dataService, ILogger<ClientsController> logger, IMapper mapper) : base(dataService, logger, mapper)
        {
       
        }

        [HttpPost("[action]")]
        public async Task<JsonResult> AddWithValidationsAsync(Client client)
        {
            StatusesDto statusesDto = new StatusesDto();

            ICollection<string> status = await ((IClientDataService)_dataService).AddWithValidationsAsync(client);

            statusesDto.WasSuccessful = status.Count == 0;
            statusesDto.StatusMessages = status;

            return Json(statusesDto);
        }

        [HttpPost("[action]/{id}")]
        public async Task<IActionResult> DeleteWithValidationsAsync([FromRoute] Guid id)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var entity = await _dataService.GetByIdAsync(id);

                if (entity == null)
                {
                    return NotFound();
                }

              
                await _dataService.DeleteAndSaveAsync(entity);

                return Ok("Success");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);

                return StatusCode((int)HttpStatusCode.InternalServerError, ErrorHelper.BadRequestMessage(ex.Message));
            }
        }

        [HttpPost("[action]/{id}")]
        public async Task<IActionResult> UpdateWithValidationsAsync([FromRoute] Guid id, [FromBody] Client entity)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                if (id != entity.Id)
                {
                    return BadRequest();
                }

                var doesDuplicateClientExist = await ((IClientDataService) _dataService).DoesEntityWithDuplicateNameAndDifferentIdExistAsync(entity);

                if (doesDuplicateClientExist)
                {
                    return BadRequest("Failure: Client Name Already Exists");
                }

                await _dataService.UpdateAndSaveAsync(entity);

                return Ok("Success");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);

                return StatusCode((int)HttpStatusCode.InternalServerError, ErrorHelper.BadRequestMessage(ex.Message));
            }
        }

    }
}
