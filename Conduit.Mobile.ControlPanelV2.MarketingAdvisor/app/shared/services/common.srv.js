(function () {
    'use strict';

    angular.module('app')
    .factory('CommonService', ['$rootScope', '$http', '$q', '$location', function ($rootScope, $http, $q, $location) {
        'use strict';

        var urlParams = $rootScope.urlParams;
        var config = {};

        
        //config.productionAppId = "364e1292-ff02-49d1-a772-4a57259ab9b8";
        //config.baseUrl = "http://app.mobile.site-services.com/api/app/";
        //config.isAppFreePlan = false;
        //config.appId = "1bb8a5bf-c759-431c-bcee-2f4bb436a001";
        ////replace with current running ifrmae url
        //config.cpBaseUrl = "http://marketing.site-services.com/";        

        config.productionAppId = urlParams.productionAppId;
        config.baseUrl = decodeURIComponent(urlParams.amsServiceURL);
        config.isAppFreePlan = urlParams.isAppFreePlan;
        config.appId = urlParams.appId;        
        config.cpBaseUrl = $location.protocol() + "://" + $location.host();
        config.cpUserSettingsUrl = "http://mobilev2.site-services.com";
        config.absUrl = $location.absUrl();

        return {
            config: config
        };

    }]);

})();