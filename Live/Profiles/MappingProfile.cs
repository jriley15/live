using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Live.Data.Dto;
using Live.Data.Entity;

namespace Live.Profiles
{
    public class MappingProfile : Profile
    {

        public MappingProfile()
        {
            //AllowNullDestinationValues = true;

            CreateMap<RegisterRequest, User>();

            CreateMap<Stream, StreamDto>();

            CreateMap<User, UserDto>();

            CreateMap<ChatRoom, ChatRoomDto>();

            CreateMap<ChatMessage, ChatMessageDto>();
        }

    }
}
