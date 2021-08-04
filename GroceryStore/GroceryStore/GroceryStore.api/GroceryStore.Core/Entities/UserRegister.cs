using System;
using System.Collections.Generic;
using System.Text;

namespace GroceryStore.Core.Entities
{
    public class UserRegister : BaseEntity
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
    }
}
