using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace GroceryStore.api.Middlewares
{
    public class UserMiddleware
    {


        private readonly RequestDelegate _next;


        public UserMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            var isValidRequest = context.Request.Headers.ContainsKey("#token");
            if (isValidRequest)
            {
                await _next(context);
            }
            else
            {
                context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
                await context.Response.WriteAsync("Invalid Request");
            }
        }
    }
}
