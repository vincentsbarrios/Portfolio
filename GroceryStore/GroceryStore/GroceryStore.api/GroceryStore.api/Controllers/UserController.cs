using GroceryStore.api.Models;
using GroceryStore.Core.Entities;
using GroceryStore.Core.Enums;
using GroceryStore.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GroceryStore.api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserRegisterService _userRegisterService;

        public UserController(IUserRegisterService userRegisterService)
        {
            _userRegisterService = userRegisterService;
        }

        [HttpGet]
        [Route("list")]
        public ActionResult<IEnumerable<UserRegisterDto>> Get()
        {
            var userlist = _userRegisterService.GetAllUsers();

            if (userlist.ResponseCode != ResponseCode.Success)
            {
                return BadRequest(userlist.Error);
            }

            var users = userlist.Result;

            return Ok(users.Select(f => new UserRegisterDto
            {
                id = f.Id,
                FirstName = f.FirstName,
                LastName = f.LastName,
                Username = f.Username,
                Password = f.Password,
                Email = f.Email

            }));
        }

        [HttpGet]
        [Route("details/{userid}")]
        public ActionResult<UserRegister> GetAlbumById(int userid)
        {
            var resultS = _userRegisterService.GetById(userid);
            if (resultS.ResponseCode != ResponseCode.Success)
                return BadRequest(resultS.Error);

            return Ok(resultS.Result);
        }

        [HttpPost]
        [Route("verify")]
        public ActionResult<UserRegister> GetVerification(UserRegister user)
        {
            var resultS = _userRegisterService.VerifiedAccount(user);
            if (resultS.ResponseCode != ResponseCode.Success)
                return BadRequest(resultS.Error);

            return Ok(resultS.Result);
        }

        [HttpPost]
        [Route("newuser")]
        public ActionResult<UserRegister> AddNewUser(UserRegister user)
        {
            var resultS = _userRegisterService.AddNewUser(user);
            if (resultS.ResponseCode != ResponseCode.Success)
                return BadRequest(resultS.Error);

            return Ok(resultS.Result);
        }


    }
}
