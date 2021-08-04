using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace SpaceXTunes.Core.Interfaces
{
    public interface IRepository<T>
    {
        IEnumerable<T> GetAll();

        IEnumerable<T> Filter(Expression<Func<T, bool>> predicate);

        IEnumerable<T> GetSongsByAlbum();

        T GetById(int id);

        T Add(T entity);

        T Update(T entity);

        int SaveChanges();
    }
}
