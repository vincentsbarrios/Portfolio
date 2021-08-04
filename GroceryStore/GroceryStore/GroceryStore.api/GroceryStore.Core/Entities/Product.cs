using System;
using System.Collections.Generic;
using System.Text;

namespace GroceryStore.Core.Entities
{
    public class Product : BaseEntity
    {

        public int WarehouseId { get; set; }
        public string Name { get; set; }
        public int GroceryId { get; set; }

        public int Quantity { get; set; }

        public int Total { get; set; }



    }
}
