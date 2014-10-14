var Timeline;
(function (Timeline) {
    'use strict';

    var cachedData = [];
    var yearsCounter = 0;
    var getItemsThreshold = 100;

    var Angular = (function () {
        function Angular() {
        }
        Angular.init = function () {
            angular.module('app').service('Holidays.DataService', HolidaysDataService);
        };
        return Angular;
    })();

    var HolidaysDataService = (function () {
        function HolidaysDataService($http, $q, Config, GoogleCalendarDataService, DefaultDataService, ImageTaxonomyService, ZibabaDataService) {
            this.$http = $http;
            this.$q = $q;
            this.Config = Config;
            this.GoogleCalendarDataService = GoogleCalendarDataService;
            this.DefaultDataService = DefaultDataService;
            this.ImageTaxonomyService = ImageTaxonomyService;
            this.ZibabaDataService = ZibabaDataService;
        }
        HolidaysDataService.prototype.getData = function () {
            var deferred = this.$q.defer();

            var pr1 = DataProcessor.getDataFromGoogleOrDefault(this.GoogleCalendarDataService, this.DefaultDataService, this.Config, this.ImageTaxonomyService);
            var pr2 = this.ZibabaDataService.getData();

            // get data from google service or fallback to default static list
            this.$q.all([pr1, pr2]).then(function (results) {
                var eventsGoogle = results[0];
                var eventsZibaba = results[1];

                var eventsGoogle = DataProcessor.prepareDataAddYears(eventsGoogle);
                cachedData = angular.copy(eventsGoogle);

                _.each(eventsZibaba, function (item) {
                    eventsGoogle.push(item);
                });

                eventsGoogle = DataProcessor.prepareData(eventsGoogle);

                deferred.resolve(eventsGoogle);
            });

            return deferred.promise;
        };

        HolidaysDataService.prototype.getDataByEventType = function (eventType) {
            var data = angular.copy(cachedData);
            var filteredData = [];

            // -1 no filter
            if (eventType === -1 /* none */) {
                filteredData = data;
            } else {
                filteredData = _.filter(data, function (event) {
                    return event.eventType === eventType;
                });
            }

            filteredData = DataProcessor.prepareData(filteredData);

            var deferred = this.$q.defer();
            deferred.resolve(filteredData);

            return deferred.promise;
        };

        HolidaysDataService.prototype.createCustomEvent = function (item) {
            var baseUrl = this.Config.virtualDir + "/Content/timeline/holidays/default/";
            var date = new Date();

            var newEvent = {
                id: 1,
                monthOccurrence: 1,
                monthText: moment(date).format('MMMM'),
                date: date,
                contentInfoMainText: moment(date).format('dddd Do'),
                contentInfoSubText: item.name,
                actionType: 1 /* install */,
                actionTypeText: 'install',
                eventType: 1 /* running */,
                eventTypeText: "running",
                mainImage: baseUrl + 'custom_event.jpg',
                subImage: ""
            };

            var prepData = DataProcessor.prepareData([newEvent]);

            return prepData[0];
        };

        HolidaysDataService.prototype.gedDataCalculetedNext = function () {
            var data = angular.copy(cachedData);
            yearsCounter++;

            for (var i = 0; i < data.length; i++) {
                var currItemDate = data[i].date;
                currItemDate.setFullYear(currItemDate.getFullYear() + yearsCounter);
            }

            data = DataProcessor.prepareData(data);

            var deferred = this.$q.defer();
            deferred.resolve(data);

            return deferred.promise;
        };
        HolidaysDataService.$inject = ['$http', '$q', 'Config', 'Holidays.GoogleCalendarDataService', 'Holidays.DefaultDataService', 'Holidays.ImageTaxonomyService', 'Holidays.ZibabaDataService'];
        return HolidaysDataService;
    })();

    var DataProcessor = (function () {
        function DataProcessor() {
        }
        DataProcessor.prepareDataAddYears = function (events) {
            var resultEvents = angular.copy(events);

            var itemsThreshold = getItemsThreshold;

            //100 exemption about the elements that should be
            if (events.length < itemsThreshold) {
                var itemsCounter = (itemsThreshold - events.length) / events.length;
                yearsCounter = 0;

                for (var i = 0; i < itemsCounter; i++) {
                    yearsCounter++;
                    var newEvents = angular.copy(events);

                    for (var j = 0; j < newEvents.length; j++) {
                        var currItemDate = newEvents[j].date;
                        currItemDate.setFullYear(currItemDate.getFullYear() + yearsCounter);

                        resultEvents.push(newEvents[j]);
                    }
                }
            }

            return resultEvents;
        };

        DataProcessor.getDataFromGoogleOrDefault = function (GoogleCalendarDataService, DefaultDataService, Config, ImageTaxonomyService) {
            var eventsData = [];

            return GoogleCalendarDataService.getCalendarFeeds().then(getDataSuccess, getDataError);

            function getDataSuccess(data) {
                var baseUrl = Config.virtualDir + "/Content/timeline/holidays/default/";

                _.each(data, function (item) {
                    var date = new Date(item.eventDate);

                    eventsData.push({
                        id: 1,
                        monthOccurrence: 1,
                        monthText: moment(date).format('MMMM'),
                        date: date,
                        contentInfoMainText: moment(date).format('dddd Do'),
                        contentInfoSubText: item.title,
                        actionType: 1 /* install */,
                        actionTypeText: 'install',
                        eventType: 1 /* running */,
                        eventTypeText: "running",
                        mainImage: baseUrl + ImageTaxonomyService.getDataImageByTaxnomy(item.title),
                        subImage: "Content/timeline/images/image_round_content1.png"
                    });
                });

                // test only
                //eventsData = DefaultDataService.getData();
                return eventsData;
            }

            function getDataError(err) {
                eventsData = DefaultDataService.getData();
                return eventsData;
            }
        };

        DataProcessor.prepareData = function (data) {
            // sort elements by date after adding them
            data = _.sortBy(data, function (event) {
                return event.date;
            });

            var groupData = _.groupBy(data, function (event) {
                return event.date.getFullYear() + '-' + event.date.getMonth();
            });

            _.each(groupData, function (grpEvents) {
                _.each(grpEvents, function (grpEventItem) {
                    grpEventItem.monthOccurrence = 0;
                    grpEventItem.cssMarker = grpEventItem.monthText + '-' + grpEventItem.date.getFullYear() + '-' + grpEventItem.date.getMonth();
                });

                grpEvents[0].monthOccurrence = grpEvents.length;
                grpEvents[0].monthText = grpEvents[0].monthText + "(" + grpEvents.length + ") - " + moment(grpEvents[0].date).format("YYYY");
            });

            return data;
        };
        return DataProcessor;
    })();

    //angular service registration
    Angular.init();
})(Timeline || (Timeline = {}));

