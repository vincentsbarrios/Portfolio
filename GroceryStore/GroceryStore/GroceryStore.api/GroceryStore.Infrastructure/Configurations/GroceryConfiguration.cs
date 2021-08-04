using System;
using System.Collections.Generic;
using GroceryStore.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace GroceryStore.Infrastructure.Configurations
{
    class GroceryConfiguration : IEntityTypeConfiguration<Grocery>
    {
        public void Configure(EntityTypeBuilder<Grocery> builder)
        {
            builder.HasKey(gg => gg.Id);

            builder.Property(gg => gg.Id).ValueGeneratedOnAdd();

            builder.Property(gg => gg.Name).IsRequired();

            builder.HasMany(r =>r.Products);

           
        }
    }
}
