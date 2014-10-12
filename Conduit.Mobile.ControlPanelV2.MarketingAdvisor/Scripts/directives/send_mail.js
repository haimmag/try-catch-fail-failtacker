'use strict';

app.directive('sendToMail', function ($rootScope, PopupService, LocalStorageService) {
	return {
		restrict: 'A',
		link: function (scope, element, attrs) {
		    scope.shippingDetails = {};

			element.on('click', function(e) {
				e.preventDefault();
				PopupService.closePopup();
				LocalStorageService.set('isMailHaveBeenSent', true);
				
				$rootScope.isMailHaveBeenSent = true;

			    // Global save details
				$rootScope.$broadcast("saveMarketingConfigurations", [scope.shippingDetails]);

				if(!$rootScope.$$phase) {
					$rootScope.$apply();
				}

				PopupService.openPopup(scope, {
					templateUrl: 'templates/popups/thank_you.html',
					customClass: 'thankyou_popup',
					_width: 450,
					closeButton: false
				});
			});
		}
	};
});