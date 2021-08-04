using GroceryStore.Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace GroceryStore.Core.Interfaces
{
    public interface IReminderService
    {
        ServiceResult<IEnumerable<Reminder>> getReminder(int idr);
        ServiceResult<Reminder> addReminder(Reminder remind);
    }
}
