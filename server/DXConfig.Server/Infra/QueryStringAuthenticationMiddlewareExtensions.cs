﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;

namespace DXConfig.Server.Infra
{
    public static class QueryStringAuthenticationMiddlewareExtensions
    {
        public static IApplicationBuilder UseQueryStringAuthentication(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<QueryStringAuthenticationMiddleware>();
        }
    }
}
