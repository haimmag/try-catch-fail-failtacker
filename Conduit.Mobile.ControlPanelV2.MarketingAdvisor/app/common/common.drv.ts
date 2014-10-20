﻿(function () {
    'use strict';

    var common = angular.module('common');

    common.directive('niceScroll', ['$timeout' ,function ($timeout) {
        return {
            restrict: 'A',
            link: function (scope, element, attribute) {

                var nicescrolConf = {
                    cursorborder: "0",
                    cursorcolor: "#888",
                    cursorwidth: "10px",
                    autohidemode: 'leave',
                    zindex: 9999,
                    cursoropacitymin: 0.3,
                    cursorminheight: 30
                };

                element.niceScroll(nicescrolConf);

                //$scope.$broadcast("app.main.ctrl.holidays.dataservice.repeat.done", []); 
                scope.$on("app.main.ctrl.holidays.dataservice.repeat.done", function (event, args) {
                    $timeout(function () {
                        console.log("repeate done");                        
                        $("body").getNiceScroll().resize();
                        var scrollTop = $("html").scrollTop() + 1;
                        var scrollTop1 = $("body").scrollTop() + 1;
                        scrollTop = Math.max(scrollTop, scrollTop1);
                        $("body,html").animate({ scrollTop: scrollTop }, "slow");
                    }, 500);                    
                });

            }
        };
    }]);

    common.directive(
        "cnLogDomCreation",
        function () {

            // I bind the UI to the $scope.
            function link($scope, element, attributes) {

                console.log(
                    attributes.cnLogDomCreation,
                    $scope.$index
                    );

            }

            // Return the directive configuration.
            return ({
                link: link
            });

        });

    common.directive('onlyAlphanumeric', function () {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function (scope, element, attr, ctrl) {
                function inputValue(val) {
                    if (val) {
                        var alphanumeric = val.replace(/[^a-zA-Z0-9א-ת\.]/g, '');                        

                        if (alphanumeric !== val) {
                            ctrl.$setViewValue(alphanumeric);
                            ctrl.$render();
                        }
                        return alphanumeric;
                    }
                    return undefined;
                }
                ctrl.$parsers.push(inputValue);
            }
        };
    });

    common.directive('repeatDone', function () {
        return function (scope, element, attrs) {
            if (scope.$last) { // all are rendered
                scope.$eval(attrs.repeatDone);
            }
        };
    });

    common.directive('whenScrolled', function () {
        return function (scope, element, attrs) {
            if (scope.$last) { // all are rendered
                scope.$eval(attrs.repeatDone);
            }
        };
    });

    common.directive('scrollOnClick', function () {
        return {
            restrict: 'A',
            link: function (scope, elm, attrs: any) {
                elm.on('click', function () {
                    var el = angular.element(attrs.scrollOnClick);                    
                    $("body,html").animate({ scrollTop: el.offset().top - 125 }, "slow");
                });
            }
        };
    });

    common.directive('stickyClickScrollElement', ['$rootScope', function ($rootScope) {
        return {
            restrict: 'A',
            link: function (scope, elm, attrs: any) {
                elm.on('click', function () {
                    var el = angular.element($rootScope.stickyActiveElementSelector);
                    $("body,html").animate({ scrollTop: el.offset().top - 125 }, "slow");
                });
            }
        };
    }]);

    common.directive('elSize', ['$window', '$parse', '$timeout', function ($window, $parse,$timeout) {
        return {
            restrict: 'A',
            link: function (scope: ng.IScope, elm, attrs) {
                var fn = $parse(attrs.elSize);
                var win = angular.element($window);                

                win.on("resize", function (e) {
                    var size = { height: elm.height() };
                    fn.assign(scope, size);
                    scope.$apply();
                });

                win.one("scroll", function (e) {
                    var size = { height: elm.height() };
                    fn.assign(scope, size);
                    scope.$apply();
                });

                //scope.$on("app.main.ctrl.holidays.dataservice.repeat.done", function (event, args) {
                //    var size = { height: elm.height() };
                //    fn.assign(scope, size);                    
                //});

                //var unbindWatcher;

                //var watcherFn = function () {
                //    return { height: elm.height() };
                //};

                //var applyFn = function (size) {
                //    fn.assign(scope, size);
                //    unbindWatcher();
                //};

                //unbindWatcher = scope.$watch(watcherFn, applyFn, true);
            }
        };
    }]);

    common.directive('hideOnScroll', ['$window', '$parse', '$timeout', function ($window, $parse, $timeout) {
        return {
            restrict: 'A',
            link: function (scope: ng.IScope, elm, attrs) {                
                var win = angular.element($window);
                var fn = $parse(attrs.hideOnScroll);                                                                   

                win.on("scroll", _.debounce(function () {
                        fn.assign(scope, false);
                        scope.$apply();
                    }, 2500)
                );
            }
        };
    }]);

    common.directive('checkOffset', ['$window', function ($window) {
        return {
            restrict: 'A',
            link: function (scope, elm: JQuery, attrs) {
                angular.element($window).on("scroll", function () {
                    console.log(attrs.checkOffset + " - " + elm.offset().top);                    
                });
            }
        };
    }]);

    //common.directive('wayPointWarrper', ['$window', function ($window) {
    //    return {
    //        restrict: 'A',
    //        link: function (scope, elm: JQuery, attrs) {
    //            elm.waypoint(function (direction) {
    //                if (direction === 'down')
    //                {
    //                    var elmTop = elm.offset().top;
    //                    var docTop = $(document).scrollTop();

    //                    console.log("elmTop:" + elmTop + " ,doctop" + docTop);

    //                    if ((elmTop - docTop) <= 170) {
    //                        elm.find("a").removeClass("info");
    //                    }
    //                }
    //                else
    //                    elm.find("a").addClass("info");

    //                console.log("dir:" + direction);
    //            }, { offset: 170 });

    //            //elm.waypoint('sticky', {
    //            //    offset: 130,
    //            //    wrapper: ''
    //            //});

    //        }
    //    };
    //}]);

})();
