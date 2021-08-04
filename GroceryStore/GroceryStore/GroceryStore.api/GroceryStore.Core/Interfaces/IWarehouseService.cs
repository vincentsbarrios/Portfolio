using GroceryStore.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace GroceryStore.Core.Interfaces
{
    public interface IWarehouseService
    {

        ServiceResult<IEnumerable<Warehouse>> ListWarehouse();

    }
}
