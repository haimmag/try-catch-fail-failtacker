using Castle.DynamicProxy;
using Conduit.Mobile.ControlPanelV2.External.Infrastructure.Providers;
using StructureMap;
using StructureMap.Configuration.DSL;
using StructureMap.Interceptors;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Conduit.Mobile.ControlPanelV2.External.Infrastructure
{
    public class UnterceptorRegistry : Registry
    {
        public UnterceptorRegistry()
        {            
            //RegisterInterceptor(
            // new AttributeMatchTypeInterceptor<TransactionalAttribute, PostRepoInterceptor>());

            //RegisterInterceptor(
            // new AttributeMatchTypeInterceptor<LoggerAttribute, PostRepoInterceptor>());

            For<IContextCacheProvider>().Singleton().Use<HttpContextCacheProvider>();
            For<IPersistentCacheProvider>().Singleton().Use<WebCacheProvider>();

            RegisterInterceptor(
             new InterfaceMatchTypeInterceptor<ICacheable, CacheInterceptor>());
        }
    }

    public class SampleInterceptor : IInterceptor
    {
        public void Intercept(IInvocation invocation)
        {        
            invocation.Proceed();

            if (invocation.Method.Name.Equals("GetAll", StringComparison.InvariantCultureIgnoreCase))
                invocation.ReturnValue = this.GetModifiedGetAllResult(invocation.ReturnValue);
        }

        private object GetModifiedGetAllResult(object getAllResult)
        {
            return "";
        }
    }

    public class AttributeMatchTypeInterceptor<TAttribute, TInterceptor> :
        TypeInterceptor
        where TAttribute : Attribute
        where TInterceptor : IInterceptor
    {
        private readonly ProxyGenerator m_proxyGeneration = new ProxyGenerator();

        public object Process(object target, IContext context)
        {
            //NOTE: can't query IContext for actual interface
            Type interfaceType = target.GetType().GetInterfaces().First();
            return m_proxyGeneration.CreateInterfaceProxyWithTarget(
                interfaceType,
                target,
                ObjectFactory.GetInstance<TInterceptor>());
        }

        public bool MatchesType(Type type)
        {
            //return type.GetCustomAttributes(typeof(TAttribute), true).Length > 0;
            return typeof(ICacheable).IsAssignableFrom(type);
        }
    }

    public class InterfaceMatchTypeInterceptor<TInterface, TInterceptor> :
        TypeInterceptor
        where TInterface : class
        where TInterceptor : IInterceptor
    {
        private readonly ProxyGenerator m_proxyGeneration = new ProxyGenerator();

        public object Process(object target, IContext context)
        {
            //NOTE: can't query IContext for actual interface
            Type interfaceType = target.GetType().GetInterfaces().First();
            return m_proxyGeneration.CreateInterfaceProxyWithTarget(
                interfaceType,
                target,
                ObjectFactory.GetInstance<TInterceptor>());
        }

        public bool MatchesType(Type type)
        {
            //return type.GetCustomAttributes(typeof(TAttribute), true).Length > 0;
            return typeof(TInterface).IsAssignableFrom(type);
        }
    }
}