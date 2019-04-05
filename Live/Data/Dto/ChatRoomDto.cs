using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Live.Data.Entity;

namespace Live.Data.Dto
{
    public class ChatRoomDto
    {
        public int ChatRoomId { get; set; }

        public List<UserDto> Users { get; set; }

        public List<ChatMessageDto> Messages { get; set; }

        public int StreamId { get; set; }

        public StreamDto Stream { get; set; }
    }
}
