app.service('AppMobileLinksService', ['$rootScope', '$http', '$q', 'CommonService', 'AmsService', function ($rootScope, $http, $q, CommonService, AmsService) {
    'use strict';

    var config = CommonService.config;
    var appId = config.productionAppId;

    return {
        getCustomLinks: getCustomLinks
    };

    function getCustomLinks() {
        var deferred = $q.defer();

        AmsService.getAppData(appId).then(function (appData) {            
            deferred.resolve(appData);
        });        

        return deferred.promise;
    }

}]);