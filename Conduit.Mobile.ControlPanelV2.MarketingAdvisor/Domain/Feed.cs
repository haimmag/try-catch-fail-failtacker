using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Conduit.Mobile.ControlPanelV2.External.Domain
{
  public class Feed {
    public string Id { get; set; }
    public string Title { get; set; }    
    public string Summery { get; set; }
    public string Link { get; set; }
    public DateTimeOffset PublishDate { get; set; }
    public string Description { get; set; }
    public DateTime EventDate { get; set; }
  }
}