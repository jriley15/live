using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Live.Data.Dto
{
    public class Response
    {

        public bool Success { get; set; }

        public List<Error> Errors { get; set; }

        public Response()
        {
            Errors = new List<Error>();
            Success = false;
        }

        public void AddError(string key, string msg)
        {
            this.Errors.Add(new Error()
            {
                Key = key,
                Message = msg
            });
        }
    }
}
