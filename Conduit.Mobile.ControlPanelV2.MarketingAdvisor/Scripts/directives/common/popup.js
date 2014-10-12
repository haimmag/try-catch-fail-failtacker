'use strict';

app.directive('popup', function ($timeout, PopupService) {
    return {
      restrict: 'A',
      templateUrl: 'templates/common/popup.html',
      link: function(scope, element, attrs) {
        $timeout(function() {
          element.children('.popup_wrapper').addClass('reveal');
        }, 250);

        element.on('click', '.closeLB', function(e) {
          e.preventDefault();
          PopupService.closePopup();
        });

        var closePopup = function(e) {
          if(e.keyCode == 27) {
            PopupService.closePopup();
          }
        };

        angular.element('body').off('keydown', closePopup).on('keydown', closePopup);
      }
    };
  });