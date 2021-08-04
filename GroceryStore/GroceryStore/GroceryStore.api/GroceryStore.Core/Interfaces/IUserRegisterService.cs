using GroceryStore.Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace GroceryStore.Core.Interfaces
{
    public interface IUserRegisterService
    {
        ServiceResult<IEnumerable<UserRegister>> GetAllUsers();
        ServiceResult<UserRegister> GetById(int id);
        ServiceResult<UserRegister> VerifiedAccount(UserRegister user);

        ServiceResult<UserRegister> AddNewUser(UserRegister newUser);
    }
}
