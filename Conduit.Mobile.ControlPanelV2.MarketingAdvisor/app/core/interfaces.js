var Timeline;
(function (Timeline) {
    'use strict';

    (function (EventType) {
        EventType[EventType["none"] = -1] = "none";
        EventType[EventType["running"] = 1] = "running";
        EventType[EventType["suggested"] = 2] = "suggested";
        EventType[EventType["completed"] = 3] = "completed";
        EventType[EventType["archived"] = 4] = "archived";
    })(Timeline.EventType || (Timeline.EventType = {}));
    var EventType = Timeline.EventType;

    (function (ActionType) {
        ActionType[ActionType["none"] = -1] = "none";
        ActionType[ActionType["install"] = 1] = "install";
        ActionType[ActionType["shop"] = 2] = "shop";
    })(Timeline.ActionType || (Timeline.ActionType = {}));
    var ActionType = Timeline.ActionType;
})(Timeline || (Timeline = {}));
//# sourceMappingURL=interfaces.js.map
