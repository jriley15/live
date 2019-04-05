using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Live.Data.Entity
{
    public class ChatRoom
    {

        public int ChatRoomId { get; set; }

        public List<User> Users { get; set; }

        public List<ChatMessage> Messages { get; set; }

        public int StreamId { get; set; }

        public Stream Stream { get; set; }

    }
}
