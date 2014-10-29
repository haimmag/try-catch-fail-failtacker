(function () {
    'use strict';

    angular
        .module('app')
        .factory('Holidays.DataService', stubdata);

    stubdata.$inject = ['$http', '$q', 'Config', 'Holidays.GoogleCalendarDataService', 'Holidays.DefaultDataService', 'Holidays.ImageTaxonomyService', 'Holidays.ZibabaDataService'];
    
    function stubdata($http,
        $q: ng.IQService, Config, GoogleCalendarDataService, DefaultDataService, ImageTaxonomyService, ZibabaDataService) {

        var cachedData: Timeline.IEvent[] = [];
        var defaultData: Timeline.IEvent[] = [];
        var yearsCounter = 0;

        var service = {
            getData: getData,
            getDataByEventType: getDataByEventType,
            gedDataCalculetedNext: gedDataCalculetedNext,
            getItemsThreshold: getItemsThreshold,
            createCustomEvent: createCustomEvent
        };
        
        return service;               

        function getData() {
            var deferred = $q.defer();            

            // get data from google service or fallback to default static list
            $q.all([getDataFromGoogleOrDefault(), ZibabaDataService.getData()])            
            .then(function (results) {
                var eventsGoogle: Timeline.IEvent[] = results[0];
                var eventsZibaba: Timeline.IEvent[] = results[1];

                var eventsGoogle = prepareDataAddYears(eventsGoogle);                

                _.each(eventsZibaba, function (item) {
                    eventsGoogle.push(item);                    
                });

                //cache final data
                cachedData = angular.copy(eventsGoogle);

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
                data[i].id = getGuid();
                var currItemDate = data[i].date;
                currItemDate.setFullYear(currItemDate.getFullYear() + yearsCounter);
            }

            data = prepareData(data);

            var deferred = $q.defer();
            deferred.resolve(data);

            return deferred.promise;
        }

        function prepareData(data: Timeline.IEvent[]) {
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
                grpEvents[0].monthText = grpEvents[0].monthText +
                "(" + grpEvents.length + ") - " + moment(grpEvents[0].date).format("YYYY");                
            });

            return data;
        }

        function prepareDataAddYears(events: Timeline.IEvent[]) {            
            var resultEvents = angular.copy(events);

            var itemsThreshold = getItemsThreshold();
            //100 exemption about the elements that should be
            if (events.length < itemsThreshold) {
                var itemsCounter = (itemsThreshold - events.length) / events.length;
                yearsCounter = 0;                

                for (var i = 0; i < itemsCounter; i++) {
                    yearsCounter++;
                    var newEvents = angular.copy(events);

                    //loop new events and add them to main events
                    for (var j = 0; j < newEvents.length; j++) {
                        newEvents[j].id = getGuid();
                        var currItemDate = newEvents[j].date;
                        currItemDate.setFullYear(currItemDate.getFullYear() + yearsCounter);

                        resultEvents.push(newEvents[j]);
                    }
                }
            }      

            return resultEvents;      
        }

        function getItemsThreshold() {
            return 150;
        }

        function createCustomEvent(item) {
            var baseUrl = Config.imagesVirtualDir + "/Content/timeline/holidays/default/";  
            var date = item.date;

            var newEvent: Timeline.IEvent = {
                id: getGuid(),
                monthOccurrence: 1,
                monthText: moment(date).format('MMMM'),
                date: date,
                contentInfoMainText: moment(date).format('dddd Do'),
                contentInfoSubText: item.name,
                actionType: Timeline.ActionType.install,
                actionTypeText: 'install',
                eventType: Timeline.EventType.running,
                eventTypeText: "running",
                mainImage: baseUrl + 'custom_event.jpg',
                subImage: ""
            };

            // add new data to cache
            cachedData.push(newEvent);

            var prepData = prepareData([newEvent]);

            return prepData[0];
        }

        function getDataFromGoogleOrDefault() {            
            var eventsData: Timeline.IEvent[] = [];

            return GoogleCalendarDataService.getCalendarFeeds().then(getDataSuccess, getDataError);

            function getDataSuccess(data: Server.IFeed[]) {
                
                var baseUrl = Config.imagesVirtualDir + "/Content/timeline/holidays/default/";   

                _.each(data, function (item) {
                    var date = new Date(item.eventDate);

                    eventsData.push({
                        id: getGuid(),
                        monthOccurrence: 1,
                        monthText: moment(date).format('MMMM'),
                        date: date,
                        contentInfoMainText: moment(date).format('dddd Do'),
                        contentInfoSubText: item.title,
                        actionType: Timeline.ActionType.install,
                        actionTypeText: 'install',
                        eventType: Timeline.EventType.running,
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

        function getGuid() {
            return Math.floor(Math.random() * 10000000);
        }

    }
})();

