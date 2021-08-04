using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using GroceryStore.Core.Entities;
using GroceryStore.Core.Interfaces;

namespace GroceryStore.Core.Services
{
    public class GroceryService : IGroceryService
    {
        private readonly IWarehouseRepository<Warehouse> _WarehouseService;
        private readonly IGroceryRepository<Grocery> _GroceryService;
        public GroceryService(IGroceryRepository<Grocery> groceryService , IWarehouseRepository<Warehouse> warehouseService)
        {
            _GroceryService = groceryService;
            _WarehouseService = warehouseService;

        }

        public ServiceResult<Grocery> AddGrocery(string name , int UserId)
        {
            Grocery _grocery = new Grocery
            {

                Name = name,
                UserId = UserId,
                Products = new List<Product>(),

            };

            _GroceryService.Add(_grocery);

            return _grocery == null
              ? ServiceResult<Grocery>.NotFoundResult(
                 $"Unable to create a new grocery") :
                 ServiceResult<Grocery>.SuccessResult(_grocery);

        }

        public ServiceResult<IEnumerable<Grocery>> Addproducts(List<Product> product, string groceryname , int UserId)
        {
            var current_grocery = _GroceryService.FilterGroceryIncludingDependencies(p => p.Name.ToLower() == groceryname.ToLower() && p.UserId == UserId);

            if (current_grocery == null)
            {
                return ServiceResult<IEnumerable<Grocery>>.NotFoundResult(
               $"Unable to found grocery");
            }
            Boolean flag = false;

            foreach (var item in product)
            {

                foreach (var item2 in current_grocery.Products)
                {
                    if (item2.Name.ToLower() == item.Name.ToLower())
                    {
                       
                        item2.Quantity++;
                        int id = _WarehouseService.GetWarehouseId(p => p.Name.ToLower() == item.Name.ToLower());
                        var get_current_productf_rom_warehouse = _WarehouseService.FilterOne(p => p.Id == id);
                        var get_price_from_warehouse = get_current_productf_rom_warehouse.Price;
                        item2.Total = get_price_from_warehouse * item2.Quantity;
                        flag = true;

                    }


                }

                if (flag!=true)
                {
                    item.Quantity++;
                    item.GroceryId = current_grocery.Id;
                    int id = _WarehouseService.GetWarehouseId(p => p.Name.ToLower() == item.Name.ToLower());
                    item.WarehouseId = id;
                    var get_current_productf_rom_warehouse = _WarehouseService.FilterOne(p => p.Id == id);
                    var get_price_from_warehouse = get_current_productf_rom_warehouse.Price;
                    item.Total = get_price_from_warehouse * item.Quantity;
                    current_grocery.Products.Add(item);
                    flag = false;

                }


            }

            _GroceryService.Update(current_grocery);


            return current_grocery == null
             ? ServiceResult<IEnumerable<Grocery>>.NotFoundResult(
                $"Unable to create a new grocery") :
                ServiceResult<IEnumerable<Grocery>>.SuccessResult(

                    _GroceryService.GetGroceryIncludingDependencies(p => p.UserId == current_grocery.UserId)
                    );

        }

        public ServiceResult<IEnumerable<Grocery>> Deleteproducts(string productname, string groceryname ,int UserId)
        {


            var current_grocery = _GroceryService.FilterGroceryIncludingDependencies(p => p.Name.ToLower() == groceryname && p.UserId == UserId);
            if (current_grocery == null)
            {
                ServiceResult<IEnumerable<Grocery>>.NotFoundResult(
                $"No existe ese Producto");
            }

            var listproducts = current_grocery.Products;


            foreach (var item in listproducts)
            {
                if (item.Name == productname)
                {
                    item.Quantity--;
                    var get_current_productf_rom_warehouse = _WarehouseService.FilterOne(p => p.Id == item.WarehouseId);
                    var get_price_from_warehouse = get_current_productf_rom_warehouse.Price;
                    item.Total = get_price_from_warehouse * item.Quantity;
                    if (item.Quantity == 0)
                    {
                        listproducts.Remove(item);
                        break;
                    }
                   
                  
                }
            }

            _GroceryService.Update(current_grocery);
            return current_grocery == null
             ? ServiceResult<IEnumerable<Grocery>>.NotFoundResult(
                $"Unable to create a new grocery") :
                ServiceResult<IEnumerable<Grocery>>.SuccessResult(

                    _GroceryService.GetGroceryIncludingDependencies(p => p.UserId == current_grocery.UserId)
                    );
        }

        public ServiceResult<IEnumerable<Grocery>> ListGrocery(int UserId)
        {
            return ServiceResult<IEnumerable<Grocery>>.SuccessResult(_GroceryService.GetGroceryIncludingDependencies(p => p.UserId == UserId));
        }


        public ServiceResult<IEnumerable<Grocery>> ClearGrocery(string groceryname, int UserId)
        {


            var current_grocery = _GroceryService.FilterGroceryIncludingDependencies(p => p.Name.ToLower() == groceryname && p.UserId == UserId);
            if (current_grocery == null)
            {
                ServiceResult<IEnumerable<Grocery>>.NotFoundResult(
                $"No existe ese Producto");
            }

            var listproducts = current_grocery.Products;

            listproducts.Clear();

            _GroceryService.Update(current_grocery);
            return current_grocery == null
             ? ServiceResult<IEnumerable<Grocery>>.NotFoundResult(
                $"Unable to create a new grocery") :
                ServiceResult<IEnumerable<Grocery>>.SuccessResult(

                    _GroceryService.GetGroceryIncludingDependencies(p => p.UserId == current_grocery.UserId)
                    );
        }
    }
}
