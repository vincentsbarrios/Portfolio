using System;
using DataTests.Contexts;
using Microsoft.Data.Sqlite;

namespace DataTests.Helpers
{
    public class InMemoryDatabaseContextFixture : IDisposable
    {
        private readonly SqliteConnection _connection;
        protected readonly TestContext TestContext;

        protected InMemoryDatabaseContextFixture()
        {
            _connection = new SqliteConnection("DataSource=:memory:");
            _connection.Open();
            TestContext = InMemoryDatabaseContextFactory.Create(_connection);
        }

        public void Dispose()
        {
            TestContext.Database.EnsureDeleted();
            _connection.Close();
        }
    }
}