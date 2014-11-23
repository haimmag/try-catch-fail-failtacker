using System;
using System.Web.Mvc;
using StructureMap.Configuration.DSL;
using StructureMap.Graph;
using StructureMap.Pipeline;
using StructureMap.TypeRules;
using System.Web.Http;
using System.Linq;
using System.Diagnostics;

namespace Conduit.Mobile.ControlPanelV2.External.Infrastructure
{
    public class RepositoryConvention : IRegistrationConvention
    {
        public void Process(Type type, Registry registry)
        {            
            // only interested in non abstract concrete types
            if (type.IsAbstract || !type.IsClass)
                return;

            // Get interface
            var interfaceType = type.GetInterface(
                "I" + type.Name.Split('_').Last() + "Repository");

            if (interfaceType == null)
            {
                Debug.WriteLine("SomeText");
                return;
            }
                
            // register (can use AddType overload method to create named types
            registry.AddType(interfaceType, type);
        }
    }
}