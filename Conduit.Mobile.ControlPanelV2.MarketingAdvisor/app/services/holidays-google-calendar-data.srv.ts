(function () {
    'use strict';

    angular
        .module('app')
        .factory('Holidays.GoogleCalendarDataService', googleCalendarDataService);

    googleCalendarDataService.$inject = ['$http', '$q','$log','Config'];
    
    function googleCalendarDataService($http: ng.IHttpService, $q: ng.IQService, $log, Config) {

        var service = {
            getCalendarFeeds: getCalendarFeeds
        };
        
        return service;               

        function getCalendarFeeds() {
            var deferred = $q.defer();
            
            $http.get(Config.virtualDir + '/api/feeds/')
                .success(function (data: Server.IFeed[]) {
                deferred.resolve(data);
            })
            .error(function (msg, code) {
                deferred.reject(msg);
                $log.error(msg, code);
            });

            return deferred.promise;
        }        
        
    }
})();

