(function () {
    'use strict';

    var common = angular.module('common');

    common.directive('repeatDone', function () {
        return function (scope, element, attrs) {
            if (scope.$last) {
                scope.$eval(attrs.repeatDone);
            }
        };
    });

    common.directive('whenScrolled', function () {
        return function (scope, element, attrs) {
            if (scope.$last) {
                scope.$eval(attrs.repeatDone);
            }
        };
    });

    common.directive('scrollOnClick', function () {
        return {
            restrict: 'A',
            link: function (scope, elm, attrs) {
                elm.on('click', function () {
                    var el = angular.element(attrs.scrollOnClick);
                    $("body").animate({ scrollTop: el.offset().top - 125 }, "slow");
                });
            }
        };
    });

    common.directive('elSize', [
        '$window', '$parse', '$timeout', function ($window, $parse, $timeout) {
            return {
                restrict: 'A',
                link: function (scope, elm, attrs) {
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

    common.directive('checkOffset', [
        '$window', function ($window) {
            return {
                restrict: 'A',
                link: function (scope, elm, attrs) {
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
//# sourceMappingURL=common.drv.js.map
