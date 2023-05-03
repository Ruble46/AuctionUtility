using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;

namespace AuctionUtility.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BiddersController : ControllerBase
    {
    private readonly SimpleDataStorage _db;

        public BiddersController(SimpleDataStorage db)
        {
            this._db = db;
        }

        [HttpPost]
        [Route("edit")]
        public ActionResult Edit(Bidder bidder)
        {
            if(bidder == null) {
                return StatusCode(400, "Bidder is null");
            }
            
            try {
                this._db.Bidders.Update(bidder);
                this._db.SaveChanges();
                return StatusCode(200, "User " + bidder.number + " updated");
            }
            catch (Exception ex) {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost]
        [Route("add")]
        public ActionResult Add(Bidder bidder)
        {
            if(bidder == null) {
                return StatusCode(400, "Bidder is null");
            }
            
            try {
                this._db.Bidders.Add(bidder);
                this._db.SaveChanges();
                return StatusCode(200, "User " + bidder.name + " added");
            }
            catch (Exception ex) {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet]
        [Route("single")]
        public ActionResult GetSingle(int bidderNumber)
        {
            try {
                Bidder? bidder = this._db.Bidders.Find(bidderNumber);
                return StatusCode(200, bidder);
            }
            catch (Exception ex) {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet]
        [Route("all")]
        public ActionResult GetAll()
        {
            try {
                List<Bidder> bidders = this._db.Bidders.ToList();
                return StatusCode(200, bidders);
            }
            catch (Exception ex) {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete]
        [Route("single")]
        public ActionResult DeleteSingle(int bidderNumber)
        {
            try {
                Bidder? bidder = this._db.Bidders.Find(bidderNumber);

                if(bidder == null) {
                    return StatusCode(404, "Could not find a bidder with the number " + bidderNumber);
                }

                this._db.Bidders.Remove(bidder);
                this._db.SaveChanges();
                return StatusCode(200, "Bidder " + bidder.name + " removed successfully");
            }
            catch (Exception ex) {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete]
        [Route("all")]
        public ActionResult DeleteAll(string adminKey)
        {
            if(adminKey == null || !adminKey.Equals("9596")) {
                return BadRequest("Invalid security key");
            }

            try {
                List<Bidder> bidders = this._db.Bidders.ToList();

                foreach(Bidder bidder in bidders) 
                {
                    this._db.Remove(bidder);
                }

                this._db.SaveChanges();
                return StatusCode(200, "All bidders have been removed");
            }
            catch (Exception ex) {
                return StatusCode(500, ex.Message);
            }
        }
    }
}