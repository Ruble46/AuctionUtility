using Microsoft.AspNetCore.Mvc;

namespace AuctionUtility.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PreferencesController : ControllerBase
    {
    private readonly SimpleDataStorage _db;

        public PreferencesController(SimpleDataStorage db)
        {
            this._db = db;
        }

        [HttpGet]
        [Route("")]
        public ActionResult Get()
        {
            try {
                Preferences? preferences = this._db.Preferences.ToList()[0];
                return StatusCode(200, preferences);
            }
            catch (Exception ex) {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost]
        [Route("")]
        public ActionResult Save(Preferences preference)
        {
            if(preference == null) {
                return StatusCode(400, "Preference is null");
            }

            try {
                this._db.Preferences.Update(preference);
                this._db.SaveChanges();
                return StatusCode(200, "Preferences saved");
            }
            catch (Exception ex) {
                return StatusCode(500, ex.Message);
            }
        }
    }
}