﻿/*global angular */
/*
 jQuery UI Datepicker plugin wrapper

 @note If ≤ IE8 make sure you have a polyfill for Date.toISOString()
 @param [ui-date] {object} Options to pass to $.fn.datepicker() merged onto uiDateConfig
 */

angular.module('ui.date', [])

.constant('uiDateConfig', {})

.directive('uiDate', ['uiDateConfig', '$timeout', function (uiDateConfig, $timeout) {
    'use strict';
    var options;
    options = {};
    angular.extend(options, uiDateConfig);
    return {
        require: '?ngModel',
        link: function (scope, element, attrs, controller) {
            var getOptions = function () {
                return angular.extend({}, uiDateConfig, scope.$eval(attrs.uiDate));
            };
            var initDateWidget = function () {
                var showing = false;
                var opts = getOptions();

                // If we have a controller (i.e. ngModelController) then wire it up
                if (controller) {

                    // Set the view value in a $apply block when users selects
                    // (calling directive user's function too if provided)
                    var _onSelect = opts.onSelect || angular.noop;
                    opts.onSelect = function (value, picker) {
                        scope.$apply(function () {
                            showing = true;
                            controller.$setViewValue(element.datepicker("getDate"));                            
                            _onSelect(value, picker);
                            element.blur();
                        });
                    };
                    opts.beforeShow = function () {
                        showing = true;
                    };
                    opts.onClose = function (value, picker) {
                        showing = false;
                    };
                    element.on('blur', function () {
                        if (!showing) {
                            scope.$apply(function () {
                                element.datepicker("setDate", element.datepicker("getDate"));
                                controller.$setViewValue(element.datepicker("getDate"));
                            });
                        }
                    });                    

                    // Update the date picker when the model changes
                    controller.$render = function () {
                        var date = controller.$modelValue;
                        
                        if (angular.isDefined(date) && date !== null && !angular.isDate(date)) {
                            throw new Error('ng-Model value must be a Date object - currently it is a ' + typeof date + ' - use ui-date-format to convert it from a string');
                        }
                        element.css('width', '70%')
                            .next('button').addClass('button info');
                        element.datepicker("setDate", date);
                    };
                }
                // If we don't destroy the old one it doesn't update properly when the config changes
                element.datepicker('destroy');
                // Create the new datepicker widget
                element.datepicker(opts);
                if (controller) {
                    // Force a render to override whatever is in the input text box
                    controller.$render();
                }
            };
            // Watch for changes to the directives options
            scope.$watch(getOptions, initDateWidget, true);
        }
    };
}
])

.constant('uiDateFormatConfig', '')

.directive('uiDateFormat', ['uiDateFormatConfig', function (uiDateFormatConfig) {
    var directive = {
        require: 'ngModel',
        link: function (scope, element, attrs, modelCtrl) {
            var dateFormat = attrs.uiDateFormat || uiDateFormatConfig;
            if (dateFormat) {
                // Use the datepicker with the attribute value as the dateFormat string to convert to and from a string
                modelCtrl.$formatters.push(function (value) {
                    if (angular.isString(value) || (angular.isNumber(value) && dateFormat === "@")) {
                        return jQuery.datepicker.parseDate(dateFormat, value);
                    }
                    return null;
                });
                modelCtrl.$parsers.push(function (value) {
                    var returnValue = value;
                    if (value) {
                        returnValue = jQuery.datepicker.formatDate(dateFormat, value);
                        if (returnValue.match(/^\d+$/)) {
                            return parseInt(returnValue, 10);
                        } else {
                            return returnValue;
                        }
                    }
                    return null;
                });
            } else {
                // Default to ISO formatting
                modelCtrl.$formatters.push(function (value) {
                    if (angular.isString(value)) {
                        return new Date(value);
                    }
                    return null;
                });
                modelCtrl.$parsers.push(function (value) {
                    if (value) {
                        return value.toISOString();
                    }
                    return null;
                });
            }
        }
    };
    return directive;
}]);