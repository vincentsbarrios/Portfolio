using GroceryStore.Core.Entities;
using GroceryStore.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace GroceryStore.Core.Services
{
    public class VoiceService : IVoiceService
    {
        private readonly IGroceryService _groceryService;
        private readonly IWarehouseRepository<Warehouse> _WarehouseService;
        private readonly IReminderService _remindService;
        private readonly IRepository<Reminder> _remindrepo;
        private readonly IGroceryRepository<Grocery> _groceryRepository;

        public VoiceService(IGroceryRepository<Grocery> groceryRepository, 
            IWarehouseRepository<Warehouse> warehouseService, 
            IReminderService remindService, 
            IRepository<Reminder> remindrepo,
            IGroceryService groceryService)
        {
            _groceryRepository = groceryRepository;
            _groceryService = groceryService;
            _WarehouseService = warehouseService;
            _remindService = remindService;
            _remindrepo = remindrepo;
        }

        ServiceResult<Voice> IVoiceService.getVoiceText(Voice objv)
        {
            var voiceObj = objv;

            string[] listwords = voiceObj.VoiceText.Split(' ');
            List<string> productlist = new List<string>();
            List<string> removeproductlist = new List<string>();
            List<string> reminderTitle = new List<string>();
            List<string> reminderDate = new List<string>();
            _groceryService.ListGrocery(voiceObj.UserId);
            string grocerylist = "";
            List<Product> products = new List<Product>();
            bool flagForProducts = false;
            bool flagForto = false;

            string exec = listwords[0];

            if (exec.ToLower() == "add") //ADD PRODUCT TO THE LIST VOICE
            {

                for (int x = 1; x < listwords.Length; x++)
                {


                    if (listwords[x].ToLower() != "to" && x + 1 < listwords.Length && flagForProducts == false)
                    {
                        if (listwords[x - 1].ToLower() == "to")
                        {
                            flagForto = true;
                        }

                        if (listwords[x].ToLower() != "and" && flagForto == false)
                        {


                            string[] temp = listwords[x].Split(',');
                            productlist.Add(temp[0]);
                        }
                        else
                        {
                            if (flagForto == false)
                            {
                                productlist.Add(listwords[x + 1]);
                                flagForProducts = true;
                            }


                        }
                    }

                    if (listwords[x].ToLower() == "to")
                    {
                        if (listwords[x + 1].ToLower() == "the")
                        {
                            grocerylist = listwords[x + 2];
                        }

                        else
                        {
                            for (int y = x + 1; y < listwords.Length; y++)
                            {
                                string[] temp = listwords[y].Split('.');
                                if (temp[0] != ".")
                                    grocerylist = grocerylist + temp[0];
                            }

                        }
                    }
                }

                foreach (var nameProduct in productlist)
                {
                    Product p = new Product();
                    p.Name = nameProduct.ToLower();
                    products.Add(p);
                }

                _groceryService.Addproducts(products, grocerylist, objv.UserId);
            }
            else if (exec.ToLower() == "remind" || exec.ToLower() == "reminder" || exec.ToLower() == "remember")  //REMINDER VOICE
            {
                for (int x = 3; x < listwords.Length; x++)
                {

                    if (listwords[x].ToLower() == "on")
                    {
                        string[] temp = listwords[x + 1].Split('.');
                        reminderDate.Add(temp[0]);
                        break;
                    }
                    reminderTitle.Add(listwords[x]);
                }
                DateTime dateTime = DateTime.UtcNow.Date;

                string date = dateTime.ToString("yyyy-MM");
                string day = dateTime.ToString("dd");
                int dateInt = Int32.Parse(day);
                string currentdateWK = dateTime.DayOfWeek.ToString();

                for (int x = 0; x < 7; x++)
                {
                    if (reminderDate.Count() != 0)
                    {
                        string d = dateTime.AddDays(x).DayOfWeek.ToString();
                        if (d.ToLower() == reminderDate[0].ToLower())
                        {
                            dateInt = dateInt + x;
                        }
                    }
                }
                date = date + "-" + dateInt.ToString();

                string newtitle = "";
                foreach (string e in reminderTitle)
                {
                    newtitle = newtitle + " " + e;
                }

                Reminder newreminder = new Reminder();
                newreminder.RemindDate = date;
                newreminder.UserId = voiceObj.UserId;
                newreminder.Title = newtitle;
                if (newreminder.RemindDate != "" || newreminder.Title != "")
                {
                    _remindrepo.Add(newreminder);
                }
            }
            else if (exec.ToLower() == "clean" || exec.ToLower() == "erase" || exec.ToLower() == "clearly" || exec.ToLower() == "clear")
            {
                string listTitle = "";
                bool flagActivateFor = false;

                for (int x = 1; x < listwords.Length; x++)
                {
                    if (listwords[x].ToLower() == "list")
                    {
                        flagActivateFor = true;
                        x = 2;
                    }

                    if (flagActivateFor == true)
                    {
                        string[] temp = listwords[x].Split('.');
                        listTitle = listTitle + temp[0];
                    }
                }
                if (listTitle != "")
                    _groceryService.ClearGrocery(listTitle, objv.UserId);
            }
            else if (exec.ToLower() == "remove" || exec.ToLower() == "delete")
            {
                bool activeFlag = false;
                string listName = "";
                string productName = "";

                //“Remove tomatoes from grocery1”.
                for (int x = 1; x < listwords.Length; x++)
                {
                    if (activeFlag == false)
                    {
                        activeFlag = true;
                        productName = listwords[x];
                    }
                    else
                    {
                        if(listwords[x].ToLower() == "from")
                        {
                            x = x + 1;
                        }

                        string[] temp = listwords[x].Split('.');
                        listName = listName + temp[0];
                    }
                }

                _groceryService.Deleteproducts(productName , listName, objv.UserId);
            }
            else if (exec.ToLower() == "create" || exec.ToLower() == "new")
            {
                string nameList = "";
                bool activeFlag = false;

                //“Create list grocery1”
                for (int x = 1; x < listwords.Length; x++)
                {
                    if(listwords[x].ToLower() == "list")
                    {
                        x = x + 1;
                        activeFlag = true;
                    }

                    if(activeFlag == true)
                    {
                        string[] temp = listwords[x].Split('.');
                        nameList = nameList + temp[0];
                    }
                }

                _groceryService.AddGrocery(nameList, objv.UserId);
            }
                return ServiceResult<Voice>.SuccessResult(objv);
        }
    }
}
