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

        
        // nginx will hit this end point with stream key under 'name' parameter
        //we will verify this key and then return a redirect with the users username as the name
        //so that the stream gets published to this directory on rtmp server
        //here we set stream as online
        [HttpPost]
        public async Task<IActionResult> OnPublish([FromForm]string name)
        {
            var response = await _streamService.PublishStream(name);

            if (response.Success)
            {
                return Redirect(response.StreamName);
            } else
            {
                return BadRequest();
            }

        }

        //nginx will call this when publish is done, so we set stream offline here
        [HttpPost]
        public async Task<IActionResult> OnPublishDone([FromForm]string name)
        {
            await _streamService.EndPublishStream(name);

            return Ok();
        }


        //increment live viewers
        [HttpGet]
        public async Task<IActionResult> OnWatch(int id)
        {
            return GenerateResponse(await _streamService.WatchStream(id));


            //return Ok();
        }

        //decrement live viewers
        [HttpGet]
        public async Task<IActionResult> OnWatchDone(int id)
        {
            await _streamService.EndWatchStream(id);

            return Ok();
        }

        [HttpGet]
        public IActionResult Test()
        {

            return Ok();
        }
    }
}
