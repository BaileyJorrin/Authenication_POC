using System;
using System.Net;
using System.Threading.Tasks;
using AutoMapper;
using Kingsmen.Domain;
using Kingsmen.Infrastructure.Interfaces.BaseDataService;
using Kingsmen.WebApi.Helpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Kingsmen.WebApi.Controllers
{
    public abstract class BaseEntityController<T> : Controller where T : Entity
    {
        internal readonly IBaseAsyncGuidEntityBaseDataService<T> _dataService;
        internal readonly ILogger<Controller> _logger;
        internal readonly IMapper _mapper;

        protected BaseEntityController(
            IBaseAsyncGuidEntityBaseDataService<T> dataService,
            ILogger<Controller> logger,
            IMapper mapper
            )
        {
            _logger = logger;
            _dataService = dataService;
            _mapper = mapper;
        }

        // [Authorize(Policy = _readPermission)]
        [HttpGet("[action]")]
        public virtual async Task<IActionResult> GetAll()
        {
            try
            {
                return Ok(await _dataService.GetAllAsync());
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);

                
                return StatusCode((int)HttpStatusCode.InternalServerError, ErrorHelper.BadRequestMessage(ex.Message));
                
            }
        }

        // [Authorize(Policy = _readPermission)]
        [HttpGet("[action]")]
        public virtual async Task<IActionResult> GetActive()
        {
            try
            {
                return Ok(await _dataService.GetActiveAsync());
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);

                return StatusCode((int)HttpStatusCode.InternalServerError, ErrorHelper.ControllerErrorMessage);
            }
        }

        // [Authorize(Policy = _readPermission)]
        [HttpGet("[action]/{id}")]
        public virtual async Task<IActionResult> GetById([FromRoute] Guid id)
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

                return Ok(entity);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);

                return StatusCode((int)HttpStatusCode.InternalServerError, ErrorHelper.ControllerErrorMessage);
            }
        }

        // [Authorize(Policy = _createPermission)]
        [HttpPost("[action]")]
        public virtual async Task<IActionResult> Add([FromBody] T entity)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                await _dataService.AddAndSaveAsync(entity);

                return CreatedAtAction("Add", new { id = entity.Id }, entity);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);

                return StatusCode((int)HttpStatusCode.InternalServerError, ErrorHelper.BadRequestMessage(ex.Message));
            }
        }

        // [Authorize(Policy = _updatePermission)]
        [HttpPost("[action]/{id}")]
        public virtual async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] T entity)
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

                await _dataService.UpdateAndSaveAsync(entity);

                return Ok(entity);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);

                return StatusCode((int)HttpStatusCode.InternalServerError, ErrorHelper.ControllerErrorMessage);
            }
        }

        // [Authorize(Policy = _deletePermission)]
        [HttpPost("[action]/{id}")]
        public virtual async Task<IActionResult> Delete([FromRoute] Guid id)
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

                return StatusCode((int)HttpStatusCode.InternalServerError, ErrorHelper.ControllerErrorMessage);
            }
        }
    }
}
