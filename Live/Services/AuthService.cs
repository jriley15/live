using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Live.Data;
using Live.Data.Dto;
using Live.Data.Entity;
using Live.Helpers;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace Live.Services
{
    public interface IAuthService
    {

        Task<Response> Register(RegisterRequest request);

        Task<LoginResponse> Login(LoginRequest request);

    }

    public class AuthService : IAuthService
    {

        private readonly DatabaseContext _dbContext;

        private readonly IMapper _mapper;

        public AuthService(DatabaseContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<Response> Register(RegisterRequest request)
        {
            var response = new Response();

            var user = await _dbContext.Users.SingleOrDefaultAsync(u =>
                u.Email.Equals(request.Email, StringComparison.OrdinalIgnoreCase));

            if (user == null)
            {

                var entity = _mapper.Map<User>(request);
                
                entity.Stream = new Stream()
                {
                    Key = Base64UrlEncoder.Encode(Guid.NewGuid().ToByteArray()),
                    User =  entity,
                    Title = "My stream",
                    Description = "My new stream"
                };

                entity.Stream.ChatRoom = new ChatRoom()
                {
                    Stream = entity.Stream
                };


                await _dbContext.Users.AddAsync(entity);

                if (await _dbContext.SaveChangesAsync() > 0)
                {
                    response.Success = true;
                }
                else
                {
                    response.AddError("*", "Nothing saved to database");
                }

            }
            else
            {

                response.AddError("Email", "Email already registered");

            }

            return response;
        }

        public async Task<LoginResponse> Login(LoginRequest request)
        {

            var response = new LoginResponse();

            var user = await _dbContext.Users.SingleOrDefaultAsync(u =>
                u.Email.Equals(request.Email, StringComparison.OrdinalIgnoreCase) &&
                u.Password.Equals(request.Password));

            if (user != null)
            {
                response.Success = true;
                response.AccessToken = TokenHelper.GenerateJwt(user);

            }
            else
            {

                response.AddError("*", "Invalid email or password");

            }

            return response;

        }
    }
}
