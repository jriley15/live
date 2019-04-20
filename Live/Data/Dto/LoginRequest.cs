using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Live.Data.Dto
{
    public class LoginRequest
    {
        [Required]
        [StringLength(30)]
        public string Username { get; set; }

        [Required]
        [StringLength(30)]
        public string Password { get; set; }

    }
}
