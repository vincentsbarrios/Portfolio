using GroceryStore.Core.Entities;
using GroceryStore.Core.Interfaces;
using GroceryStore.Core.Services;
using GroceryStore.XUnitTest.Fakes;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace GroceryStore.XUnitTest.TestBuilders
{
    public class UserServiceTestBuilder
    {
        private IRepository<UserRegister> _FakeUserervice;
       
        public UserRegisterService Build()
        {
          
            return new UserRegisterService(new FakeUserRepositry());
        }
     

    }
}
