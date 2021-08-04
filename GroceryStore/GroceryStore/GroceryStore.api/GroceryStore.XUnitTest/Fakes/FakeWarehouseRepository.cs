using GroceryStore.Core.Entities;
using GroceryStore.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace GroceryStore.XUnitTest.Fakes
{
    public class FakeWarehouseRepository : IWarehouseRepository<Warehouse>
    {

        private IEnumerable<Warehouse> _Warehouse;

        public FakeWarehouseRepository()
        {


            _Warehouse = new List<Warehouse>
            {
              new Warehouse {
               Id = 1,
               Image = "http/imagen",
               Name = "Peras",
                Price = 100,
             },
              new Warehouse {
               Id = 1,
               Image = "http/imagen",
               Name = "manzanas",
                Price = 100,
             },
            };

        }
        private IEnumerable<Warehouse> _user;

        public Warehouse FilterOne(Expression<Func<Warehouse, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Warehouse> GetAll()
        {
            return _Warehouse;
        }

        public int GetWarehouseId(Expression<Func<Warehouse, bool>> predicate)
        {
            throw new NotImplementedException();
        }
    }

  
}
