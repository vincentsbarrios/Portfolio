using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GroceryStore.api.Models
{
    public class ReminderDto
    {
        public int id { get; set; }
        public string Title { get; set; }
        public string RemindDate { get; set; }
        public int UserId { get; set; }
    }
}
