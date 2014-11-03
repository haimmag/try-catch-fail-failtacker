(function () {
    'use strict';

    var app = angular.module('app');

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
                var links = prepareLinks(appData);
                deferred.resolve(links);
            });

            return deferred.promise;
        }

        function prepareLinks(appData) {
            var baseUrl = appData.result.details.appHomeUrl;            
            var links = [];           

            var pages = appData.result.pages;

            links.push("#");

            for (var i = 0; i < pages.length; i++) {
                links.push("#" + pages[i].alias);
            }

            return {
                links: links,
                baseUrl: baseUrl
            };
        }

    }]);

})();