using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Live.Data;
using Live.Data.Dto;
using Live.Data.Entity;
using Microsoft.EntityFrameworkCore;

namespace Live.Services
{

    public interface IChatService
    {


        Task<IEnumerable<ChatMessageDto>> GetMessages(int chatRoomId);
        Task<ChatMessageDto> AddMessage(int chatRoomId, string message, int userId);
    }

    public class ChatService : IChatService
    {

        private readonly IDatabaseContextFactory _dbContextFactory;

        private readonly IMapper _mapper;

        public ChatService(IDatabaseContextFactory dbContextFactory, IMapper mapper)
        {
            _dbContextFactory = dbContextFactory;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ChatMessageDto>> GetMessages(int chatRoomId)
        {
            using (var dbContext = _dbContextFactory.Create())
            {
                return _mapper.Map<IEnumerable<ChatMessageDto>>(await dbContext.ChatMessages.Include(m => m.User).Where(m => m.ChatRoomId == chatRoomId).Take(100).ToListAsync());
            }
        }

        //send msg
        public async Task<ChatMessageDto> AddMessage(int chatRoomId, string message, int userId)
        {
            using (var dbContext = _dbContextFactory.Create())
            {
                var entity = new ChatMessage()
                {
                    ChatRoomId = chatRoomId,
                    Message = message,
                    User = await dbContext.Users.SingleOrDefaultAsync(u => u.UserId == userId)
                };

                await dbContext.ChatMessages.AddAsync(entity);

                await dbContext.SaveChangesAsync();

                return _mapper.Map<ChatMessageDto>(entity);
            }
        }

    }
}
