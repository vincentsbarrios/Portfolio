using GroceryStore.Core.Entities;
using GroceryStore.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace GroceryStore.Core.Services
{
    public class ReminderService : IReminderService
    {
        private readonly IRepository<Reminder> _remind;

        public ReminderService(IRepository<Reminder> remind)
        {
            _remind = remind;
        }
        
        public ServiceResult<Reminder> addReminder(Reminder remind)
        {
            Reminder _newremind = new Reminder
            {
                Title = remind.Title,
                RemindDate = remind.RemindDate,
                UserId = remind.UserId,
                Id = remind.Id
            };

            if (_newremind == null)
            {
                return ServiceResult<Reminder>.NotFoundResult($"Unable to create a new user");
            }
            else
            {
                _remind.Add(_newremind);
                return ServiceResult<Reminder>.SuccessResult(_newremind);
            }
        }

        public ServiceResult<IEnumerable<Reminder>> getReminder(int idr)
        {
            var reminderlist = _remind.GetAll().Where(x => x.UserId == idr);
            return ServiceResult<IEnumerable<Reminder>>.SuccessResult(reminderlist);
        }
    }
}
