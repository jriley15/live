using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Live.Data.Dto;
using Live.Services;
using Microsoft.AspNetCore.Mvc;

namespace Live.Controllers
{
    public class ChatController : BaseController
    {

        private readonly IChatService _chatService;

        public ChatController(IChatService chatService)
        {
            _chatService = chatService;
        }



        [HttpGet]
        public async Task<IEnumerable<ChatMessageDto>> GetMessages(int streamId)
        {

            return await _chatService.GetMessages(streamId);

        }



    }
}
