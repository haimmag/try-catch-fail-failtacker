(function () {
    'use strict';

    angular.module('app').factory('Holidays.ZibabaDataService', zibabaDataService);

    zibabaDataService.$inject = ['$http', '$q', '$timeout', '$log', 'Config'];

    function zibabaDataService($http, $q, $timeout, $log, Config) {
        var service = {
            getData: getData
        };

        return service;

        function getData() {
            var deferred = $q.defer();

            $timeout(function () {
                deferred.resolve(getStubData());
            }, 100);

            return deferred.promise;
        }
    }

    function getStubData() {
        var data = [];
        var now = new Date();

        var dateEvent = new Date(now.getFullYear(), 11, 23);
        data.push({
            id: 1,
            monthOccurrence: 1,
            monthText: moment(dateEvent).format('MMMM'),
            date: dateEvent,
            contentInfoMainText: moment(dateEvent).format('dddd Do'),
            contentInfoSubText: "New Year's Day 2015",
            mainImage: "Content/timeline/images/image_content1.png",
            subImage: "Content/timeline/images/image_round_content1.png",
            eventTypeText: 'running',
            eventType: 2 /* suggested */,
            actionType: 2 /* shop */,
            actionTypeText: 'shop',
            eventTypeData: {
                eventId: 1,
                clicks: 10,
                views: 20,
                installs: 10,
                activeAds: 5
            }
        });

        dateEvent = new Date(now.getFullYear(), 11, 14);
        data.push({
            id: 2,
            monthOccurrence: 1,
            monthText: moment(dateEvent).format('MMMM'),
            date: dateEvent,
            contentInfoMainText: moment(dateEvent).format('dddd Do'),
            contentInfoSubText: "Valentines Day",
            mainImage: "Content/timeline/images/image_content2.png",
            subImage: "Content/timeline/images/image_round_content2.png",
            eventTypeText: 'suggested',
            eventType: 2 /* suggested */,
            actionType: 2 /* shop */,
            actionTypeText: 'shop',
            eventTypeData: {
                eventId: 1,
                clicks: 11,
                views: 21,
                installs: 1,
                activeAds: 15
            }
        });

        return data;
    }
})();
//# sourceMappingURL=holidays-zibaba-data.srv.js.map
