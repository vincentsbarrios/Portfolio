using GroceryStore.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace GroceryStore.Infrastructure.Configurations
{
    class ProductConfiguration : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder.HasKey(gg => gg.Id);

            builder.Property(gg => gg.Id).ValueGeneratedOnAdd();

            builder.Property(gg => gg.Name).IsRequired();

            
        }
    }
}
