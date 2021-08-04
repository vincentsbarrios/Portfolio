using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using SpaceXTunes.Core.Entities;
using SpaceXTunes.Infrastructure.Configurations;
using System;
using System.Collections.Generic;
using System.Text;

namespace SpaceXTunes.Infrastructure
{
    public class TunesDbContext : DbContext
    {
        public TunesDbContext(DbContextOptions options) :
             base(options)
        {
   
        }

        public DbSet<Album> Albums { get; set; }
        public DbSet<Song> Songs { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new SongConfiguration());
            modelBuilder.ApplyConfiguration(new AlbumConfiguration());
        }

    }
}
