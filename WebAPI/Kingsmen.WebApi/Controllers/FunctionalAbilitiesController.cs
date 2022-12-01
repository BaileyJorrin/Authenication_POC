using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using AutoMapper;

using Kingsmen.Domain.Dtos;
using Kingsmen.Domain.Entities;
using Kingsmen.Infrastructure.Interfaces.DataServices;
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
    public class FunctionalAbilitiesController : BaseEntityController<FunctionalAbility>
    {
        public FunctionalAbilitiesController(IFunctionalAbilityDataService dataService, ILogger<FunctionalAbilitiesController> logger, IMapper mapper) : base(dataService, logger, mapper)
        {

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
                if(entity == null)
                {
                    return NotFound();
                }

                var functionalAbilityAssociations = await ((IFunctionalAbilityDataService)_dataService).DoesEntityHaveDownstreamAssociations(entity);
                if(functionalAbilityAssociations != null)
                {
                    return BadRequest($"Failure: Functional Ability is Associated to a Role.");
                }

                await ((IFunctionalAbilityDataService)_dataService).DeleteEntityAndDependenciesAndSaveAsync(entity);

                return Ok("Success");

            }
            catch(Exception ex)
            {
                _logger.LogError(ex, ex.Message);

                return StatusCode((int)HttpStatusCode.InternalServerError, ErrorHelper.ControllerErrorMessage);
            }
        }

        [HttpPost("[action]")]
        public async Task<JsonResult> AddWithValidationsAsync(FunctionalAbility entity)
        {
            StatusesDto statusesDto = new StatusesDto();

            ICollection<string> status = await ((IFunctionalAbilityDataService)_dataService).AddWithValidationsAsync(entity);

            statusesDto.WasSuccessful = status.Count == 0;
            statusesDto.StatusMessages = status;

            return Json(statusesDto);
        }

        [HttpPost("[action]/{id}")]
        public async Task<IActionResult> UpdateWithValidationsAsync([FromRoute] Guid id, [FromBody] FunctionalAbility entity)
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

                var doesDuplicateClientExist = await ((IFunctionalAbilityDataService)_dataService).DoesEntityWithDuplicateNameAndDifferentIdExistAsync(entity);

                if (doesDuplicateClientExist)
                {
                    return BadRequest("Failure: Functional Ability Name Already Exists");
                }

                await ((IFunctionalAbilityDataService)_dataService).UpdateAndSaveAsync(entity);

                return Ok("Success");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);

                return StatusCode((int)HttpStatusCode.InternalServerError, ErrorHelper.BadRequestMessage(ex.Message));
            }
        }

        [HttpGet("[action]/{id}")]
        public async Task<IActionResult> GetByIdWithControlPoints([FromRoute] Guid id)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var entity = await ((IFunctionalAbilityDataService)_dataService).GetByIdWithControlPointsAsync(id);

                if (entity == null)
                {
                    return NotFound();
                }

                return Ok(entity);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);

                return StatusCode((int)HttpStatusCode.InternalServerError, ErrorHelper.ControllerErrorMessage);
            }
        }
    }
}
