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
    class ReminderRepository<T> : IReminderRepository<T> where T : BaseEntity
    {
        private readonly GroceryDbContext _reminderDbContext;

        public ReminderRepository(GroceryDbContext reminderDbContext)
        {
            _reminderDbContext = reminderDbContext;
        }

        public T Add(T entity)
        {
            _reminderDbContext.Add(entity);
            _reminderDbContext.SaveChanges();
            return entity;
        }

        public IEnumerable<T> GetAll()
        {
            return _reminderDbContext.Set<T>().ToList();
        }

        public int SaveChanges()
        {
            return _reminderDbContext.SaveChanges();
        }

        public T Update(T entity)
        {
            T updated = _reminderDbContext.Update(entity).Entity;
            _reminderDbContext.SaveChanges();
            return updated;
        }
    }
}
