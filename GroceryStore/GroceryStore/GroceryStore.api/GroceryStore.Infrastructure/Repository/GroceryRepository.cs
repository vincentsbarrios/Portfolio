using GroceryStore.Core.Entities;
using GroceryStore.Core.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace GroceryStore.Infrastructure.Repository
{
    public class GroceryRepository<T> : IGroceryRepository<T> where T : BaseEntity
    {

        private readonly GroceryDbContext _groceryDbContext;

        public GroceryRepository(GroceryDbContext groceryDbContext)
        {
            _groceryDbContext = groceryDbContext;
        }

        public T Add(T entity)
        {

            _groceryDbContext.Add(entity);
            _groceryDbContext.SaveChanges();
            return entity;
        }

      
        public Grocery FilterGroceryIncludingDependencies(Expression<Func<Grocery, bool>> predicate)
        {
            return _groceryDbContext.Grocery.Include(p => p.Products).FirstOrDefault(predicate);
        }

        public Grocery GetGroceryList(Expression<Func<Grocery, bool>> predicate)
        {
            return _groceryDbContext.Grocery.FirstOrDefault(predicate);
        }



        public IEnumerable<Grocery> GetGroceryIncludingDependencies(Expression<Func<Grocery, bool>> predicate)
        {


            return _groceryDbContext.Grocery.Include(p => p.Products).Where(predicate).ToList();
        }

        public int SaveChanges()
        {
            return _groceryDbContext.SaveChanges();
        }

        public T Update(T entity)
        {
            T updated = _groceryDbContext.Update(entity).Entity;
            _groceryDbContext.SaveChanges();
            return updated;
        }

   
    }
}
