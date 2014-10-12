﻿using System;
using System.Collections.Generic;

namespace Conduit.Mobile.ControlPanelV2.External.Infrastructure.ModelMetadata
{
	public interface IModelMetadataFilter
	{
		void TransformMetadata(System.Web.Mvc.ModelMetadata metadata,
			IEnumerable<Attribute> attributes);
	}
}