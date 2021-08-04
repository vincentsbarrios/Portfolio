using System.Threading.Tasks;
using DataTests.Helpers;
using FluentAssertions;
using Xunit;

namespace DataTests.Repositories.EfCoreTests
{
    public class AddEntity : InMemoryDatabaseContextFixture
    {
        [Fact]
        public async Task Add_Entity_IncreasesCountByOne()
        {
            var fakeTestRepository = new TestRepository(TestContext);
            var stubEntity = new TestEntity("Example");

            await fakeTestRepository.Add(stubEntity);
            var entitiesAmount = fakeTestRepository.Count();

            entitiesAmount
                .Should()
                .Be(1);
        }
    }
}