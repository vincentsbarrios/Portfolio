using GroceryStore.Core.Entities;
using GroceryStore.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace GroceryStore.Infrastructure.Repository
{
    public class WarehouseRepository<T> : IWarehouseRepository<T> where T : BaseEntity
    {
        private readonly GroceryDbContext _warehouseDbContext;

        public WarehouseRepository(GroceryDbContext warehouseDbContext)
        {
            _warehouseDbContext = warehouseDbContext;
        }
        public Warehouse FilterOne(Expression<Func<Warehouse, bool>> predicate)
        {
            return _warehouseDbContext.Warehouse.FirstOrDefault(predicate);
        }

        public IEnumerable<T> GetAll()
        {
            return _warehouseDbContext.Set<T>().ToList();
        }

        public int GetWarehouseId(Expression<Func<Warehouse, bool>> predicate)
        {
            return _warehouseDbContext.Warehouse.FirstOrDefault(predicate).Id;
        }
    }
}
