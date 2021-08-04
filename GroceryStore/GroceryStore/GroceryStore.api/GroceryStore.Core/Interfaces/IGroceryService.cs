using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using GroceryStore.Core.Entities;

namespace GroceryStore.Core.Interfaces
{
    public interface IGroceryService
    {

        ServiceResult<Grocery> AddGrocery(string name , int UserId);

        ServiceResult<IEnumerable<Grocery>> Addproducts(List<Product> product , string groceryname ,int UserId);

        ServiceResult<IEnumerable<Grocery>> ListGrocery(int UserId);

        ServiceResult<IEnumerable<Grocery>> Deleteproducts(string productname, string groceryname , int UserId);
        ServiceResult<IEnumerable<Grocery>> ClearGrocery(string groceryname, int UserId);



    }
}
