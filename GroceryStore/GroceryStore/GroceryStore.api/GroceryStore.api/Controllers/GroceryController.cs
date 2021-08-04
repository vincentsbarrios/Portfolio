using GroceryStore.api.Models;
using GroceryStore.Core.Entities;
using GroceryStore.Core.Enums;
using GroceryStore.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace GroceryStore.api.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class GroceryController : ControllerBase
    {

        private readonly IGroceryService _groceryService;

        public GroceryController(IGroceryService groceryService)
        {
            _groceryService = groceryService;
        }


        [HttpPost]
        [Route("{userId}")]
        public ActionResult<IEnumerable<Grocery>> Post([FromBody] string name , int userId)
        {
            var serviceResult = _groceryService.AddGrocery(name, userId);
            if (serviceResult.ResponseCode != ResponseCode.Success)
                return BadRequest(serviceResult.Error);

            return Ok(serviceResult.Result);

        }

        [HttpGet]
        [Route("list/{userId}")]
        public ActionResult<IEnumerable<Grocery>> Get(int userId)
        {
            var serviceResult = _groceryService.ListGrocery(userId);
            if (serviceResult.ResponseCode != ResponseCode.Success)
                return BadRequest(serviceResult.Error);
            return Ok(serviceResult.Result);
        }

        [HttpPost]
        [Route("add/{groceryname}/{userId}")]
        public ActionResult<IEnumerable<Grocery>> Post([FromBody] List<Product> product, string groceryname , int userId)
        {
            var serviceResult = _groceryService.Addproducts(product, groceryname , userId);
            if (serviceResult.ResponseCode != ResponseCode.Success)
                return BadRequest(serviceResult.Error);

            return Ok(serviceResult.Result);
        }



        [HttpPost]
        [Route("Delete/{productname}/{groceryname}/{userId}")]
        public ActionResult<IEnumerable<Grocery>> Post(string productname, string groceryname ,int userId)
        {
            var serviceResult = _groceryService.Deleteproducts(productname, groceryname , userId);
            if (serviceResult.ResponseCode != ResponseCode.Success)
                return BadRequest(serviceResult.Error);

            return Ok(serviceResult.Result);
        }



        [HttpPost]
        [Route("Clear")]
        public ActionResult<IEnumerable<Grocery>> Post1(string groceryname, int UserId)
        {
            var serviceResult = _groceryService.ClearGrocery(groceryname, UserId);
            if (serviceResult.ResponseCode != ResponseCode.Success)
                return BadRequest(serviceResult.Error);

            return Ok(serviceResult.Result);
        }


    }
}
