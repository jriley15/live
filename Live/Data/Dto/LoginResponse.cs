using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Live.Data.Dto
{
    public class LoginResponse : Response
    {


        public string AccessToken { get; set; }

        public LoginResponse() : base()
        {
            
        }

    }
}
