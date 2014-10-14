(function () {

// https://gist.github.com/dperini/729294
var urlRegex = new RegExp(
        "^" +
        // protocol identifier
        "(?:(?:https?|ftp)://)" +
        // user:pass authentication
        "(?:\\S+(?::\\S*)?@)?" +
        "(?:" +
        // IP address exclusion
        // private & local networks
        "(?!(?:10|127)(?:\\.\\d{1,3}){3})" +
        "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +
        "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +
        // IP address dotted notation octets
        // excludes loopback network 0.0.0.0
        // excludes reserved space >= 224.0.0.0
        // excludes network & broacast addresses
        // (first & last IP address of each class)
        "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
        "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
        "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
        "|" +
        // host name
        "(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)" +
        // domain name
        "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*" +
        // TLD identifier
        "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))" +
        ")" +
        // port number
        "(?::\\d{2,5})?" +
        // resource path
        "(?:/[^\\s]*)?" +
        "$", "i"
);

var Helpers = {};
Helpers.getTranslation = function (trans) {
    var translations = {
        'Error_Empty_Text': 'Please fill in this field',
        'Error_MaximumLength_Text': 'Maximum length field',
        'Error_MaximumLength_Text': 'Field must be at least {0} characters',
        'Error_InvalidUrl_Text': 'Url Address inccoret format',
        'Error_InvalidEmail_Text': 'Email inccoret format',
        'Error_InvalidNaturalNumber_Text': 'Invalid number format',
        'Error_InvalidNumber_Text': 'Invalid number format',
        'Error_InvalidDate_Text': 'Invalid date format',
        'Error_UnidenticalPasswords_Text': 'Invalid password format',
    };

    return translations[trans];
};

/* Validation Engine */
angular.module('validation.engine', [])
    .value('validationTypes', '')
    .service("ValidationService", ['$q', function ($q) {
        this.validationGroups = {};

        this.validate = function (groupName) {
            var validationPromises = [];

            if (this.validationGroups[groupName]) {
                this.validationGroups[groupName].forEach(function (cb) {
                    validationPromises.push(cb());
                });
            }

            return $q.all(validationPromises);
        };

        this.register = function (groupName, validateCb) {
            if (this.validationGroups[groupName]) {
                this.validationGroups[groupName].push(validateCb);
            } else {
                this.validationGroups[groupName] = [validateCb];
            }
        };

        this.unregister = function (groupName, validateCb) {
            var index = -1;
            if (this.validationGroups[groupName]) {
                index = this.validationGroups[groupName].indexOf(validateCb);
                if (index != -1) {
                    this.validationGroups[groupName].splice(index, 1);
                }
            }
        };
    }])
    .directive('validate', ['validationTypes', '$q', '$rootScope', '$parse', 'ValidationService',
        function (validationTypes, $q, $rootScope, $parse, ValidationService) {
            return {
                require: '?ngModel',
                scope: {
                    "customFunctionContext": "=",
                    "customFunction": "=",
                    "validationIgnore": "=",
                    "validationNoLoading": "=",
                    "validationNoSuccess": "=",
                    "validationGroup": "=",
                    "validationAsTooltip": "=",
                    "validationRealtime": "="
                },
                link: function (scope, element, attrs, ngModel) {

                    var strGerericErrorMessage = 'Invalid input';

                    if (ngModel) {
                        var validationTypes = [];

                        var errors = {
                            empty: Helpers.getTranslation('Error_Empty_Text') || strGerericErrorMessage,
                            toLong: Helpers.getTranslation('Error_MaximumLength_Text') || strGerericErrorMessage,
                            select: '',// Helpers.getTranslation('Error_SelectCategory_Text') || strGerericErrorMessage,
                            invalidUrl: Helpers.getTranslation('Error_InvalidUrl_Text') || strGerericErrorMessage,
                            invalidEmail: Helpers.getTranslation('Error_InvalidEmail_Text') || strGerericErrorMessage,
                            invalidNaturalNumber: Helpers.getTranslation('Error_InvalidNaturalNumber_Text') || strGerericErrorMessage,
                            invalidNumber: Helpers.getTranslation('Error_InvalidNumber_Text') || strGerericErrorMessage,
                            invalidDate: Helpers.getTranslation('Error_InvalidDate_Text') || strGerericErrorMessage,
                            identical: Helpers.getTranslation('Error_UnidenticalPasswords_Text') || strGerericErrorMessage,
                            specialChars: '' || strGerericErrorMessage, // Helpers.getTranslation('Error_SpecialCharacters_Text')
                            minLength: 'Field must be at least {0} characters',
                            maxLength: 'Field must be at most {0} characters'
                        };

                        var isNumber = function (n) {
                            return !isNaN(parseFloat(n)) && isFinite(n) && n == parseInt(n);
                        };

                        var nat = function (n) {
                            return !isNaN(parseFloat(n)) && isFinite(n);
                        };

                        var validateField = function (elm) {
                            var defer = $q.defer();

                            var error = null,
                                asyncPending = false;

                            // Do not perform validation on hidden fields:
                            if (elm.parents('.field_container:first').is(':hidden') === false && elm.is(':hidden') === false) {
                                for (var i = 0; i < validationTypes.length; i++) {
                                    if (error) break;
                                    switch (validationTypes[i]) {
                                        case 'empty':
                                            // Empty fields
                                            if (elm.val().length < 1) {
                                                error = errors.empty;
                                            }
                                            break;
                                        case 'email':
                                            var emailRegex = /^[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*$/;
                                            if (elm.val().length > 0 && elm.val().search(emailRegex) < 0) {
                                                error = errors.invalidEmail;
                                            }
                                            break;
                                        case 'naturalNumber':
                                            //TODO: do we want to change "    7." to "7", etc.?
                                            if (elm.val().length > 0 && !nat(elm.val())) {
                                                error = errors.invalidNaturalNumber;
                                            }
                                            break;
                                        case 'number':
                                            //TODO: do we want to change "    7." to "7", etc.?
                                            if (elm.val().length > 0 && !isNumber(elm.val())) {
                                                error = errors.invalidNumber;
                                            }
                                            break;
                                        case 'date':
                                            var isValidDate = function (value, userFormat) {
                                                var userFormat = userFormat || 'mm/dd/yyyy', // default format

                                                    delimiter = /[^mdy]/.exec(userFormat)[0],
                                                    theFormat = userFormat.split(delimiter),
                                                    theDate = value.split(delimiter),

                                                    isDate = function (date, format) {
                                                        var m, d, y
                                                        for (var i = 0, len = format.length; i < len; i++) {
                                                            if (/m/.test(format[i])) m = date[i]
                                                            if (/d/.test(format[i])) d = date[i]
                                                            if (/y/.test(format[i])) y = date[i]
                                                        }
                                                        return (
                                                            m > 0 && m < 13 &&
                                                            y && y.length === 4 &&
                                                            d > 0 && d <= (new Date(y, m, 0)).getDate()
                                                            )
                                                    }

                                                return isDate(theDate, theFormat)

                                            }
                                            //TODO: do we want to change "    7." to "7", etc.?
                                            if (elm.val().length > 0 && !isValidDate(elm.val())) {
                                                error = errors['invalidDate'];
                                            }
                                            break;

                                        case 'url':
                                            var value = elm.val();

                                            if (value != value.trim()) {
                                                value = value.trim();
                                                elm.val(value);
                                                ngModel.$setViewValue(value);
                                            }

                                            if (value && value.indexOf("http") !== 0) {
                                                value = "http://" + value;
                                                elm.val(value);
                                                ngModel.$setViewValue(value);
                                            }

                                            if (value && value.search(urlRegex) < 0) {
                                                error = errors['invalidUrl'];
                                            }

                                            break;
                                        case 'customFunction':
                                            var value = elm.val(),
                                                setterFunction = null;
                                            asyncPending = true;
                                            if (typeof scope.customFunction === "function") {

                                                setterFunction = (function (elm, ngModel) {
                                                    return function (settedVal) {
                                                        elm.val(settedVal);
                                                        ngModel.$setViewValue(settedVal);
                                                    };
                                                }(elm, ngModel));

                                                scope.customFunction(value, scope.customFunctionContext, setterFunction).then(defer.resolve, defer.reject);
                                            } else {
                                                //console.error("customFunction is not a function");
                                                defer.reject(new Error("customFunction is not a function"));
                                            }
                                            break;

                                        case 'length':
                                            var value = elm.val(),
                                                minLength = attrs.minlength ? parseInt(attrs.minlength) : undefined,
                                                maxLength = attrs.maxLength ? parseInt(attrs.maxLength) : undefined;

                                            if (minLength && value.length < minLength) {
                                                error = errors.minLength.replace("{0}", minLength);
                                            } else if (maxLength && value.length > maxLength) {
                                                error = errors.maxLength.replace("{0}", maxLength);
                                            }


                                            break;
                                    }
                                }
                            }

                            if (!asyncPending) {
                                defer.resolve(error);
                            }

                            return defer.promise;
                        };

                        scope.$watch(attrs.validate, function (types) {
                            validationTypes = types.split('|');
                        });

                        function performValidation() {
                            var elm = $(element);
                            var field_container = elm.parents('.field_container');

                            // Remove previus validation
                            field_container
                                .removeClass('field_error')
                                .removeClass('field_success')
                                .find('.error').remove();

                            // Look for errors
                            if (!scope.validationNoLoading) {
                                field_container.addClass('field_loading');
                            }
                            var validationPromise = validateField(elm),
                                returnDef = $q.defer();

                            validationPromise.then(function (error) {
                                if (error == null) {
                                    field_container.find('.validationErrorTooltip').remove();
                                    returnDef.resolve();
                                    if (!scope.validationNoSuccess) {
                                        field_container.addClass('field_success');
                                    }
                                } else {
                                    if (scope.validationAsTooltip === true) {
                                        if (field_container.find('.validationErrorTooltip').length === 0) {
                                            var tooltip = document.createElement('div'),
                                                arrSourceOffset = elm.offset();
                                            tooltip.setAttribute('class', 'validationErrorTooltip');
                                            tooltip.appendChild(document.createTextNode(error));
                                            field_container.append(tooltip);
                                            //TooltipService.showTooltip(error, elm.offset(), elm.innerWidth());
                                        }
                                    }
                                    else {
                                        field_container.addClass('field_error');
                                        $('<span class="error">' + error + '</span>').appendTo(field_container);
                                        returnDef.reject(new Error(error));
                                    }
                                }

                                field_container.removeClass('field_loading');
                                // That's a hack to prevent the animation to keep going
                                // http://css-tricks.com/restart-css-animation/
                                // -> triggering reflow /* The actual magic */
                                // without this it wouldn't work. Try uncommenting the line and the transition won't be retriggered.
                                if (field_container[0] && field_container[0].offsetWidth) {
                                    field_container[0].offsetWidth = field_container[0].offsetWidth;
                                }
                            }, function (err) {
                                field_container.removeClass('field_loading');
                                // That's a hack to prevent the animation to keep going
                                // http://css-tricks.com/restart-css-animation/
                                // -> triggering reflow /* The actual magic */
                                // without this it wouldn't work. Try uncommenting the line and the transition won't be retriggered.
                                if (field_container[0] && field_container[0].offsetWidth) {
                                    field_container[0].offsetWidth = field_container[0].offsetWidth;
                                }
                                field_container.addClass('field_error');
                                if (err != null) $('<span class="error">' + err.message + '</span>').appendTo(field_container);
                                returnDef.reject(err);
                            });

                            return returnDef.promise;
                        }

                        if (scope.validationGroup) {
                            ValidationService.register(scope.validationGroup, performValidation);
                        }

                        scope.$on("$destroy", function () {
                            ValidationService.unregister(scope.validationGroup, performValidation);
                        });

                        if (scope.validationIgnore !== 'all' && scope.validationIgnore !== 'blur') {
                            element.on('blur', function () {
                                "use strict";

                                performValidation().then(function (args) {
                                    "use strict";

                                    $rootScope.$broadcast("liveViewRefreshRequest");
                                },
                                    function (args) {
                                        "use strict";
                                        console.log(args);
                                    });
                            });
                        }

                        element.on('keyup', function (e) {
                            var $this = angular.element(this);
                            // Remove previus validation
                            $this.parents('.field_container')
                                .removeClass('field_error')
                                .removeClass('field_success')
                                .find('.error').remove();

                            if (e.keyCode == 13 && (scope.validationIgnore !== 'all' && scope.validationIgnore !== 'enter') || scope.validationRealtime) {
                                performValidation().then(function (args) {
                                    "use strict";
                                    console.log(args);
                                },
                                    function (args) {
                                        "use strict";
                                        console.log(args);
                                    });
                            }
                        });
                    }
                }
            };
        }
    ]);

})();