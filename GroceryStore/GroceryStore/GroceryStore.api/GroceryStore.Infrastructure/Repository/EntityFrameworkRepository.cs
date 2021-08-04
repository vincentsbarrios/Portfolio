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
    public class EntityFrameworkRepository<T> : IRepository<T> where T : BaseEntity
    {
        protected GroceryDbContext _groceryDbContext;
        public EntityFrameworkRepository(GroceryDbContext groceryDbContext)
        {
            _groceryDbContext = groceryDbContext;
        }

        public T Add(T entity)
        {
            _groceryDbContext.Add(entity);
            _groceryDbContext.SaveChanges();
            return entity;
        }

        public IEnumerable<T> Filter(Expression<Func<T, bool>> predicate)
        {
            return _groceryDbContext.Set<T>().Where(predicate).ToList();
        }

     

        public IEnumerable<T> GetAll()
        {
            return _groceryDbContext.Set<T>().ToList();
        }

        public T GetById(int id)
        {
            return _groceryDbContext.Set<T>().FirstOrDefault(x => x.Id == id);
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
