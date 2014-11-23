using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Conduit.Mobile.ControlPanelV2.External.Infrastructure
{

    public enum CacheType
    {
        Context,
        Persistent
    }


    [AttributeUsage(AttributeTargets.Method)]
    public class CacheResultAttribute : Attribute
    {
        private TimeSpan _cacheTime;
        private CacheType _cacheType;

        public TimeSpan CacheTime
        {
            get
            {
                return _cacheTime;
            }
        }

        public CacheType CacheType
        {
            get
            {
                return _cacheType;
            }
        }

        public CacheResultAttribute(CacheType cacheType, long cacheTimeSeconds)
        {
            this._cacheTime = TimeSpan.FromSeconds(cacheTimeSeconds);
            this._cacheType = cacheType;
        }
    }

    public interface ICacheable
    {
    }
}
