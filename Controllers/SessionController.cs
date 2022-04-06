using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace AuctionUtility.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SessionController : ControllerBase
    {
        private readonly SimpleDataStorage _db;
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;

        public SessionController(SimpleDataStorage db, UserManager<AppUser> userManager, SignInManager<AppUser> signInManager)
        {
            _db = db;
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpPost]
        [Route("login")]
        public async Task<ActionResult> Login(ApiUser apiUser)
        {
            if(string.IsNullOrEmpty(apiUser.email) || string.IsNullOrEmpty(apiUser.password)) 
            {
                return BadRequest();
            }

            try 
            {
                var result = await _signInManager.PasswordSignInAsync(apiUser.email.Substring(0, apiUser.email.IndexOf("@")), apiUser.password, false, false);

                if(result.Succeeded) 
                {
                    HttpContext.Session.SetString("currentUser", apiUser.email);
                    return Ok();
                }
                else
                {
                    return StatusCode(404, "A user with the provided credentials doesn't exist");
                }
            } 
            catch (Exception ex) 
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost]
        [Route("register")]
        public async Task<ActionResult> Register(ApiUser apiUser) 
        {
            AppUser appUser = new AppUser
            {
                UserName = apiUser.email.Substring(0, apiUser.email.IndexOf("@")),
                Email = apiUser.email
            };
            IdentityResult registerResult = new IdentityResult();

            try 
            {
                registerResult = await _userManager.CreateAsync(appUser, apiUser.password);
            }
            catch (Exception ex) 
            {
                return StatusCode(500, ex.Message);
            }

            if(registerResult.Succeeded) 
            {
                return Ok();
            } 
            else 
            {
                return StatusCode(404, "Failed to register user: " + registerResult.Errors.ToString());
            }
        }

        [HttpGet("validate")]
        public async Task<ActionResult> Validate() 
        {
            try 
            {
                string currentUserEmail = HttpContext.Session.GetString("currentUser");
                AppUser appUser = await _userManager.FindByEmailAsync(currentUserEmail);

                if (appUser != null) {
                    return Ok(currentUserEmail);
                } 
                else 
                {
                    return StatusCode(404, "Please sign in to use the app"); 
                }
            }
            catch (Exception ex) 
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost]
        [Route("logout")]
        public async Task<ActionResult> Logout()
        {
            try
            {
                AppUser appUser = await _userManager.FindByEmailAsync(HttpContext.Session.GetString("currentUser"));

                if(appUser == null) {
                    return StatusCode(404, "There is no user currently logged in"); 
                } 
                else 
                {
                    await _userManager.UpdateSecurityStampAsync(appUser);
                    HttpContext.Session.Remove("currentUser");
                    return Ok();
                }  
            }
            catch (Exception ex) 
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}