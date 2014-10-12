(function () {
    'use strict';

    angular
        .module('app')
        .factory('Holidays.DefaultDataService', stubdata);

    stubdata.$inject = ['Config', 'Holidays.ImageTaxonomyService'];
    
    function stubdata(Config, ImageTaxonomyService) {        
        var service = {
            getData: getData            
        };
        
        return service;               

        function getData() {
            return getDefaultEvents();
        }         

        function getDefaultEvents() {            
            var data: Timeline.IEvent[] = [];
            var now = new Date();

            var baseUrl = Config.virtualDir + "/Content/timeline/holidays/default/";   

            var dateEvent = new Date(now.getFullYear(), 0, 17);
            var eventTitle = "martin luther king jr.";
            data.push({
                id: 1,
                monthOccurrence: 1,
                monthText: moment(dateEvent).format('MMMM'),
                date: dateEvent,
                contentInfoMainText: moment(dateEvent).format('dddd Do'),
                contentInfoSubText: eventTitle,
                mainImage: baseUrl + ImageTaxonomyService.getDataImageByTaxnomy(eventTitle),
                subImage: "Content/timeline/images/image_round_content1.png",
                eventTypeText: 'running',
                eventType: 1,
                actionType: 1,
                actionTypeText: 'Install'
            });

            eventTitle = "chinese new year";
            dateEvent = new Date(now.getFullYear(), 1, 3);
            data.push({
                id: 1,
                monthOccurrence: 1,
                monthText: moment(dateEvent).format('MMMM'),
                date: dateEvent,
                contentInfoMainText: moment(dateEvent).format('dddd Do'),
                contentInfoSubText: eventTitle,
                mainImage: baseUrl + ImageTaxonomyService.getDataImageByTaxnomy(eventTitle),
                subImage: "Content/timeline/images/image_round_content1.png",
                eventTypeText: 'running',
                eventType: 1,
                actionType: 1,
                actionTypeText: 'Install'
            });

            eventTitle = "super bowl XLV";
            dateEvent = new Date(now.getFullYear(), 1, 6);
            data.push({
                id: 1,
                monthOccurrence: 1,
                monthText: moment(dateEvent).format('MMMM'),
                date: dateEvent,
                contentInfoMainText: moment(dateEvent).format('dddd Do'),
                contentInfoSubText: eventTitle,
                mainImage: baseUrl + ImageTaxonomyService.getDataImageByTaxnomy(eventTitle),
                subImage: "Content/timeline/images/image_round_content1.png",
                eventTypeText: 'running',
                eventType: 1,
                actionType: 1,
                actionTypeText: 'Install'
            });

            eventTitle = "valentines";
            dateEvent = new Date(now.getFullYear(), 1, 14);
            data.push({
                id: 1,
                monthOccurrence: 1,
                monthText: moment(dateEvent).format('MMMM'),
                date: dateEvent,
                contentInfoMainText: moment(dateEvent).format('dddd Do'),
                contentInfoSubText: eventTitle,
                mainImage: baseUrl + ImageTaxonomyService.getDataImageByTaxnomy(eventTitle),
                subImage: "Content/timeline/images/image_round_content1.png",
                eventTypeText: 'running',
                eventType: 1,
                actionType: 1,
                actionTypeText: 'Install'
            });

            eventTitle = "family day";
            dateEvent = new Date(now.getFullYear(), 2, 8);
            data.push({
                id: 1,
                monthOccurrence: 1,
                monthText: moment(dateEvent).format('MMMM'),
                date: dateEvent,
                contentInfoMainText: moment(dateEvent).format('dddd Do'),
                contentInfoSubText: eventTitle,
                mainImage: baseUrl + ImageTaxonomyService.getDataImageByTaxnomy(eventTitle),
                subImage: "Content/timeline/images/image_round_content1.png",
                eventTypeText: 'running',
                eventType: 1,
                actionType: 1,
                actionTypeText: 'Install'
            });

            eventTitle = "st. patricks";
            dateEvent = new Date(now.getFullYear(), 2, 17);
            data.push({
                id: 1,
                monthOccurrence: 1,
                monthText: moment(dateEvent).format('MMMM'),
                date: dateEvent,
                contentInfoMainText: moment(dateEvent).format('dddd Do'),
                contentInfoSubText: eventTitle,
                mainImage: baseUrl + ImageTaxonomyService.getDataImageByTaxnomy(eventTitle),
                subImage: "Content/timeline/images/image_round_content1.png",
                eventTypeText: 'running',
                eventType: 1,
                actionType: 1,
                actionTypeText: 'Install'
            });

            eventTitle = "april fools";
            dateEvent = new Date(now.getFullYear(), 3, 1);
            data.push({
                id: 1,
                monthOccurrence: 1,
                monthText: moment(dateEvent).format('MMMM'),
                date: dateEvent,
                contentInfoMainText: moment(dateEvent).format('dddd Do'),
                contentInfoSubText: eventTitle,
                mainImage: baseUrl + ImageTaxonomyService.getDataImageByTaxnomy(eventTitle),
                subImage: "Content/timeline/images/image_round_content1.png",
                eventTypeText: 'running',
                eventType: 1,
                actionType: 1,
                actionTypeText: 'Install'
            });

            eventTitle = "earth day";
            dateEvent = new Date(now.getFullYear(), 3, 22);
            data.push({
                id: 1,
                monthOccurrence: 1,
                monthText: moment(dateEvent).format('MMMM'),
                date: dateEvent,
                contentInfoMainText: moment(dateEvent).format('dddd Do'),
                contentInfoSubText: eventTitle,
                mainImage: baseUrl + ImageTaxonomyService.getDataImageByTaxnomy(eventTitle),
                subImage: "Content/timeline/images/image_round_content1.png",
                eventTypeText: 'running',
                eventType: 1,
                actionType: 1,
                actionTypeText: 'Install'
            });

            eventTitle = "easter";
            dateEvent = new Date(now.getFullYear(), 3, 24);
            data.push({
                id: 1,
                monthOccurrence: 1,
                monthText: moment(dateEvent).format('MMMM'),
                date: dateEvent,
                contentInfoMainText: moment(dateEvent).format('dddd Do'),
                contentInfoSubText: eventTitle,
                mainImage: baseUrl + ImageTaxonomyService.getDataImageByTaxnomy(eventTitle),
                subImage: "Content/timeline/images/image_round_content1.png",
                eventTypeText: 'running',
                eventType: 1,
                actionType: 1,
                actionTypeText: 'Install'
            });

            eventTitle = "cinco de mayo";
            dateEvent = new Date(now.getFullYear(), 4, 5);
            data.push({
                id: 1,
                monthOccurrence: 1,
                monthText: moment(dateEvent).format('MMMM'),
                date: dateEvent,
                contentInfoMainText: moment(dateEvent).format('dddd Do'),
                contentInfoSubText: eventTitle,
                mainImage: baseUrl + ImageTaxonomyService.getDataImageByTaxnomy(eventTitle),
                subImage: "Content/timeline/images/image_round_content1.png",
                eventTypeText: 'running',
                eventType: 1,
                actionType: 1,
                actionTypeText: 'Install'
            });

            eventTitle = "mothers day";
            dateEvent = new Date(now.getFullYear(), 4, 8);
            data.push({
                id: 1,
                monthOccurrence: 1,
                monthText: moment(dateEvent).format('MMMM'),
                date: dateEvent,
                contentInfoMainText: moment(dateEvent).format('dddd Do'),
                contentInfoSubText: eventTitle,
                mainImage: baseUrl + ImageTaxonomyService.getDataImageByTaxnomy(eventTitle),
                subImage: "Content/timeline/images/image_round_content1.png",
                eventTypeText: 'running',
                eventType: 1,
                actionType: 1,
                actionTypeText: 'Install'
            });

            eventTitle = "victoria day";
            dateEvent = new Date(now.getFullYear(), 4, 23);
            data.push({
                id: 1,
                monthOccurrence: 1,
                monthText: moment(dateEvent).format('MMMM'),
                date: dateEvent,
                contentInfoMainText: moment(dateEvent).format('dddd Do'),
                contentInfoSubText: eventTitle,
                mainImage: baseUrl + ImageTaxonomyService.getDataImageByTaxnomy(eventTitle),
                subImage: "Content/timeline/images/image_round_content1.png",
                eventTypeText: 'running',
                eventType: 1,
                actionType: 1,
                actionTypeText: 'Install'
            });

            eventTitle = "memorial day";
            dateEvent = new Date(now.getFullYear(), 4, 30);
            data.push({
                id: 1,
                monthOccurrence: 1,
                monthText: moment(dateEvent).format('MMMM'),
                date: dateEvent,
                contentInfoMainText: moment(dateEvent).format('dddd Do'),
                contentInfoSubText: eventTitle,
                mainImage: baseUrl + ImageTaxonomyService.getDataImageByTaxnomy(eventTitle),
                subImage: "Content/timeline/images/image_round_content1.png",
                eventTypeText: 'running',
                eventType: 1,
                actionType: 1,
                actionTypeText: 'Install'
            });

            eventTitle = "flag day";
            dateEvent = new Date(now.getFullYear(), 5, 14);
            data.push({
                id: 1,
                monthOccurrence: 1,
                monthText: moment(dateEvent).format('MMMM'),
                date: dateEvent,
                contentInfoMainText: moment(dateEvent).format('dddd Do'),
                contentInfoSubText: eventTitle,
                mainImage: baseUrl + ImageTaxonomyService.getDataImageByTaxnomy(eventTitle),
                subImage: "Content/timeline/images/image_round_content1.png",
                eventTypeText: 'running',
                eventType: 1,
                actionType: 1,
                actionTypeText: 'Install'
            });

            eventTitle = "fathers day";
            dateEvent = new Date(now.getFullYear(), 5, 19);
            data.push({
                id: 1,
                monthOccurrence: 1,
                monthText: moment(dateEvent).format('MMMM'),
                date: dateEvent,
                contentInfoMainText: moment(dateEvent).format('dddd Do'),
                contentInfoSubText: eventTitle,
                mainImage: baseUrl + ImageTaxonomyService.getDataImageByTaxnomy(eventTitle),
                subImage: "Content/timeline/images/image_round_content1.png",
                eventTypeText: 'running',
                eventType: 1,
                actionType: 1,
                actionTypeText: 'Install'
            });

            eventTitle = "canada day";
            dateEvent = new Date(now.getFullYear(), 6, 1);
            data.push({
                id: 1,
                monthOccurrence: 1,
                monthText: moment(dateEvent).format('MMMM'),
                date: dateEvent,
                contentInfoMainText: moment(dateEvent).format('dddd Do'),
                contentInfoSubText: eventTitle,
                mainImage: baseUrl + ImageTaxonomyService.getDataImageByTaxnomy(eventTitle),
                subImage: "Content/timeline/images/image_round_content1.png",
                eventTypeText: 'running',
                eventType: 1,
                actionType: 1,
                actionTypeText: 'Install'
            });

            eventTitle = "independence day";
            dateEvent = new Date(now.getFullYear(), 6, 4);
            data.push({
                id: 1,
                monthOccurrence: 1,
                monthText: moment(dateEvent).format('MMMM'),
                date: dateEvent,
                contentInfoMainText: moment(dateEvent).format('dddd Do'),
                contentInfoSubText: eventTitle,
                mainImage: baseUrl + ImageTaxonomyService.getDataImageByTaxnomy(eventTitle),
                subImage: "Content/timeline/images/image_round_content1.png",
                eventTypeText: 'running',
                eventType: 1,
                actionType: 1,
                actionTypeText: 'Install'
            });

            eventTitle = "civic holiday";
            dateEvent = new Date(now.getFullYear(), 7, 1);
            data.push({
                id: 1,
                monthOccurrence: 1,
                monthText: moment(dateEvent).format('MMMM'),
                date: dateEvent,
                contentInfoMainText: moment(dateEvent).format('dddd Do'),
                contentInfoSubText: eventTitle,
                mainImage: baseUrl + ImageTaxonomyService.getDataImageByTaxnomy(eventTitle),
                subImage: "Content/timeline/images/image_round_content1.png",
                eventTypeText: 'running',
                eventType: 1,
                actionType: 1,
                actionTypeText: 'Install'
            });

            eventTitle = "labor day";
            dateEvent = new Date(now.getFullYear(), 8, 5);
            data.push({
                id: 1,
                monthOccurrence: 1,
                monthText: moment(dateEvent).format('MMMM'),
                date: dateEvent,
                contentInfoMainText: moment(dateEvent).format('dddd Do'),
                contentInfoSubText: eventTitle,
                mainImage: baseUrl + ImageTaxonomyService.getDataImageByTaxnomy(eventTitle),
                subImage: "Content/timeline/images/image_round_content1.png",
                eventTypeText: 'running',
                eventType: 1,
                actionType: 1,
                actionTypeText: 'Install'
            });

            eventTitle = "grandparents day";
            dateEvent = new Date(now.getFullYear(), 8, 11);
            data.push({
                id: 1,
                monthOccurrence: 1,
                monthText: moment(dateEvent).format('MMMM'),
                date: dateEvent,
                contentInfoMainText: moment(dateEvent).format('dddd Do'),
                contentInfoSubText: eventTitle,
                mainImage: baseUrl + ImageTaxonomyService.getDataImageByTaxnomy(eventTitle),
                subImage: "Content/timeline/images/image_round_content1.png",
                eventTypeText: 'running',
                eventType: 1,
                actionType: 1,
                actionTypeText: 'Install'
            });

            eventTitle = "rosh hashanah";
            dateEvent = new Date(now.getFullYear(), 8, 29);
            data.push({
                id: 1,
                monthOccurrence: 1,
                monthText: moment(dateEvent).format('MMMM'),
                date: dateEvent,
                contentInfoMainText: moment(dateEvent).format('dddd Do'),
                contentInfoSubText: eventTitle,
                mainImage: baseUrl + ImageTaxonomyService.getDataImageByTaxnomy(eventTitle),
                subImage: "Content/timeline/images/image_round_content1.png",
                eventTypeText: 'running',
                eventType: 1,
                actionType: 1,
                actionTypeText: 'Install'
            });

            eventTitle = "yom kippur";
            dateEvent = new Date(now.getFullYear(), 9, 8);
            data.push({
                id: 1,
                monthOccurrence: 1,
                monthText: moment(dateEvent).format('MMMM'),
                date: dateEvent,
                contentInfoMainText: moment(dateEvent).format('dddd Do'),
                contentInfoSubText: eventTitle,
                mainImage: baseUrl + ImageTaxonomyService.getDataImageByTaxnomy(eventTitle),
                subImage: "Content/timeline/images/image_round_content1.png",
                eventTypeText: 'running',
                eventType: 1,
                actionType: 1,
                actionTypeText: 'Install'
            });

            eventTitle = "columbus day";
            dateEvent = new Date(now.getFullYear(), 9, 10);
            data.push({
                id: 1,
                monthOccurrence: 1,
                monthText: moment(dateEvent).format('MMMM'),
                date: dateEvent,
                contentInfoMainText: moment(dateEvent).format('dddd Do'),
                contentInfoSubText: eventTitle,
                mainImage: baseUrl + ImageTaxonomyService.getDataImageByTaxnomy(eventTitle),
                subImage: "Content/timeline/images/image_round_content1.png",
                eventTypeText: 'running',
                eventType: 1,
                actionType: 1,
                actionTypeText: 'Install'
            });

            eventTitle = "pan-am games";
            dateEvent = new Date(now.getFullYear(), 9, 13);
            data.push({
                id: 1,
                monthOccurrence: 1,
                monthText: moment(dateEvent).format('MMMM'),
                date: dateEvent,
                contentInfoMainText: moment(dateEvent).format('dddd Do'),
                contentInfoSubText: eventTitle,
                mainImage: baseUrl + ImageTaxonomyService.getDataImageByTaxnomy(eventTitle),
                subImage: "Content/timeline/images/image_round_content1.png",
                eventTypeText: 'running',
                eventType: 1,
                actionType: 1,
                actionTypeText: 'Install'
            });

            eventTitle = "halloween";
            dateEvent = new Date(now.getFullYear(), 9, 31);
            data.push({
                id: 1,
                monthOccurrence: 1,
                monthText: moment(dateEvent).format('MMMM'),
                date: dateEvent,
                contentInfoMainText: moment(dateEvent).format('dddd Do'),
                contentInfoSubText: eventTitle,
                mainImage: baseUrl + ImageTaxonomyService.getDataImageByTaxnomy(eventTitle),
                subImage: "Content/timeline/images/image_round_content1.png",
                eventTypeText: 'running',
                eventType: 1,
                actionType: 1,
                actionTypeText: 'Install'
            });

            eventTitle = "remembrance day";
            dateEvent = new Date(now.getFullYear(), 10, 11);
            data.push({
                id: 1,
                monthOccurrence: 1,
                monthText: moment(dateEvent).format('MMMM'),
                date: dateEvent,
                contentInfoMainText: moment(dateEvent).format('dddd Do'),
                contentInfoSubText: eventTitle,
                mainImage: baseUrl + ImageTaxonomyService.getDataImageByTaxnomy(eventTitle),
                subImage: "Content/timeline/images/image_round_content1.png",
                eventTypeText: 'running',
                eventType: 1,
                actionType: 1,
                actionTypeText: 'Install'
            });

            eventTitle = "veterans day";
            dateEvent = new Date(now.getFullYear(), 10, 11);
            data.push({
                id: 1,
                monthOccurrence: 1,
                monthText: moment(dateEvent).format('MMMM'),
                date: dateEvent,
                contentInfoMainText: moment(dateEvent).format('dddd Do'),
                contentInfoSubText: eventTitle,
                mainImage: baseUrl + ImageTaxonomyService.getDataImageByTaxnomy(eventTitle),
                subImage: "Content/timeline/images/image_round_content1.png",
                eventTypeText: 'running',
                eventType: 1,
                actionType: 1,
                actionTypeText: 'Install'
            });

            eventTitle = "thanksgiving";
            dateEvent = new Date(now.getFullYear(), 10, 24);
            data.push({
                id: 1,
                monthOccurrence: 1,
                monthText: moment(dateEvent).format('MMMM'),
                date: dateEvent,
                contentInfoMainText: moment(dateEvent).format('dddd Do'),
                contentInfoSubText: eventTitle,
                mainImage: baseUrl + ImageTaxonomyService.getDataImageByTaxnomy(eventTitle),
                subImage: "Content/timeline/images/image_round_content1.png",
                eventTypeText: 'running',
                eventType: 1,
                actionType: 1,
                actionTypeText: 'Install'
            });

            eventTitle = "black friday";
            dateEvent = new Date(now.getFullYear(), 10, 25);
            data.push({
                id: 1,
                monthOccurrence: 1,
                monthText: moment(dateEvent).format('MMMM'),
                date: dateEvent,
                contentInfoMainText: moment(dateEvent).format('dddd Do'),
                contentInfoSubText: eventTitle,
                mainImage: baseUrl + ImageTaxonomyService.getDataImageByTaxnomy(eventTitle),
                subImage: "Content/timeline/images/image_round_content1.png",
                eventTypeText: 'running',
                eventType: 1,
                actionType: 1,
                actionTypeText: 'Install'
            });

            eventTitle = "cyber monday";
            dateEvent = new Date(now.getFullYear(), 10, 28);
            data.push({
                id: 1,
                monthOccurrence: 1,
                monthText: moment(dateEvent).format('MMMM'),
                date: dateEvent,
                contentInfoMainText: moment(dateEvent).format('dddd Do'),
                contentInfoSubText: eventTitle,
                mainImage: baseUrl + ImageTaxonomyService.getDataImageByTaxnomy(eventTitle),
                subImage: "Content/timeline/images/image_round_content1.png",
                eventTypeText: 'running',
                eventType: 1,
                actionType: 1,
                actionTypeText: 'Install'
            });
            
            eventTitle = "hanukkah";
            dateEvent = new Date(now.getFullYear(), 11, 21);
            data.push({
                id: 1,
                monthOccurrence: 1,
                monthText: moment(dateEvent).format('MMMM'),
                date: dateEvent,
                contentInfoMainText: moment(dateEvent).format('dddd Do'),
                contentInfoSubText: eventTitle,
                mainImage: baseUrl + ImageTaxonomyService.getDataImageByTaxnomy(eventTitle),
                subImage: "Content/timeline/images/image_round_content1.png",
                eventTypeText: 'running',
                eventType: 1,
                actionType: 1,
                actionTypeText: 'Install'
            });

            eventTitle = "christmas eve";
            dateEvent = new Date(now.getFullYear(), 11, 24);
            data.push({
                id: 1,
                monthOccurrence: 1,
                monthText: moment(dateEvent).format('MMMM'),
                date: dateEvent,
                contentInfoMainText: moment(dateEvent).format('dddd Do'),
                contentInfoSubText: eventTitle,
                mainImage: baseUrl + ImageTaxonomyService.getDataImageByTaxnomy(eventTitle),
                subImage: "Content/timeline/images/image_round_content1.png",
                eventTypeText: 'running',
                eventType: 1,
                actionType: 1,
                actionTypeText: 'Install'
            });

            eventTitle = "christmas day";
            dateEvent = new Date(now.getFullYear(), 11, 25);
            data.push({
                id: 1,
                monthOccurrence: 1,
                monthText: moment(dateEvent).format('MMMM'),
                date: dateEvent,
                contentInfoMainText: moment(dateEvent).format('dddd Do'),
                contentInfoSubText: eventTitle,
                mainImage: baseUrl + ImageTaxonomyService.getDataImageByTaxnomy(eventTitle),
                subImage: "Content/timeline/images/image_round_content1.png",
                eventTypeText: 'running',
                eventType: 1,
                actionType: 1,
                actionTypeText: 'Install'
            });

            eventTitle = "boxing day";
            dateEvent = new Date(now.getFullYear(), 11, 26);
            data.push({
                id: 1,
                monthOccurrence: 1,
                monthText: moment(dateEvent).format('MMMM'),
                date: dateEvent,
                contentInfoMainText: moment(dateEvent).format('dddd Do'),
                contentInfoSubText: eventTitle,
                mainImage: baseUrl + ImageTaxonomyService.getDataImageByTaxnomy(eventTitle),
                subImage: "Content/timeline/images/image_round_content1.png",
                eventTypeText: 'running',
                eventType: 1,
                actionType: 1,
                actionTypeText: 'Install'
            });

            eventTitle = "new years eve";
            dateEvent = new Date(now.getFullYear(), 11, 31);
            data.push({
                id: 1,
                monthOccurrence: 1,
                monthText: moment(dateEvent).format('MMMM'),
                date: dateEvent,
                contentInfoMainText: moment(dateEvent).format('dddd Do'),
                contentInfoSubText: eventTitle,
                mainImage: baseUrl + ImageTaxonomyService.getDataImageByTaxnomy(eventTitle),
                subImage: "Content/timeline/images/image_round_content1.png",
                eventTypeText: 'running',
                eventType: 1,
                actionType: 1,
                actionTypeText: 'Install'
            });
            
            return data;
        }

        function getStubData() {
            var data: Timeline.IEvent[] = [];
            var now = new Date();

            var dateEvent = new Date(now.getFullYear(), 0, 23);
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
                eventType: 1,
                actionType: 1,
                actionTypeText: 'Install'
            });

            dateEvent = new Date(now.getFullYear(), 1, 14);
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
                eventType: 2,
                actionType: 2,
                actionTypeText: 'Shop'
            });

            dateEvent = new Date(now.getFullYear(), 1, 14);
            data.push({
                id: 3,
                monthOccurrence: 1,
                monthText: moment(dateEvent).format('MMMM'),
                date: dateEvent,
                contentInfoMainText: moment(dateEvent).format('dddd Do'),
                contentInfoSubText: "Valentines Day2",
                mainImage: "Content/timeline/images/image_content2.png",
                subImage: "Content/timeline/images/image_round_content2.png",
                eventTypeText: 'completed',
                eventType: 3,
                actionType: 2,
                actionTypeText: 'Shop'
            });

            dateEvent = new Date(now.getFullYear(), 0, 23);
            data.push({
                id: 4,
                monthOccurrence: 1,
                monthText: moment(dateEvent).format('MMMM'),
                date: dateEvent,
                contentInfoMainText: moment(dateEvent).format('dddd Do'),
                contentInfoSubText: "New Year's Day 2015",                
                mainImage: "Content/timeline/images/image_content1.png",
                subImage: "Content/timeline/images/image_round_content1.png",
                eventTypeText: 'archived',
                eventType: 4,
                actionType: 1,
                actionTypeText: 'Install'
            });

            dateEvent = new Date(now.getFullYear(), 1, 14);
            data.push({
                id: 5,
                monthOccurrence: 1,
                monthText: moment(dateEvent).format('MMMM'),
                date: dateEvent,
                contentInfoMainText: moment(dateEvent).format('dddd Do'),
                contentInfoSubText: "Valentines Day",
                mainImage: "Content/timeline/images/image_content2.png",
                subImage: "Content/timeline/images/image_round_content2.png",
                eventTypeText: 'completed',
                eventType: 3,
                actionType: 1,
                actionTypeText: 'Install'
            });

            dateEvent = new Date(now.getFullYear(), 0, 23);
            data.push({
                id: 6,
                monthOccurrence: 1,
                monthText: moment(dateEvent).format('MMMM'),
                date: dateEvent,
                contentInfoMainText: moment(dateEvent).format('dddd Do'),
                contentInfoSubText: "New Year's Day 2015",
                mainImage: "Content/timeline/images/image_content1.png",
                subImage: "Content/timeline/images/image_round_content1.png",
                eventTypeText: 'running',
                eventType: 1,
                actionType: 2,
                actionTypeText: 'Shop'
            });

            return data;
        }
    }
})();

