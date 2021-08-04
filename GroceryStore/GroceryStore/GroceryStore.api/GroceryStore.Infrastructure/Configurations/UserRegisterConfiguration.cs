using GroceryStore.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace GroceryStore.Infrastructure.Configurations
{
    public class UserRegisterConfiguration : IEntityTypeConfiguration<UserRegister>
    {
public void Configure(EntityTypeBuilder<UserRegister> builder)
        {
            builder.HasKey(gg => gg.Id);
            builder.Property(gg => gg.FirstName).IsRequired();
            builder.Property(gg => gg.LastName).IsRequired();
            builder.Property(gg => gg.Username).IsRequired();
            builder.Property(gg => gg.Password).IsRequired();
            builder.Property(gg => gg.Email).IsRequired();
        }
    }
}
