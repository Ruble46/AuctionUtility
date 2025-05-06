using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;

namespace AuctionUtility.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DonationsController : ControllerBase
    {
    private readonly SimpleDataStorage _db;

        public DonationsController(SimpleDataStorage db)
        {
            this._db = db;
        }

        [HttpPost]
        [Route("add")]
        public ActionResult Add(Donation donation)
        {
            if (donation == null)
            {
                return StatusCode(400, "Donation is null");
            }

            try
            {
                Preferences? preferences = this._db.Preferences.ToList()[0];
                donation.auctionYear = preferences.selectedYear;
                donation.id = new Guid();

                this._db.Donations.Add(donation);
                this._db.SaveChanges();
                return StatusCode(200, "Donation of $" + donation.amount + " added");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost]
        [Route("edit")]
        public ActionResult Edit(Donation donation)
        {
            if(donation == null) {
                return StatusCode(400, "Donation is null");
            }
            
            try {
                this._db.Donations.Update(donation);
                this._db.SaveChanges();
                return StatusCode(200, "Donation of $" + donation.amount + " added");
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
                Preferences? preferences = this._db.Preferences.ToList()[0];
                List<Donation> donations = this._db.Donations.Where(bidder => bidder.auctionYear.Equals(preferences.selectedYear)).ToList();
                return StatusCode(200, donations);
            }
            catch (Exception ex) {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete]
        [Route("single")]
        public ActionResult DeleteSingle(Guid id)
        {
            try {
                Preferences? preferences = this._db.Preferences.ToList()[0];
                Donation? donation = this._db.Donations.FirstOrDefault(donation => donation.id == id && donation.auctionYear.Equals(preferences.selectedYear));

                if(donation == null) {
                    return StatusCode(404, "Could not find the specified donation");
                }

                this._db.Donations.Remove(donation);
                this._db.SaveChanges();
                return StatusCode(200, "Donation of $" + donation.amount + " removed successfully");
            }
            catch (Exception ex) {
                return StatusCode(500, ex.Message);
            }
        }
    }
}