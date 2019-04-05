using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Live.Data.Entity
{
    public class Stream
    {

        public int StreamId { get; set; }

        public string Key { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public int Views { get; set; }

        public int Viewers { get; set; }

        public User User { get; set; }

        public int UserId { get; set; }

        public string Status { get; set; }

        public bool Streaming { get; set; }

        public ChatRoom ChatRoom { get; set; }

    }
}
