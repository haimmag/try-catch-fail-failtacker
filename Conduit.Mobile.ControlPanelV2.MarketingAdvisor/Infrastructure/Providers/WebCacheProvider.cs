using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace Conduit.Mobile.ControlPanelV2.External.Infrastructure.Providers
{
    public class WebCacheProvider : IPersistentCacheProvider
    {
        public bool Exist(string key)
        {
            return HttpContext.Current.Cache.Get(key) != null;
        }

        public void Delete(string key)
        {
            HttpContext.Current.Cache.Remove(key);
        }

        public void Set(string key, object obj)
        {
            HttpContext.Current.Cache.Insert(key, obj);
        }

        public void Set(string key, object obj, TimeSpan cacheTime)
        {
            HttpContext.Current.Cache.Insert(key, obj, null, DateTime.UtcNow.Add(cacheTime), System.Web.Caching.Cache.NoSlidingExpiration);
        }

        public T Get<T>(string key)
        {
            return (T)HttpContext.Current.Cache.Get(key);
        }

        public object Get(string key)
        {
            return HttpContext.Current.Cache.Get(key);
        }
    }
}
