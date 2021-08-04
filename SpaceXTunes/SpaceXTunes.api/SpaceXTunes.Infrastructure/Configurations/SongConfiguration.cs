using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SpaceXTunes.Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace SpaceXTunes.Infrastructure.Configurations
{
    public class SongConfiguration : IEntityTypeConfiguration<Song>
    {
        public void Configure(EntityTypeBuilder<Song> builder)
        {
            builder.HasKey(gg => gg.Id);

            builder.Property(gg => gg.Id).ValueGeneratedOnAdd();

        }
    }
}
