using Domain;
using Domain.Contracts;

namespace DataTests
{
    public class TestEntity : BaseEntity, IAggregateRoot
    {
        private TestEntity()
        {
        }

        public TestEntity(string name)
        {
            Name = name;
        }

        public string Name { get; set; }
    }
}