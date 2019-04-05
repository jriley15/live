using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Live.Data.Dto;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace Live.Extensions
{
    public static class ModelStateExtensions
    {

        public static IEnumerable<Error> Errors(this ModelStateDictionary modelState)
        {
            var result = new List<Error>();
            var erroneousFields = modelState.Where(ms => ms.Value.Errors.Any())
                .Select(x => new { x.Key, x.Value.Errors });

            foreach (var erroneousField in erroneousFields)
            {
                var fieldKey = erroneousField.Key;
                var fieldErrors = erroneousField.Errors.Select(error => new Error()
                    {
                        Key = fieldKey, 
                        Message = error.ErrorMessage
                    });

                result.AddRange(fieldErrors);
            }

            return result;
        }


    }
}
