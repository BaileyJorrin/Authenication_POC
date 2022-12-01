using AutoMapper;
using System.Threading.Tasks;
using Kingsmen.Domain.Entities;
using Kingsmen.Infrastructure.Services.DataServices;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Kingsmen.Domain.Dtos;
using System.Collections.Generic;
using Newtonsoft.Json;
using System;
using System.Net;
using Kingsmen.WebApi.Helpers.UserSync;
using Kingsmen.WebApi.Helpers;
using Kingsmen.Infrastructure.Interfaces.DataServices;
using Kingsmen.WebApi.Security;
using Kingsmen.WebApi.Models;
using Microsoft.AspNetCore.Authorization;

namespace Kingsmen.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [EnableCors("kingsmenCORS")]
    [ApiController]
    public class UsersController : BaseEntityController<User>
    {
        private readonly MsGraphHelper _msGraph;
        private readonly UserSyncHelper _userSyncHelper;
        private readonly IAuthenicationService
            _authenicationService;


        public UsersController(IUserDataService dataService,
            ILogger<Controller> logger,
            IMapper mapper, MsGraphHelper msGraph, UserSyncHelper userSyncHelper,
            IAuthenicationService authenicationService ) : base(dataService, logger, mapper)
        {
            _msGraph = msGraph;
            _userSyncHelper = userSyncHelper;
            _authenicationService = authenicationService;
        }


        [HttpPost("authenticate")]
        public IActionResult Authenticate(AuthenticateRequest model)
        {
            var response = _authenicationService.Authenticate(model);

            if (response == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return Ok(response);
        }

        [HttpGet("[action]/{id}")]
        public async Task<JsonResult> GetByIdWithDetailsAsync(Guid id)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return Json(BadRequest(ModelState));
                }

                var entity = await ((IUserDataService) _dataService).GetUserWithDetailsAsync(id);

                if (entity == null)
                {
                    return Json(NotFound());
                }

                return Json(entity);

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);

                return Json(StatusCode((int)HttpStatusCode.InternalServerError,
                    ErrorHelper.ControllerErrorMessage));
            }
        }

        [HttpPut("[action]/{id}")]
        public async Task<IActionResult> UpdateWithValidationsAsync([FromRoute] Guid id, [FromBody] RequestUserRoleDto entity)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                await  ((IUserDataService)_dataService).UpdateWithValidationsAsync(entity);
                return Ok("Success");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);

                return StatusCode((int)HttpStatusCode.InternalServerError, ErrorHelper.BadRequestMessage(ex.Message));
            }
        }


        [HttpGet("[action]")]
        public JsonResult UpdateUsers()
        {
            StatusesDto statusesDto = new StatusesDto();
            var usersInAzure = _userSyncHelper.GetAllAzureAdUsers();
            UserDataService userDataService = (UserDataService)_dataService;
            userDataService.UpdateUsersFromAzureAsync((JsonConvert.DeserializeObject<List<User>>(usersInAzure))).Wait();
            statusesDto.WasSuccessful = true;
            statusesDto.StatusMessages = new string[] { "Job Started" };
            return Json(statusesDto);
        }

        [HttpGet("[action]")]
        [Authorize]
        public List<AssignedPermissionDto> GetUserPermissions(string userName)
        {
            UserDataService userDataService = (UserDataService)_dataService;
            return userDataService.RetrievePermissions(userName);
        }

        [HttpGet("[action]")]
        public List<String> GetUserRoles(string userName)
        {
            UserDataService userDataService = (UserDataService)_dataService;
            return userDataService.UserHasRoles(userName);
        }

    }
}
