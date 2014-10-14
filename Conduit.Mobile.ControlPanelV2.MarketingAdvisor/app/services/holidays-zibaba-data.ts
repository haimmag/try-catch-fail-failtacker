module Timeline {
    'use strict';

    class Angular {
        static init() {
            angular.module('app')
                .service('Holidays.ZibabaDataService', ZibabaDataService);
        }
    }

    export class ZibabaDataService {
        static $inject = ['$http', '$q', '$timeout', '$log', 'Config'];
        constructor(
            public $http: ng.IHttpService,
            public $q: ng.IQService,
            public $timeout: ng.ITimeoutService,
            public $log: ng.ILogService,
            public Config) {
            // ctor
        }

        public getData(){
            var deferred = this.$q.defer();
            
            this.$timeout(function () {
                deferred.resolve(DataProcessor.getStubData());
            }, 100);

            return deferred.promise;
        }
    }

    class DataProcessor {
        static getStubData() {
            var data: IEvent[] = [];
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
                eventType: EventType.suggested,
                actionType: ActionType.shop,
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
                eventType: EventType.suggested,
                actionType: ActionType.shop,
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
    }

    //angular service registration
    Angular.init();

}

