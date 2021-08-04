using GroceryStore.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace GroceryStore.Infrastructure.Configurations
{
    class ReminderConfiguration : IEntityTypeConfiguration<Reminder>
    {
        public void Configure(EntityTypeBuilder<Reminder> builder)
        {
            builder.HasKey(gg => gg.Id);
            builder.Property(gg => gg.Title).IsRequired();
            builder.Property(gg => gg.UserId).IsRequired();
            builder.Property(gg => gg.RemindDate).IsRequired();
        }
    }
}

