using AutoMapper;
using System.Threading.Tasks;
using Kingsmen.Domain.Entities;
using Kingsmen.Infrastructure.Services.DataServices;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Kingsmen.Domain.Dtos;
using System.Collections.Generic;
using System;
using System.Net;
using Kingsmen.WebApi.Helpers;
using Kingsmen.WebApi.Models;
using Kingsmen.Infrastructure.Interfaces.DataServices;
using System.Linq;

namespace Kingsmen.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [EnableCors("kingsmenCORS")]
    [ApiController]
    public class RolesController : BaseEntityController<Role>
    {
        private readonly IFunctionalAbilityDataService _faDataService;
        public RolesController(IRoleDataService dataService,
                                IFunctionalAbilityDataService faDataService,
                                ILogger<Controller> logger, 
                                IMapper mapper)
        : base(dataService, logger, mapper)
        {
            _faDataService = faDataService;
        }

        [HttpPost("[action]")]
        public async Task<JsonResult> AddWithValidationsAsync(Role entity)
        {
            StatusesDto statusesDto = new StatusesDto();
            ICollection<string> status = await ((IRoleDataService)_dataService).AddWithValidationsAsync(entity);
            statusesDto.WasSuccessful = status.Count == 0;
            statusesDto.StatusMessages = status;
            return Json(statusesDto);
        }

        [HttpPost("[action]/{id}")]
        public async Task<IActionResult> UpdateWithValidationsAsync([FromRoute] Guid id, [FromBody] Role entity)
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

                var doesDuplicateRoleExist = await ((IRoleDataService)_dataService).DoesEntityWithDuplicateNameAndDifferentIdExistAsync(entity);

                if (doesDuplicateRoleExist)
                {
                    return BadRequest("Failure: Role Name Already Exists");
                }

                await ((IRoleDataService)_dataService).UpdateAndSaveAsync(entity);

                return Ok("Success");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);

                return StatusCode((int)HttpStatusCode.InternalServerError, ErrorHelper.BadRequestMessage(ex.Message));
            }
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

                var roleAssociations = await ((IRoleDataService)_dataService).DoesEntityHaveDownstreamAssociations(entity);
                if (roleAssociations != null)
                {
                    return BadRequest($"Failure: Role is Associated to a User.");
                }

                await ((IRoleDataService)_dataService).DeleteEntityAndDependenciesAndSaveAsync(entity);

                return Ok("Success");

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);

                return StatusCode((int)HttpStatusCode.InternalServerError, ErrorHelper.ControllerErrorMessage);
            }
        }

        [HttpGet("[action]/{id}")]
        public async Task<IActionResult> GetAllWithAssignedFunctionalAbilitiesAsync([FromRoute]Guid id)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var entity = await ((IRoleDataService)_dataService).GetByIdWithFunctionalAbilitiesAsync(id);

                if (entity == null)
                {
                    return NotFound();
                }

                var roleModel = await CreateRoleModelWithFunctionalAbilities(entity);

                return Ok(roleModel);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);

                return StatusCode((int)HttpStatusCode.InternalServerError, ErrorHelper.ControllerErrorMessage);
            }
        }

        private async Task<RoleModel> CreateRoleModelWithFunctionalAbilities(Role role)
        {
            var roleModel = new RoleModel(role);

            var assignedIds = new HashSet<Guid>(role.RoleFunctionalAbilities.Select(r => r.FunctionalAbility_Id));

            var allFAs = (await _faDataService.GetAllAsync()).ToList();
            var assignedFAs = allFAs.Where(fa => assignedIds.Contains(fa.Id));
            var unassignedFAs = allFAs.Where(fa => !assignedIds.Contains(fa.Id));

            foreach(var fa in assignedFAs)
            {
                var rfa = roleModel.RoleFunctionalAbilities.FirstOrDefault(r => r.FunctionalAbility_Id == fa.Id);

                if(rfa == null) continue;

                rfa.Name = fa.Name;
            }

            foreach(var fa in unassignedFAs)
            {
                var roleFunctionalAbility = new RoleFunctionalAbilityModel(fa);

                roleModel.RoleFunctionalAbilities.Add(roleFunctionalAbility);
            }

            return roleModel;
        }
    }
}
