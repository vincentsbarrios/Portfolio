using GroceryStore.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace GroceryStore.Core.Interfaces
{
    public interface IReminderRepository<T>
    {
        T Add(T entity);

        T Update(T entity);

        int SaveChanges();
        IEnumerable<T> GetAll();
    }
}
