(function () {
    'use strict';

    angular
        .module('app')
        .controller('timelineapps.AppInstallIfrmCtrl', AppInstallCtrl);

    AppInstallCtrl.$inject = ['$scope', 'Holidays.DataService'];

    function AppInstallCtrl($scope, HolidaysDataService) {
        /* jshint validthis: true */
        var vm = this;        

        vm.filterByEventType = function (eventType, searchTitle) {
            vm.search.event = searchTitle;
            vm.dataRows = HolidaysDataService.getDataByEventType(eventType);
        };

        vm.elementsLayoutDone = function () {        
                //alert('load more');
        };

        vm.loadMore = function () {
            //alert('load more');
        };

        init();

        function init() {
            vm.search = { event: 'All Events' };
            vm.dataRows = HolidaysDataService.getData();            
        }
    }
})();
