using GroceryStore.Core.Entities;
using GroceryStore.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace GroceryStore.Core.Services
{
    public class WarehouseService : IWarehouseService
    {
        private readonly IWarehouseRepository<Warehouse> _WarehouseService;

        public WarehouseService(IWarehouseRepository<Warehouse> WarehouseService)
        {
            _WarehouseService = WarehouseService;
        }

        public ServiceResult<IEnumerable<Warehouse>> ListWarehouse()
        {
            return ServiceResult<IEnumerable<Warehouse>>.SuccessResult(_WarehouseService.GetAll());
        }
    }
}
