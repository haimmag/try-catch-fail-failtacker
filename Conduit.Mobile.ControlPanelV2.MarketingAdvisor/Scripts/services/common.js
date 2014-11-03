app.factory('CommonService', ['$rootScope', '$http', '$q','$location', function ($rootScope, $http, $q, $location) {
    'use strict';    

    var urlParams = $rootScope.urlParams;
    var config = {};

    /*
    config.productionAppId = "31781d5d-b46c-44e9-82bb-05f30bd1680d";
    config.baseUrl = "http://app.mobile.conduit-services.com/api/app/";
    config.isAppFreePlan = false;
    config.appId = "54a236b7-89d7-4742-a962-7d75b6db2525";
    //replace with current running ifrmae url
    config.cpBaseUrl = "http://marketing.site-services.com/";
    */

    config.productionAppId = urlParams.productionAppId;
    config.baseUrl = decodeURIComponent(urlParams.amsServiceURL);
    config.isAppFreePlan = urlParams.isAppFreePlan;
    config.appId = urlParams.appId;
    config.cpUserSettingsUrl = "http://mobilev2.site-services.com";
    var posUrl = document.referrer.indexOf(".com/")
    config.cpBaseUrl = document.referrer.substr(0, posUrl + 4);

    return {
        config: config
    };

}]);