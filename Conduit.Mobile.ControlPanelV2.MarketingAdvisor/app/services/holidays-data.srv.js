(function () {
    'use strict';

    angular.module('app').factory('Holidays.DataService', stubdata);

    stubdata.$inject = ['$http', '$q', 'Config', 'Holidays.GoogleCalendarDataService', 'Holidays.DefaultDataService', 'Holidays.ImageTaxonomyService'];

    function stubdata($http, $q, Config, GoogleCalendarDataService, DefaultDataService, ImageTaxonomyService) {
        var cachedData = [];
        var defaultData = [];

        var service = {
            getData: getData,
            getDataByEventType: getDataByEventType
        };

        return service;

        function getData() {
            var deferred = $q.defer();

            // get data from google service or fallback to default static list
            getDataFromAnySource().then(function (eventsData) {
                cachedData = angular.copy(eventsData);

                prepareData(eventsData);

                deferred.resolve(eventsData);
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
            prepareData(filteredData);

            var deferred = $q.defer();
            deferred.resolve(filteredData);

            return deferred.promise;
        }

        function prepareData(data) {
            var groupData = _.groupBy(data, function (event) {
                return event.date.getMonth();
            });

            _.each(groupData, function (grpEvents) {
                _.each(grpEvents, function (grpEventItem) {
                    grpEventItem.monthOccurrence = 0;
                    grpEventItem.cssMarker = grpEventItem.monthText;
                });

                grpEvents[0].monthOccurrence = grpEvents.length;
                grpEvents[0].monthText = grpEvents[0].monthText + "(" + grpEvents.length + ") - " + moment(grpEvents[0].date).format("YYYY");
            });

            return data;
        }

        function getDataFromAnySource() {
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
//# sourceMappingURL=holidays-data.srv.js.map
