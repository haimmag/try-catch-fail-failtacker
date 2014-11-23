using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Conduit.Mobile.ControlPanelV2.External.Infrastructure
{
    public interface ICacheProvider
    {
        bool Exist(string key);
        void Delete(string key);
        void Set(string key, object obj);
        void Set(string key, object obj, TimeSpan cacheTime);
        T Get<T>(string key);
        object Get(string key);
    }

    public interface IContextCacheProvider : ICacheProvider
    {
    }

    public interface IPersistentCacheProvider : ICacheProvider
    {
    }
}
