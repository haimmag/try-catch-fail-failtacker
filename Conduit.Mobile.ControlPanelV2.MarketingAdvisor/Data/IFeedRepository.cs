using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Conduit.Mobile.ControlPanelV2.External.Domain;

namespace Conduit.Mobile.ControlPanelV2.External.Data
{
  public interface IFeedRepository {
    List<Feed> GetAll();
    List<Feed> GetAllByCulture(string culture);
    Feed Find(string id);

    void Add(Feed feed);

    void Remove(Feed feed);

    int Count(Func<Feed, bool> func);
  }
}
