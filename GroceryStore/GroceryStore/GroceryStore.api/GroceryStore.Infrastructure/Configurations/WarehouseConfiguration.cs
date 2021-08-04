using GroceryStore.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace GroceryStore.Infrastructure.Configurations
{
    class WarehouseConfiguration : IEntityTypeConfiguration<Warehouse>
    {
        public void Configure(EntityTypeBuilder<Warehouse> builder)
        {
            builder.HasKey(gg => gg.Id);

            builder.Property(gg => gg.Id).ValueGeneratedOnAdd();
            builder.Property(gg => gg.Name).IsRequired();
            builder.Property(gg => gg.Price).IsRequired();
            builder.Property(gg => gg.Image).IsRequired();
        }
    }
}
