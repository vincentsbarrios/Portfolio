using Microsoft.EntityFrameworkCore;
using SpaceXTunes.Core.Entities;
using SpaceXTunes.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace SpaceXTunes.Infrastructure.Repositories
{
    public class EntityFrameworkRepository<T> : IRepository<T> where T : BaseEntity
    {
        private TunesDbContext _tunesDbContext;
        public EntityFrameworkRepository(TunesDbContext tunesDbContext)
        {
            _tunesDbContext = tunesDbContext;
        }

        public T Add(T entity)
        {
            _tunesDbContext.Add(entity);
            _tunesDbContext.SaveChanges();
            return entity;
        }

        public IEnumerable<T> Filter(Expression<Func<T, bool>> predicate)
        {
            return _tunesDbContext.Set<T>().Where(predicate).ToList();
        }

        public IEnumerable<T> GetAll()
        {
            return _tunesDbContext.Set<T>().ToList();
        }

        public T GetById(int id)
        {
            return _tunesDbContext.Set<T>().FirstOrDefault(x => x.Id == id);
        }

        public IEnumerable<T> GetSongsByAlbum()
        {
            return (IEnumerable<T>)_tunesDbContext.Albums.Include(s => s.songs);
        }

        public int SaveChanges()
        {
            return _tunesDbContext.SaveChanges();
        }

        public T Update(T entity)
        {
            T updated = _tunesDbContext.Update(entity).Entity;
            _tunesDbContext.SaveChanges();
            return updated;
        }
    }
}
