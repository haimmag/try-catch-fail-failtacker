(function () {
    'use strict';

    angular.module('app').controller('MainCtrl', main);

    main.$inject = ['$scope', '$rootScope', 'Holidays.DataService', '$timeout', 'ValidationService'];

    function main($scope, $rootScope, HolidaysDataService, $timeout, ValidationService) {
        /* jshint validthis: true */
        var vm = this;
        var cachedData;

        vm.filterByEventType = function (eventType, searchTitle) {
            vm.search.event = searchTitle;
            HolidaysDataService.getDataByEventType(eventType).then(getDataSuccess);
        };

        vm.elementsLayoutDone = function () {
            // $scope.$broadcast("app.main.ctrl.holidays.dataservice.repeat.done", []);
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
                vm.dataRows.splice(2, 0, newEvent);

                //position elements in place
                $timeout(function () {
                    var el = angular.element('.' + newEvent.cssMarker);
                    $("body,html").animate({ scrollTop: el.offset().top - 125 }, "slow");
                });
            }, function (err) {
                //"validation fail"
            });
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

        init();

        function init() {
            vm.pageLoaded = false;
            vm.search = { event: 'All Events' };
            HolidaysDataService.getData().then(getDataSuccess);

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
    }
})();
//# sourceMappingURL=main.ctrl.js.map
