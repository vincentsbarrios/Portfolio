using System;
using System.Collections.Generic;
using System.Text;

namespace GroceryStore.Core.Entities
{
    public class Warehouse :BaseEntity
    {

        public string Name { get; set; }

        public int Price { get; set; }

        public string Image { get; set; }
    }
}
