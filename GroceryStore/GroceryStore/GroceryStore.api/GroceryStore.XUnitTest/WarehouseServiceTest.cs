using GroceryStore.Core.Entities;
using GroceryStore.Core.Enums;
using GroceryStore.XUnitTest.TestBuilders;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;

namespace GroceryStore.XUnitTest
{
    public class WarehouseServiceTest
    {


        [Fact]
        public void ListWarehouse()
        {
            //arrange
            var builder = new WarehouseTestBuilder();
            var service = builder.Build();

            //act
       

            var result = service.ListWarehouse();

            //assert
            Assert.NotNull(result.Result);
            Assert.True(result.ResponseCode == ResponseCode.Success);

        }
    }
}
