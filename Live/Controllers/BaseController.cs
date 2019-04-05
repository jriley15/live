using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Live.Data.Dto;
using Microsoft.AspNetCore.Mvc;

namespace Live.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class BaseController : Controller
    {


        public BaseController() : base()
        {
            
        }


        public IActionResult GenerateResponse(Response response)
        {

            if (response.Success)
            {
                return Ok(response);
            }
            else
            {
                return BadRequest(response);
            }

        }



    }
}
