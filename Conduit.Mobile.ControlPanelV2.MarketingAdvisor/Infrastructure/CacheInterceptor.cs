using Castle.DynamicProxy;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Conduit.Mobile.ControlPanelV2.External.Infrastructure
{
    /*
     * http://blog.willbeattie.net/2010/08/caching-as-cross-cutting-concern-using.html
     */
    public class CacheInterceptor : IInterceptor
    {
        private readonly IContextCacheProvider contextCacheProvider;
        private readonly IPersistentCacheProvider persistentCacheProvider;

        public CacheInterceptor(IContextCacheProvider contextCacheProvider, IPersistentCacheProvider persistentCacheProvider)
        {
            this.contextCacheProvider = contextCacheProvider;
            this.persistentCacheProvider = persistentCacheProvider;
        }

        #region IInterceptor Members

        public void Intercept(IInvocation invocation)
        {
            // check if the method has a return value
            if (invocation.Method.ReturnType == typeof(void))
            {
                invocation.Proceed();
                return;
            }

            CacheResultAttribute cacheResultAttr = Attribute.GetCustomAttribute(invocation.MethodInvocationTarget, typeof(CacheResultAttribute)) as CacheResultAttribute;

            var cacheKey = BuildCacheKeyFrom(invocation);
            ICacheProvider cacheProvider = null;

            // Do we have the cache result attr? 
            if (null != cacheResultAttr)
            {
                // Choose the correct provider based on type
                switch (cacheResultAttr.CacheType)
                {
                    case CacheType.Context:
                        cacheProvider = contextCacheProvider;
                        break;
                    case CacheType.Persistent:
                        cacheProvider = persistentCacheProvider;
                        break;

                }
            }

            // try get the return value from the cache provider
            if (null != cacheProvider)
            {
                var item = cacheProvider.Get(cacheKey);

                if (item != null)
                {
                    invocation.ReturnValue = item;
                    return;
                }
            }

            // call the intercepted method
            invocation.Proceed();

            // cache the result 
            if (null != cacheProvider)
            {
                cacheProvider.Set(cacheKey, invocation.ReturnValue, cacheResultAttr.CacheTime);
            }

            return;
        }

        #endregion

        private static string BuildCacheKeyFrom(IInvocation invocation)
        {
            var className = invocation.TargetType.FullName;
            var methodName = invocation.Method.Name;

            var arguments = (from arg in invocation.Arguments select arg == null ? "null" : arg.ToString()).ToArray();
            var argsString = string.Join(",", arguments);

            var cacheKey = className + "::" + methodName + "(" + argsString + ")";

            return cacheKey;

        }
    }
}