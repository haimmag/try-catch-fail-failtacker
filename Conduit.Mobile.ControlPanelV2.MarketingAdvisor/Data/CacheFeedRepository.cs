using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel.Syndication;
using System.Web;
using System.Xml;
using Conduit.Mobile.ControlPanelV2.External.Domain;
using System.Xml.Linq;
using System.Text.RegularExpressions;
using Conduit.Mobile.ControlPanelV2.External.Code;
using Conduit.Mobile.ControlPanelV2.External.Code.GoogleApi.HolidaysCalendars;
using Conduit.Mobile.ControlPanelV2.External.Infrastructure;

namespace Conduit.Mobile.ControlPanelV2.External.Data
{
  public class CacheFeedRepository : IFeedRepository {

      private HttpContextBase httpContext;
      private IFeedRepository orig;
      private ICacheService cacheService;

      public CacheFeedRepository(IFeedRepository orig, HttpContextBase httpContext, ICacheService cacheService)
      {
          this.cacheService = cacheService;
          this.httpContext = httpContext;
          this.orig = orig;
      }

    public List<Feed> GetAll() {
        throw new NotImplementedException();
    }

    public List<Feed> GetAllByCulture(string culture)
    {
        var feeds = cacheService.Get("IFeedRepository[" + culture + "]", () => orig.GetAllByCulture(culture));

        return feeds;
    }

    public Feed Find(string id)
    {
        throw new NotImplementedException();
    }

    public void Add(Feed feed)
    {
        throw new NotImplementedException();
    }

    public void Remove(Feed feed)
    {
        throw new NotImplementedException();
    }

    public int Count(Func<Feed, bool> func)
    {
        throw new NotImplementedException();
    }

  }
}