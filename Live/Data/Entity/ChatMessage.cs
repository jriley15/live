using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Live.Data.Entity
{
    public class ChatMessage
    {

        public int ChatMessageId { get; set; }

        public string Message { get; set; }

        public int UserId { get; set; }

        public User User { get; set; }

        public int ChatRoomId { get; set; }

        public ChatRoom ChatRoom { get; set; }

    }
}
