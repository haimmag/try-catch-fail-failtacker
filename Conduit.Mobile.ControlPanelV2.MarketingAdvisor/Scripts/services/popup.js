'use strict';

/**
 * Popup factory
 * Create and manage popups
 */

app.factory('PopupService', function ($rootScope, $compile) {

    var activePopupIndex = null;
    var popupsArr = [];
    var indexRunner = -1;

    var defaultOpts = {
      customClass: '',
      templateUrl: '',
      closeButton: true,
      _blurBG: false,
      _width: 600,
      _height: 'auto',
      _topPosition: 'center',
      _leftPosition: 'center'
    };

    var popupService = {

      openPopup: function (parentScope, options) {
        indexRunner++;

        var popupStr = '<div id="popup_' + indexRunner + '" class="popup" popup></div>',
          popupElm = angular.element(popupStr),
          popupScope = parentScope.$new();

        options = angular.extend({}, defaultOpts, options);

        // Attach params and data to the new scope
        if(options) {
          for (var i in options) {
            // Check if the property is not a css property
            if (i.indexOf('_') !== 0 && options.hasOwnProperty(i)) {
              popupScope[i] = options[i];
            }
          }
        }

        // Set css properties
        popupScope.css = {
          top: options._topPosition !== 'center' ? (angular.element(window).scrollTop() + options._topPosition) + 'px' : '50%',
          left: options._leftPosition !== 'center' ? options._leftPosition + 'px' : '50%',
          width: options._width + 'px',
          height: options._height,
          marginLeft: options._leftPosition === 'center' ? -(options._width / 2) + 'px' : 0
        };

        // If previus popup exists, close it, else add dark background
        if(activePopupIndex === null) {
          angular.element('[ng-app]').append('<div class="dark"></div>');
        }
        else {
          this.closePopup(activePopupIndex);
        }

        // Append new element to wizard
        angular.element('[ng-app]').append(popupElm);
        $compile(popupElm)(popupScope);

        if(options._blurBG) {
          angular.element('#main').addClass('blur');
        }

        // Add popup index to popups array
        this.addPopupToArr(indexRunner);

        // Set active popup index to the new popup
        this.setActivePopup(popupsArr.indexOf(indexRunner));
      },

      addPopupToArr: function(idx) {
        popupsArr.push(idx);
      },

      setActivePopup: function(idx) {
        activePopupIndex = idx;
      },

      closePopup: function(idx) {
        if(typeof idx === 'undefined') {
          idx = activePopupIndex;
          angular.element('#main').removeClass('blur');
          angular.element('.dark').remove();
        }
        angular.element('#popup_' + popupsArr[idx]).remove();
        popupsArr.splice(idx, 1);
        this.setActivePopup(popupsArr.length > 0 ? popupsArr[popupsArr.length - 1] : null);
      }
    };

    return popupService;
  });