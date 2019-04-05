using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Live.Data.Dto;
using Live.Data.Entity;
using Live.Extensions;
using Live.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Live.Controllers
{

    public class StreamsController : BaseController
    {
        private readonly IStreamService _streamService;

        public StreamsController(IStreamService authService)
        {
            _streamService = authService;
        }

        [HttpGet]
        public IEnumerable<StreamDto> GetStreams()
        {

            return _streamService.GetStreams();

        }

        [HttpGet]
        public async Task<StreamDto> GetStream(int id)
        {
            return await _streamService.GetStream(id);
        }

        [HttpGet]
        public async Task<StreamDto> GetUserStream(int userId)
        {
            return await _streamService.GetUserStream(userId);
        }

        [HttpPost]
        public async Task<bool> ViewStream([FromBody] int id)
        {
            return await _streamService.ViewStream(id);
        }

        [HttpGet]
        [Authorize]
        public async Task<Stream> GetMyStream()
        {
            return await _streamService.GetMyStream(this.User.GetUserId());
        }

        [HttpGet]
        public async Task<IActionResult> PublishStream(string key)
        {
            return GenerateResponse(await _streamService.PublishStream(key));
        }

        [HttpGet]
        public async Task<IActionResult> EndPublishStream(string key)
        {
            await _streamService.EndPublishStream(key);

            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> WatchStream(int id)
        {
            return GenerateResponse(await _streamService.WatchStream(id));
        }

        [HttpGet]
        public async Task<IActionResult> EndWatchStream(int id)
        {
            await _streamService.EndWatchStream(id);

            return Ok();
        }
    }
}
