var Timeline;
(function (Timeline) {
    'use strict';

    var Angular = (function () {
        function Angular() {
        }
        Angular.init = function () {
            angular.module('app').service('Holidays.ZibabaDataService', ZibabaDataService);
        };
        return Angular;
    })();

    var ZibabaDataService = (function () {
        function ZibabaDataService($http, $q, $timeout, $log, Config) {
            this.$http = $http;
            this.$q = $q;
            this.$timeout = $timeout;
            this.$log = $log;
            this.Config = Config;
            // ctor
        }
        ZibabaDataService.prototype.getData = function () {
            var deferred = this.$q.defer();

            this.$timeout(function () {
                deferred.resolve(DataProcessor.getStubData());
            }, 100);

            return deferred.promise;
        };
        ZibabaDataService.$inject = ['$http', '$q', '$timeout', '$log', 'Config'];
        return ZibabaDataService;
    })();
    Timeline.ZibabaDataService = ZibabaDataService;

    var DataProcessor = (function () {
        function DataProcessor() {
        }
        DataProcessor.getStubData = function () {
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
        };
        return DataProcessor;
    })();

    //angular service registration
    Angular.init();
})(Timeline || (Timeline = {}));
//# sourceMappingURL=holidays-zibaba-data.js.map
