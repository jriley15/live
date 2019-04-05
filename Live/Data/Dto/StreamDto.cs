using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Live.Data.Entity;

namespace Live.Data.Dto
{
    public class StreamDto
    {

        public int StreamId { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public int Views { get; set; }

        public int Viewers { get; set; }

        public bool Streaming { get; set; }

        public UserDto User { get; set; }

        public ChatRoomDto ChatRoom { get; set; }

        /*public List<UserDto> Viewers { get; set; }

        public List<UserDto> Followers { get; set; }

        public int TotalFollowers { get; set; }

        public int TotalViewers { get; set; }*/


    }
}
