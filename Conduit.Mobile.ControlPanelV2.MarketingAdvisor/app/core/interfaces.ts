module Timeline {
    'use strict';

    export interface IEvent {
        id: number;
        monthOccurrence: number;
        monthText: string;
        date: Date;
        contentInfoMainText: string;
        contentInfoSubText: string;
        mainImage: string;
        subImage: string;
        eventTypeText: string;
        eventType: EventType;
        actionType: ActionType;
        actionTypeText: string;
        cssMarker?: string;
    }

    export enum EventType {
        none= -1,
        running= 1,
        suggested= 2,
        completed = 3,
        archived= 4
    }

    export enum ActionType {
        none= -1,
        install= 1,
        shop= 2
    }

    export interface IImageTaxonomy {
        imageName: string;
        taxonomys: string[];
    }
} 