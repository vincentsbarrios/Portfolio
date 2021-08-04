using System;
using System.Collections.Generic;
using System.Text;

namespace GroceryStore.Core.Entities
{
    public class Grocery : BaseEntity
    {
        
        public Grocery()
        {

            Products = new List<Product>();
          
        }
        public string Name { get; set; }

        public int UserId { get; set; }

        public ICollection<Product> Products { get; set; }
       


    }
}