(function () {
    'use strict';

    angular.module('app').factory('Holidays.DataService', stubdata);

    stubdata.$inject = ['$http', '$q', 'Config', 'Holidays.GoogleCalendarDataService', 'Holidays.DefaultDataService', 'Holidays.ImageTaxonomyService', 'Holidays.ZibabaDataService'];

    function stubdata($http, $q, Config, GoogleCalendarDataService, DefaultDataService, ImageTaxonomyService, ZibabaDataService) {
        var cachedData = [];
        var defaultData = [];
        var yearsCounter = 0;

        var service = {
            getData: getData,
            getDataByEventType: getDataByEventType,
            gedDataCalculetedNextYear: gedDataCalculetedNext,
            getItemsThreshold: getItemsThreshold,
            createCustomEvent: createCustomEvent
        };

        return service;

        function getData() {
            var deferred = $q.defer();

            // get data from google service or fallback to default static list
            $q.all([getDataFromGoogleOrDefault(), ZibabaDataService.getData()]).then(function (results) {
                var eventsGoogle = results[0];
                var eventsZibaba = results[1];

                var eventsGoogle = prepareDataAddYears(eventsGoogle);
                cachedData = angular.copy(eventsGoogle);

                _.each(eventsZibaba, function (item) {
                    eventsGoogle.push(item);
                });

                eventsGoogle = prepareData(eventsGoogle);

                deferred.resolve(eventsGoogle);
            });

            return deferred.promise;
        }

        function getDataByEventType(eventType) {
            var data = angular.copy(cachedData);
            var filteredData = [];

            // -1 no filter
            if (eventType === -1) {
                filteredData = data;
            } else {
                filteredData = _.filter(data, function (event) {
                    return event.eventType === eventType;
                });
            }

            filteredData = prepareData(filteredData);

            var deferred = $q.defer();
            deferred.resolve(filteredData);

            return deferred.promise;
        }

        function gedDataCalculetedNext() {
            var data = angular.copy(cachedData);
            yearsCounter++;

            for (var i = 0; i < data.length; i++) {
                var currItemDate = data[i].date;
                currItemDate.setFullYear(currItemDate.getFullYear() + yearsCounter);
            }

            data = prepareData(data);

            var deferred = $q.defer();
            deferred.resolve(data);

            return deferred.promise;
        }

        function prepareData(data) {
            // sort elements by date after adding them
            data = _.sortBy(data, function (event) {
                return event.date;
            });

            var groupData = _.groupBy(data, function (event) {
                return event.date.getFullYear() + '-' + event.date.getMonth();
            });

            _.each(groupData, function (grpEvents) {
                _.each(grpEvents, function (grpEventItem) {
                    grpEventItem.monthOccurrence = 0;
                    grpEventItem.cssMarker = grpEventItem.monthText + '-' + grpEventItem.date.getFullYear() + '-' + grpEventItem.date.getMonth();
                });

                grpEvents[0].monthOccurrence = grpEvents.length;
                grpEvents[0].monthText = grpEvents[0].monthText + "(" + grpEvents.length + ") - " + moment(grpEvents[0].date).format("YYYY");
            });

            return data;
        }

        function prepareDataAddYears(events) {
            var resultEvents = angular.copy(events);

            var itemsThreshold = getItemsThreshold();

            //100 exemption about the elements that should be
            if (events.length < itemsThreshold) {
                var itemsCounter = (itemsThreshold - events.length) / events.length;
                yearsCounter = 0;

                for (var i = 0; i < itemsCounter; i++) {
                    yearsCounter++;
                    var newEvents = angular.copy(events);

                    for (var j = 0; j < newEvents.length; j++) {
                        var currItemDate = newEvents[j].date;
                        currItemDate.setFullYear(currItemDate.getFullYear() + yearsCounter);

                        resultEvents.push(newEvents[j]);
                    }
                }
            }

            return resultEvents;
        }

        function getItemsThreshold() {
            return 100;
        }

        function createCustomEvent(item) {
            var baseUrl = Config.virtualDir + "/Content/timeline/holidays/default/";
            var date = new Date();

            var newEvent = {
                id: 1,
                monthOccurrence: 1,
                monthText: moment(date).format('MMMM'),
                date: date,
                contentInfoMainText: moment(date).format('dddd Do'),
                contentInfoSubText: item.name,
                actionType: 1 /* install */,
                actionTypeText: 'install',
                eventType: 1 /* running */,
                eventTypeText: "running",
                mainImage: baseUrl + 'custom_event.jpg',
                subImage: ""
            };

            var prepData = prepareData([newEvent]);

            return prepData[0];
        }

        function getDataFromGoogleOrDefault() {
            var eventsData = [];

            return GoogleCalendarDataService.getCalendarFeeds().then(getDataSuccess, getDataError);

            function getDataSuccess(data) {
                var baseUrl = Config.virtualDir + "/Content/timeline/holidays/default/";

                _.each(data, function (item) {
                    var date = new Date(item.eventDate);

                    eventsData.push({
                        id: 1,
                        monthOccurrence: 1,
                        monthText: moment(date).format('MMMM'),
                        date: date,
                        contentInfoMainText: moment(date).format('dddd Do'),
                        contentInfoSubText: item.title,
                        actionType: 1 /* install */,
                        actionTypeText: 'install',
                        eventType: 1 /* running */,
                        eventTypeText: "running",
                        mainImage: baseUrl + ImageTaxonomyService.getDataImageByTaxnomy(item.title),
                        subImage: "Content/timeline/images/image_round_content1.png"
                    });
                });

                // test only
                //eventsData = DefaultDataService.getData();
                return eventsData;
            }

            function getDataError(err) {
                eventsData = DefaultDataService.getData();
                return eventsData;
            }
        }
    }
})();
//# sourceMappingURL=holidays-data.js.map
