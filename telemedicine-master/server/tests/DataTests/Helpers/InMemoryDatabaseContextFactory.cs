using DataTests.Contexts;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;

namespace DataTests.Helpers
{
    public static class InMemoryDatabaseContextFactory
    {
        public static TestContext Create(SqliteConnection connection)
        {
            var options = new DbContextOptionsBuilder<TestContext>()
                .UseSqlite(connection)
                .EnableSensitiveDataLogging()
                .Options;

            var dbContext = new TestContext(options);
            dbContext.Database.EnsureCreated();

            return dbContext;
        }
    }
}