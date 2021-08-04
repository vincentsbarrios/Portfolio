using GroceryStore.Core.Entities;
using GroceryStore.Core.Interfaces;
using GroceryStore.Core.Services;
using GroceryStore.XUnitTest.Fakes;
using System;
using System.Collections.Generic;
using System.Text;

namespace GroceryStore.XUnitTest.TestBuilders
{
    public class WarehouseTestBuilder
    {

        public WarehouseService Build()
        {
            return new WarehouseService(new FakeWarehouseRepository());

        }
    }
}
