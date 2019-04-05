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
using Microsoft.EntityFrameworkCore.Extensions.Internal;

namespace Live.Services
{

    public interface IStreamService
    {

        IEnumerable<StreamDto> GetStreams();

        Task<StreamDto> GetStream(int id);

        Task<StreamDto> GetUserStream(int userId);

        Task<Stream> GetMyStream(int userId);

        Task<bool> ViewStream(int userId);

        Task<Response> PublishStream(string key);

        Task EndPublishStream(string key);

        Task<Response> WatchStream(int id);

        Task EndWatchStream(int id);
    }

    public class StreamService : IStreamService
    {

        private readonly DatabaseContext _dbContext;

        private readonly IMapper _mapper;

        private readonly ICacheService _cacheService;



        public StreamService(DatabaseContext dbContext, IMapper mapper, ICacheService cacheService)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _cacheService = cacheService;
        }

        public async Task<StreamDto> GetStream(int id)
        {

            return _mapper.Map<StreamDto>(await _dbContext.Streams.Include(s => s.User).Include(s => s.ChatRoom)
                .SingleOrDefaultAsync(s => s.StreamId == id));
        }

        public async Task<bool> ViewStream(int id)
        {
            var stream = await _dbContext.Streams.Include(s => s.ChatRoom).SingleOrDefaultAsync(s => s.StreamId == id);
            stream.Views++;

            return await _dbContext.SaveChangesAsync() > 0;
        }

        public IEnumerable<StreamDto> GetStreams()
        {

            return (IEnumerable<StreamDto>)_cacheService.GetOrSet("streams", () =>
            {
                return _mapper.Map<IEnumerable<StreamDto>>(_dbContext.Streams.Include(s => s.User).OrderByDescending(s => s.Views).ThenByDescending(s => s.Streaming).ToList());

            });
                    
        }

        public async Task<StreamDto> GetUserStream(int userId)
        {
            return _mapper.Map<StreamDto>(await _dbContext.Streams.SingleOrDefaultAsync(s => s.UserId == userId));
        }

        public async Task<Stream> GetMyStream(int userId)
        {
            return await _dbContext.Streams.SingleOrDefaultAsync(s => s.UserId == userId);
        }

        public async Task<Response> PublishStream(string key)
        {
            var response = new Response();

            var stream = await _dbContext.Streams.SingleOrDefaultAsync(s => s.Key == key);

            if (stream != null)
            {
                stream.Streaming = true;
                await _dbContext.SaveChangesAsync();

                response.Success = true;
            }

            return response;
        }


        public async Task EndPublishStream(string key)
        {
            var stream = await _dbContext.Streams.SingleOrDefaultAsync(s => s.Key == key);

            stream.Streaming = false;

            await _dbContext.SaveChangesAsync();

        }

        public async Task<Response> WatchStream(int id)
        {
            var response = new Response();

            var stream = await _dbContext.Streams.SingleOrDefaultAsync(s => s.StreamId == id);

            if (stream != null)
            {
                stream.Viewers++;
                stream.Views++;
                await _dbContext.SaveChangesAsync();

                response.Success = true;
            }

            return response;
        }

        public async Task EndWatchStream(int id)
        {
            var stream = await _dbContext.Streams.SingleOrDefaultAsync(s => s.StreamId == id);

            if (stream != null)
            {
                stream.Viewers--;
                await _dbContext.SaveChangesAsync();
            }
        }

    }
}
