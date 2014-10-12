(function () {
    'use strict';

    angular.module('app').controller('MainCtrl', main);

    main.$inject = ['$scope', '$rootScope', 'Holidays.DataService'];

    function main($scope, $rootScope, HolidaysDataService, $timeout) {
        /* jshint validthis: true */
        var vm = this;
        var cachedData;

        vm.filterByEventType = function (eventType, searchTitle) {
            vm.search.event = searchTitle;
            HolidaysDataService.getDataByEventType(eventType).then(getDataSuccess);
        };

        vm.elementsLayoutDone = function () {
            //$scope.$broadcast("app.main.ctrl.holidays.dataservice.repeat.done", []);
            if (vm.pageLoaded == false) {
                vm.pageLoaded = true;
            }
        };

        vm.loadMore = function () {
            //alert('load more');
            console.log("load more");
            var items = angular.copy(cachedData);
            vm.dataRows = vm.dataRows.concat(items);
        };

        init();

        function init() {
            vm.pageLoaded = false;
            vm.search = { event: 'All Events' };
            HolidaysDataService.getData().then(getDataSuccess);
        }

        function getDataSuccess(data) {
            cachedData = data;
            vm.dataRows = data;
        }
    }
})();
//# sourceMappingURL=main.ctrl.js.map
