using System.Threading.Tasks;
using DataTests.Helpers;
using FluentAssertions;
using Xunit;

namespace DataTests.Repositories.EfCoreTests
{
    public class DisableEntity : InMemoryDatabaseContextFixture
    {
        [Fact]
        public async Task Disable_Entity_ModifiesDisableFlag()
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