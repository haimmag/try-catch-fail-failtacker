using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace Conduit.Mobile.ControlPanelV2.External.Infrastructure.Providers
{
    public class HttpContextCacheProvider : IContextCacheProvider
    {
        public bool Exist(string key)
        {
            return HttpContext.Current.Items[key] != null;
        }

        public void Set(string key, object obj)
        {
            HttpContext.Current.Items[key] = obj;
        }

        public void Set(string key, object obj, TimeSpan cacheTime)
        {
            Set(key, obj);
        }

        public T Get<T>(string key)
        {
            return (T)HttpContext.Current.Items[key];
        }

        public object Get(string key)
        {
            return HttpContext.Current.Items[key];
        }


        public void Delete(string key)
        {
            HttpContext.Current.Items[key] = null;
        }
    }
}
