(function () {
    'use strict';

    angular.module('app').controller('MainCtrl', main);

    main.$inject = ['$scope', '$rootScope', 'Holidays.DataService', '$timeout', 'ValidationService', 'CommonService', 'AmsService'];

    function main($scope, $rootScope, HolidaysDataService, $timeout, ValidationService, CommonService, AmsService) {
        /* jshint validthis: true */
        var vm = this;
        var cachedData;

        // get config data
        var config = CommonService.config;

        // Get AppId from url
        vm.appId = config.productionAppId;

        vm.filterByEventType = function (eventType, searchTitle) {
            vm.search.event = searchTitle;
            HolidaysDataService.getDataByEventType(eventType).then(getDataSuccess);
        };

        vm.elementsLayoutDone = function () {
            console.log("broadcast new event");
            $scope.$broadcast("app.main.ctrl.dataservice.repeat.done", []);
            $scope.$broadcast("app.main.ctrl.update", []);

            if (vm.pageLoaded == false) {
                vm.pageLoaded = true;
            }
        };

        vm.createCustomEvent = function (ce, btne) {
            var validationResultPromise = ValidationService.validate("customEvents");

            validationResultPromise.then(function () {
                //"validation successs"
                var newEvent = HolidaysDataService.createCustomEvent(ce);

                //clean form
                btne.customEvents = false;

                //search index date and splice it
                var spliceIdx = getSpliceIdx();
                vm.dataRows.splice(spliceIdx, 0, newEvent);

                $scope.$broadcast("app.main.ctrl.update", []);

                //position elements in place
                scroll2event(newEvent);
            }, function (err) {
                //"validation fail"
            });

            function getSpliceIdx() {
                var spliceIdx = 0;
                for (var i = 0; i < vm.dataRows.length; i++) {
                    if (vm.dataRows[i].date > ce.date) {
                        break;
                    }
                    spliceIdx++;
                }

                return spliceIdx;
            }

            function scroll2event(newEvent) {
                $timeout(function () {
                    var el = angular.element('.' + newEvent.cssMarker);
                    if (el.length > 0)
                        $("body,html").animate({ scrollTop: el.offset().top - 125 }, "slow");
                    else
                        $("body,html").animate({ scrollTop: 0 }, "slow");
                });
            }
        };

        vm.cancelCustomEvent = function (ce, btne) {
            //clean form
            btne.customEvents = false;
        };

        vm.loadMore = function () {
            vm.loadInProgress = true;

            // alert('load more');
            loadMoreFn();
        };

        vm.dateOptions = {
            showOn: "both", buttonImage: "/Images/Wizard/Datepicker.png", onSelect: function () {
            }
        };

        vm.customAdOptions = function () {
            return { date: new Date(), addType: 1 };
        };

        vm.refresh = function () {
            $scope.$broadcast("app.main.ctrl.update", []);
        };

        init();

        function init() {
            vm.pageLoaded = false;
            vm.search = { event: 'All Events' };
            HolidaysDataService.getData().then(getDataSuccess);
            AmsService.getAppData(vm.appId).then(getAppDataSuccess);

            vm.scrollCount = 20;
            vm.scrollPageIndex = 1;
        }

        function getDataSuccess(data) {
            cachedData = data;

            var count2take = vm.scrollCount * vm.scrollPageIndex;

            vm.dataRows = angular.copy(_.take(data, count2take));
        }

        var loadMoreFn = _.debounce(function () {
            console.log("load more");

            //do not load more when in search
            if ($scope.search && $scope.search.text != '')
                return;

            var count2take = vm.scrollCount * (vm.scrollPageIndex + 1);

            if (count2take < cachedData.length) {
                var nextItems = _.chain(cachedData).rest(vm.scrollCount * vm.scrollPageIndex).first(vm.scrollCount).value();

                loadMoreSuccess(nextItems);
            } else {
                HolidaysDataService.gedDataCalculetedNext().then(loadMoreCalculetedNextSuccess);
            }

            vm.scrollPageIndex++;
        }, 500);

        function loadMoreCalculetedNextSuccess(data) {
            cachedData = cachedData.concat(data);

            var nextItems = _.chain(cachedData).rest(vm.scrollCount * vm.scrollPageIndex).first(vm.scrollCount).value();

            loadMoreSuccess(nextItems);
        }

        function loadMoreSuccess(data) {
            for (var i = 0; i < data.length; i++) {
                vm.dataRows.push(data[i]);
            }

            vm.loadInProgress = false;

            if (!$scope.$$phase) {
                $scope.$apply();
            }
        }

        function getAppDataSuccess(appData) {
            vm.appData = appData;
        }
    }
})();
//# sourceMappingURL=main.ctrl.js.map
