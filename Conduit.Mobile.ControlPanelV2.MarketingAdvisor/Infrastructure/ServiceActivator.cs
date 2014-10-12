using StructureMap;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Dispatcher;
using System.Web.Mvc;

namespace Conduit.Mobile.ControlPanelV2.External.Infrastructure
{
    public class ServiceActivator : IHttpControllerActivator
    {
        public ServiceActivator(HttpConfiguration configuration) { }

        public IHttpController Create(HttpRequestMessage request, HttpControllerDescriptor controllerDescriptor, Type controllerType)
        {
            //var controller = ObjectFactory.GetInstance(controllerType) as IHttpController;
            var controller = DependencyResolver.Current.GetService(controllerType) as IHttpController;
            return controller;
        }
    }
}