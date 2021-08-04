using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SpaceXTunes.Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace SpaceXTunes.Infrastructure.Configurations
{
    public class AlbumConfiguration : IEntityTypeConfiguration<Album>
    {
        public void Configure(EntityTypeBuilder<Album> builder)
        {
            builder.HasKey(gg => gg.Id);
            builder.Property(gg => gg.albumName).IsRequired();
            builder.Property(gg => gg.price).IsRequired();
            builder.Property(gg => gg.rating).IsRequired();
            builder.Property(gg => gg.genres).IsRequired();
            builder.Property(gg => gg.artistName).IsRequired();
            builder.Property(gg => gg.description).IsRequired();
            builder.Property(gg => gg.releaseDate).IsRequired();
            builder.Property(gg => gg.Id).IsRequired();
        }
    }
}
