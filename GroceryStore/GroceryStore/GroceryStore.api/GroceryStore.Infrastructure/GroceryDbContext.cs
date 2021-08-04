using GroceryStore.Core.Entities;
using GroceryStore.Infrastructure.Configurations;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace GroceryStore.Infrastructure
{
    public class GroceryDbContext : DbContext
    {
        public GroceryDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<UserRegister> UserRegisters { get; set; }
        public DbSet<Grocery> Grocery { get; set; }
        public DbSet<Product> Product { get; set; }
        public DbSet<Warehouse> Warehouse { get; set; }
        public DbSet<Reminder> Reminder { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new UserRegisterConfiguration());
            modelBuilder.ApplyConfiguration(new GroceryConfiguration());
            modelBuilder.ApplyConfiguration(new ProductConfiguration());
            modelBuilder.ApplyConfiguration(new WarehouseConfiguration());
            modelBuilder.ApplyConfiguration(new ReminderConfiguration());
        }
    }
}
