(function() {
    'use strict';

    angular
        .module('app')
        .directive('timelineapps.appinstall', appinstall);

    appinstall.$inject = [];
    
    function appinstall () {
        // Usage:
        //     <appinstall></appinstall>
        // Creates:
        // 
        var directive = {            
            restrict: 'EA',
            templateUrl: '/app/timeline-apps/appinstall.tpl.html'            
        };
        return directive;

    }

})();