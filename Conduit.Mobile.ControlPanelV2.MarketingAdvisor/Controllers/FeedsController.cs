using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using Conduit.Mobile.ControlPanelV2.External.Domain;
using Conduit.Mobile.ControlPanelV2.External.Models;
using Conduit.Mobile.ControlPanelV2.External.Data;
using Conduit.Mobile.ControlPanelV2.External.Infrastructure.Bus;
using Conduit.Mobile.ControlPanelV2.External.Code;
using Conduit.Mobile.ControlPanelV2.External.Code.GoogleApi.HolidaysCalendars;
using WebApi.OutputCache.V2;
using Conduit.Mobile.ControlPanelV2.External.Infrastructure;

namespace Conduit.Mobile.ControlPanelV2.External.Controllers
{
    public class FeedsController : ApiController
    {
        private IFeedRepository feedRepository;
        private IBus _bus;

        public FeedsController(IFeedRepository feedRepository, IBus bus)
        {
            this.feedRepository = feedRepository;
            this._bus = bus;

            bus.Send<string>("feeds ctor call");
        }

        // GET: api/Feeds
        //[CacheOutput(ClientTimeSpan = 86400, ServerTimeSpan = 86400)]
        public IQueryable<Feed> GetFeeds()
        {
            string culture = CultureHelper.GetCurrentCulture();            
            return feedRepository.GetAllByCulture(culture).AsQueryable();
        }

        // GET: api/Feeds/5
        [ResponseType(typeof(Feed))]
        public IHttpActionResult GetFeed(string id)
        {
            Feed feed = feedRepository.Find(id);
            if (feed == null)
            {
                return NotFound();
            }

            return Ok(feed);
        }

        // PUT: api/Feeds/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutFeed(string id, Feed feed)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != feed.Id)
            {
                return BadRequest();
            }            

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Feeds
        [ResponseType(typeof(Feed))]
        public IHttpActionResult PostFeed(Feed feed)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            feedRepository.Add(feed);

            try
            {
                
            }
            catch (DbUpdateException)
            {
                if (FeedExists(feed.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = feed.Id }, feed);
        }

        // DELETE: api/Feeds/5
        [ResponseType(typeof(Feed))]
        public IHttpActionResult DeleteFeed(string id)
        {
            Feed feed = feedRepository.Find(id);
            if (feed == null)
            {
                return NotFound();
            }

            feedRepository.Remove(feed);            

            return Ok(feed);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                
            }
            base.Dispose(disposing);
        }

        private bool FeedExists(string id)
        {
            return feedRepository.Count(e => e.Id == id) > 0;
        }
    }
}