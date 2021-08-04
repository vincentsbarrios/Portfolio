using System;
using System.Collections.Generic;
using System.Text;

namespace GroceryStore.Core.Entities
{
    public class Reminder : BaseEntity
    {
        public string Title { get; set; }
        public string RemindDate { get; set; }
        public int UserId { get; set; }
    }
}
