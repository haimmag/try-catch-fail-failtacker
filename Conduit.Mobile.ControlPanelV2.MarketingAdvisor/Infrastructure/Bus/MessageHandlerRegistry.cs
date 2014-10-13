using StructureMap;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Conduit.Mobile.ControlPanelV2.External.Infrastructure.Bus
{
    public class MessageHandlerRegistry : IMessageHandlerRegistry
    {
        private readonly IContainer _container;

        public MessageHandlerRegistry(IContainer container)
        {
            _container = container;
        }

        public IHandle<TMessage> GetHandlerFor<TMessage>()
        {
            try
            {
                return _container.GetInstance<IHandle<TMessage>>();
            }
            catch (StructureMapException )
            {
                return null;
            }            
        }

        public IHandle<TRequest, TReply> GetHandlerFor<TRequest, TReply>()
        {
            try
            {
                return _container.GetInstance<IHandle<TRequest, TReply>>();
            }
            catch (StructureMapException )
            {
                return null;
            }
            
        }
    }
}