﻿using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace DXConfig.Server.Pages
{
    public class AuthGitModel : PageModel
    {
        public string Message { get; set; }

        public async Task OnGetAsync()
        {
            var result = await HttpContext.AuthenticateAsync("git");

            if (result.Principal == null)
            {
                await HttpContext.ChallengeAsync("git");
            }
            
            await Task.Delay(0);

            Message = "Your application description page.";
        }
    }
}