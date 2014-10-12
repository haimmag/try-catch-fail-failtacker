(function () {
    'use strict';

    angular.module('app').controller('timelineapps.AppInstallCtrl', AppInstallCtrl);

    AppInstallCtrl.$inject = ['$scope', 'StubDataService'];

    function AppInstallCtrl($scope, StubDataService) {
        /* jshint validthis: true */
        var vm = this;

        vm.filterByEventType = function (eventType, searchTitle) {
            vm.search.event = searchTitle;
            vm.dataRows = StubDataService.getDataByEventType(eventType);
        };

        vm.elementsLayoutDone = function () {
        };

        vm.loadMore = function () {
            //alert('load more');
        };

        init();

        function init() {
            vm.search = { event: 'All Events' };
            vm.dataRows = StubDataService.getData();
        }
    }
})();
//# sourceMappingURL=appinstall.ctrl.js.map
