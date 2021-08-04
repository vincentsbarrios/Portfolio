using GroceryStore.Core.Entities;
using GroceryStore.Core.Enums;
using GroceryStore.XUnitTest.TestBuilders;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;

namespace GroceryStore.XUnitTest
{
    public class UserServiceTest
    {
        [Theory]
        [InlineData("holac")]
        public void GetById_ExistingProductId_Success(string username)
        {
            //arrange
            var builder = new UserServiceTestBuilder();
            var service = builder.Build();

            //act
            UserRegister user = new UserRegister
            {
                Id = 1,
                Username = "holac",
                Password = "123",
                LastName = "como",
                FirstName = "Hola",
                Email = "hola@gmail.com",
            };

            var result = service.VerifiedAccount(user);

            //assert
            Assert.NotNull(result.Result);
            Assert.True(result.ResponseCode == ResponseCode.Success);
            Assert.Equal(username, result.Result.Username);


        }


        [Fact]
        public void InsertUser()
        {
            //arrange
            var builder = new UserServiceTestBuilder();
            var service = builder.Build();

            //act
            UserRegister user = new UserRegister
            {
                Id = 1,
                Username = "holac",
                Password = "123",
                LastName = "como",
                FirstName = "Hola",
                Email = "hola@gmail.com",
            };

            var result = service.AddNewUser(user);

            //assert
            Assert.NotNull(result.Result);
            Assert.True(result.ResponseCode == ResponseCode.Success);
            
        }
    }
}
