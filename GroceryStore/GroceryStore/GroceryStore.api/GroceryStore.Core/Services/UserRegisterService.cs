using GroceryStore.Core.Entities;
using GroceryStore.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace GroceryStore.Core.Services
{
    public class UserRegisterService : IUserRegisterService
    {
        private readonly IRepository<UserRegister> _userRegister;

        public UserRegisterService(IRepository<UserRegister> userRegister)
        {
            _userRegister = userRegister;
        }

        public ServiceResult<UserRegister> AddNewUser(UserRegister newUser)
        {
            UserRegister _newUser = new UserRegister
            {
                FirstName = newUser.FirstName,
                LastName = newUser.LastName,
                Username = newUser.Username,
                Password = newUser.Password,
                Email = newUser.Email
            };

                 
            if( _newUser == null)
            {
                return ServiceResult<UserRegister>.NotFoundResult($"Unable to create a new user");
            }
            else
            {
                _userRegister.Add(_newUser);
                return ServiceResult<UserRegister>.SuccessResult(_newUser);
            }

        }

        public ServiceResult<IEnumerable<UserRegister>> GetAllUsers()
        {
            var userList = _userRegister.GetAll();
          
            return ServiceResult<IEnumerable<UserRegister>>.SuccessResult(userList);
        }

        public ServiceResult<UserRegister> GetById(int id)
        {
            var user = _userRegister.GetAll().FirstOrDefault(x => x.Id == id);
            return ServiceResult<UserRegister>.SuccessResult(user);
        }

        public ServiceResult<UserRegister> VerifiedAccount(UserRegister user)
        {
                var userlist = _userRegister.GetAll();
                foreach (var z in userlist)
                {
                    if(z.Username == user.Username && z.Password == user.Password)
                    {
                        return ServiceResult<UserRegister>.SuccessResult(z);
                    }
                }
                return ServiceResult<UserRegister>.NotFoundResult("User Not Found");
        }
    }
}
