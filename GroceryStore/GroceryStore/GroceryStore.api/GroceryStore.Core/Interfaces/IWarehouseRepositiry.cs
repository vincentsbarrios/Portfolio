using GroceryStore.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace GroceryStore.Core.Interfaces
{
    public interface IWarehouseRepository<T>
    {

        int GetWarehouseId(Expression<Func<Warehouse, bool>> predicate);

        Warehouse FilterOne(Expression<Func<Warehouse, bool>> predicate);

        IEnumerable<T> GetAll();



    }
}
