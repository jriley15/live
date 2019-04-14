using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Live.Data.Dto;
using Live.Data.Entity;
using Live.Extensions;
using Live.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace Live.Hubs
{
    public class ChatHub : Hub
    {

        private readonly IChatService _chatService;

        public ChatHub(IChatService chatService)
        {

            this._chatService = chatService;
            

        }

        public async Task Join(int id)
        {
            //await Groups.AddToGroupAsync(Context.ConnectionId, "SignalR Users");
            //await base.OnConnectedAsync();

            //check if chat room exists

            await Groups.AddToGroupAsync(Context.ConnectionId, id.ToString());


            await Clients.Caller.SendAsync("Messages", await _chatService.GetMessages(id));


            await this._chatService.WatchStream(Context.ConnectionId, id);
        }

        [Authorize]
        public async Task SendMessage(int chatRoomId, string message)
        {
            //await Groups.AddToGroupAsync(Context.ConnectionId, "SignalR Users");
            //await base.OnConnectedAsync();

            var msg = await _chatService.AddMessage(chatRoomId, message, Context.User.GetUserId());

            await this.Clients.Group(chatRoomId.ToString()).SendAsync("Message", msg);

        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            await base.OnDisconnectedAsync(exception);

            await this._chatService.EndWatchStream(Context.ConnectionId);

        }


    }

}