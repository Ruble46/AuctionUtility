using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;

namespace AuctionUtility.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LotsController : ControllerBase
    {
    private readonly SimpleDataStorage _db;

        public LotsController(SimpleDataStorage db)
        {
            this._db = db;
        }

        [HttpPost]
        [Route("edit")]
        public ActionResult Edit(Lot lot)
        {
            if(lot == null) {
                return StatusCode(400, "Lot is null");
            }
            
            try {
                this._db.Lots.Update(lot);
                this._db.SaveChanges();
                return StatusCode(200, "Lot " + lot.lotNumber + " updated");
            }
            catch (Exception ex) {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost]
        [Route("add")]
        public ActionResult Add(Lot lot)
        {
            if(lot == null) {
                return StatusCode(400, "Bidder is null");
            }
            
            try {
                this._db.Lots.Add(lot);
                this._db.SaveChanges();
                return StatusCode(200, "Lot " + lot.lotNumber + " added");
            }
            catch (Exception ex) {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet]
        [Route("single")]
        public ActionResult GetSingle(int lotNumber)
        {
            try {
                Lot lot = this._db.Lots.Find(lotNumber);
                return StatusCode(200, lot);
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
                List<Lot> lots = this._db.Lots.ToList();
                return StatusCode(200, lots);
            }
            catch (Exception ex) {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete]
        [Route("single")]
        public ActionResult DeleteSingle(int lotNumber)
        {
            try {
                Lot lot = this._db.Lots.Find(lotNumber);

                this._db.Lots.Remove(lot);
                this._db.SaveChanges();
                return StatusCode(200, "Lot " + lot.lotNumber + " removed");
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
                List<Lot> lots = this._db.Lots.ToList();

                foreach(Lot lot in lots) 
                {
                    this._db.Remove(lot);
                }

                this._db.SaveChanges();
                return StatusCode(200, "All lots have been removed");
            }
            catch (Exception ex) {
                return StatusCode(500, ex.Message);
            }
        }
    }
}