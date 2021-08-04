using Data.Repositories;
using DataTests.Contexts;

namespace DataTests
{
    public class TestRepository : EfRepository<TestEntity>
    {
        public TestRepository(TestContext context) : base(context)
        {
        }
    }
}