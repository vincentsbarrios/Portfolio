using Domain.Aggregates.Hospitals;
using Domain.Aggregates.Networks;
using Domain.Aggregates.Patients;
using Domain.Aggregates.Reference;
using Domain.Aggregates.ReferencesACS_PS;
using Microsoft.EntityFrameworkCore;

namespace Data.Contexts
{
    public class TelemedicineContext : DbContext
    {
        public TelemedicineContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Network> Networks { get; set; }
        public DbSet<Patient> Patients { get; set; }
        public DbSet<Hospital> Hospitals { get; set; }
        public DbSet<Reference> References { get; set; }
        public DbSet<ReferenceCommunityAgentHealthPromoter> ReferencesCommunityAgentHealthPromoter { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Network>()
                .HasMany<Hospital>(h => h.Hospitals)
                .WithOne(x => x.Network);
        }
    }
}