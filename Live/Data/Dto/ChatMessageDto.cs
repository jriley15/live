using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Live.Data.Entity;

namespace Live.Data.Dto
{
    public class ChatMessageDto
    {


        public int ChatMessageId { get; set; }

        public string Message { get; set; }

        public UserDto User { get; set; }


    }
}
