using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel.Syndication;
using System.Web;
using System.Xml;
using Conduit.Mobile.ControlPanelV2.External.Domain;
using System.Xml.Linq;
using System.Text.RegularExpressions;

namespace Conduit.Mobile.ControlPanelV2.External.Data
{
  public class FeedRepository : IFeedRepository {

    public List<Feed> GetAll() {        
        return GetFeedsV1();
    }

    public List<Feed> GetAllByCulture(string culture)
    {
        return GetFeedsV1(culture);
    }

    private List<Feed> GetFeedsV1(string culture = "en.usa")
    {
        // sample feed https://www.google.com/calendar/feeds/en.australian%23holiday%40group.v.calendar.google.com/public/full

        XmlTextReader reader = new XmlTextReader(
           string.Format("https://www.google.com/calendar/feeds/{0}%23holiday%40group.v.calendar.google.com/public/full", culture));
        SyndicationFeed feed = SyndicationFeed.Load(reader);

        var feeds = new List<Feed>();

        foreach (SyndicationItem item in feed.Items)
        {
            feeds.Add(new Feed()
            {
                Id = item.Id,
                EventDate = ExtractEventDateV2(item),
                Title = item.Title.Text,
                //Summery = item.Summary.Text,
                PublishDate = item.PublishDate
            });
        }

        var feedsGroupByDateAndTitle = feeds
            .OrderBy(f => f.EventDate)
            .GroupBy(f => f.Title)
            .Select(f => f.Last())
            .OrderBy(f => f.EventDate);

        return feedsGroupByDateAndTitle.ToList();
    }

    private DateTime ExtractEventDateV2(SyndicationItem item)
    {
        string extensionName = "when";
        SyndicationElementExtension extension = item.ElementExtensions.Where<SyndicationElementExtension>(x => x.OuterName == extensionName).FirstOrDefault();
        XElement ele = extension.GetObject<XElement>();
        string startTime = ele.Attributes().Where(a => a.Name.LocalName == "startTime").FirstOrDefault().Value;

        var date = DateTime.Now;

        var eventDate = DateTime.TryParse(startTime, out date);

        return date;
    }

    private DateTime ExtractEventDate(string address)
    {
        Regex regex = new Regex(@"/(?<Y>\d{4})(?<M>\d{2})(?<D>\d{2})_",
                RegexOptions.IgnoreCase | RegexOptions.CultureInvariant | RegexOptions.IgnorePatternWhitespace| RegexOptions.Compiled);

        // Capture the first Match, if any, in the InputText
        Match m = regex.Match(address);

        DateTime date;

        try
        {
            int year = int.Parse(m.Groups[1].Value);
            int month = int.Parse(m.Groups[2].Value);
            int day = int.Parse(m.Groups[3].Value);
            date = new DateTime(year, month, day);
        }
        catch (Exception)
        {

            date = DateTime.Now;
        }
        

        return date;
    }

    private List<Feed> GetFeedsV2()
    {
        string RssFeedUrl = "https://www.google.com/calendar/feeds/en.uk%23holiday%40group.v.calendar.google.com/public/basic";
        List<Feed> feeds = new List<Feed>();
        try
        {
            XDocument xDoc = new XDocument();
            xDoc = XDocument.Load(RssFeedUrl);
            var items = (from x in xDoc.Descendants("item")
                         select new
                         {
                             title = x.Element("title").Value,
                             link = x.Element("link").Value,
                             pubDate = x.Element("pubDate").Value,
                             description = x.Element("description").Value
                         });
            if (items != null)
            {
                foreach (var i in items)
                {
                    Feed f = new Feed
                    {
                        Title = i.title,
                        Link = i.link,
                        //PublishDate = i.pubDate,
                        Description = i.description
                    };

                    feeds.Add(f);
                }
            }

        }
        catch (Exception)
        {
            throw;
        }

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