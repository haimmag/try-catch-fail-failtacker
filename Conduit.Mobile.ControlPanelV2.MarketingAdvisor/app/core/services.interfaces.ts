module Timeline.Holidays {
    'use strict';

    export interface IHolidaysDataService {
        getData: () => ng.IPromise<Timeline.IEvent>;
        getDataByEventType: (eventType) => ng.IPromise<Timeline.IEvent>;
    }

    export interface IGoogleCalendarDataService {
        getCalendarFeeds: () => ng.IPromise<{}>;       
    }

    export interface IHolidaysDefaultDataService {
        getData: () => Timeline.IEvent[];
    }

    export interface IHolidaysImageTaxonomyDataService {
        getDataImageByTaxnomy: (pharse:string) => string;
    }
}