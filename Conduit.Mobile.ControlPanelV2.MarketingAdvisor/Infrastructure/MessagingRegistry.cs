using Conduit.Mobile.ControlPanelV2.External.Infrastructure.Bus;
using StructureMap.Configuration.DSL;
using StructureMap.Graph;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Conduit.Mobile.ControlPanelV2.External.Infrastructure
{
    public class MessagingRegistry : Registry
    {
        public MessagingRegistry()
        {
            For<IBus>().Use<MessageBus>();
            For<IMessageHandlerRegistry>().Use<MessageHandlerRegistry>();

            Scan(scanner =>
            {
                scanner.AssembliesFromApplicationBaseDirectory(assembly => assembly.FullName.StartsWith("Conduit."));
                scanner.ConnectImplementationsToTypesClosing(typeof(IHandle<,>));
                scanner.ConnectImplementationsToTypesClosing(typeof(IHandle<>));
            });
        }
    }
}