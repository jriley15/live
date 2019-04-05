using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Live.Data.Dto;
using Live.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Live.Controllers
{
    public class AuthController : BaseController
    {

        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost]
        public async Task<IActionResult> Register(RegisterRequest request)
        {
            return GenerateResponse(await _authService.Register(request));
        }

        [HttpPost]
        public async Task<IActionResult> Login(LoginRequest request)
        {
            return GenerateResponse(await _authService.Login(request));
        }

    }
}
