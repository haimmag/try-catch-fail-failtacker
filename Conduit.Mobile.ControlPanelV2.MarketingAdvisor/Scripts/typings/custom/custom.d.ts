// Type definitions for custom controls
// Project: conduit
// Definitions by: haim magen
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/// <reference path="../jquery/jquery.d.ts"/>

interface JQuery {    
    do(callback: () => void): JQuery;
    waypoint(callback: (direction?) => void, opt: { offset: any }): JQuery;
    waypoint(name, opt: { offset: any }): JQuery;
}
