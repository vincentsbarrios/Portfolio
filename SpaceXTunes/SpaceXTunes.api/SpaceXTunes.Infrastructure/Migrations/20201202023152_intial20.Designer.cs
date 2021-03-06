// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using SpaceXTunes.Infrastructure;

namespace SpaceXTunes.Infrastructure.Migrations
{
    [DbContext(typeof(TunesDbContext))]
    [Migration("20201202023152_intial20")]
    partial class intial20
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "5.0.0");

            modelBuilder.Entity("SpaceXTunes.Core.Entities.Album", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("albumName")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("artistName")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("description")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("genres")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("img")
                        .HasColumnType("TEXT");

                    b.Property<int>("popularity")
                        .HasColumnType("INTEGER");

                    b.Property<float>("price")
                        .HasColumnType("REAL");

                    b.Property<int>("rating")
                        .HasColumnType("INTEGER");

                    b.Property<string>("releaseDate")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<bool>("state")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.ToTable("Albums");
                });

            modelBuilder.Entity("SpaceXTunes.Core.Entities.Song", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("albumId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("artist")
                        .HasColumnType("TEXT");

                    b.Property<int>("duration")
                        .HasColumnType("INTEGER");

                    b.Property<string>("name")
                        .HasColumnType("TEXT");

                    b.Property<float>("price")
                        .HasColumnType("REAL");

                    b.Property<int>("rating")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("state")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("albumId");

                    b.ToTable("Songs");
                });

            modelBuilder.Entity("SpaceXTunes.Core.Entities.Song", b =>
                {
                    b.HasOne("SpaceXTunes.Core.Entities.Album", null)
                        .WithMany("songs")
                        .HasForeignKey("albumId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("SpaceXTunes.Core.Entities.Album", b =>
                {
                    b.Navigation("songs");
                });
#pragma warning restore 612, 618
        }
    }
}
