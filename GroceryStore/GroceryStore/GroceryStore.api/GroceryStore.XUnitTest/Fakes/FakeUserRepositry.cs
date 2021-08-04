using GroceryStore.Core;
using GroceryStore.Core.Entities;
using GroceryStore.Core.Interfaces;
using GroceryStore.Infrastructure.Repository;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace GroceryStore.XUnitTest.Fakes
{
    public class FakeUserRepositry  : IRepository<UserRegister>
    {

        private IEnumerable<UserRegister> _user;


        public FakeUserRepositry()
        {

            
            _user = new List<UserRegister>
            {
              new UserRegister {
               Id = 1,
               Username = "holac",
               Password = "123",
               LastName = "como",
               FirstName = "Hola",
               Email = "hola@gmail.com",

                },

               new UserRegister {
               Id = 2,
               Username = "a",
               Password = "23",
               LastName = "f",
               FirstName = "f",
               Email = "f@gmail.com",

                }
            };

        }

        public IEnumerable<UserRegister> GetAll()
        {
            return _user;
        }

        public IEnumerable<UserRegister> Filter(Expression<Func<UserRegister, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public UserRegister GetById(int id)
        {
            throw new NotImplementedException();
        }

        public UserRegister Add(UserRegister entity)
        {
         
            return entity;
        }

        public UserRegister Update(UserRegister entity)
        {
            throw new NotImplementedException();
        }

        public int SaveChanges()
        {
            throw new NotImplementedException();
        }
    }


}


