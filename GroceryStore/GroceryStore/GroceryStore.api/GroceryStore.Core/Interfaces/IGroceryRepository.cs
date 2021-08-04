using GroceryStore.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace GroceryStore.Core.Interfaces
{
    public interface IGroceryRepository<T>
    {

        T Add(T entity);

        T Update(T entity);

        int SaveChanges();

        IEnumerable<Grocery> GetGroceryIncludingDependencies(Expression<Func<Grocery, bool>> predicate);

        Grocery FilterGroceryIncludingDependencies(Expression<Func<Grocery, bool>> predicate);

        Grocery GetGroceryList(Expression<Func<Grocery, bool>> predicate);


    }
}
