(function () {
    'use strict';

    angular.module('app')
        .service('AmsService', ['$rootScope', '$http', '$q', 'CommonService', function ($rootScope, $http, $q, CommonService) {
        'use strict';

        var config = CommonService.config;

        var appData = null;
        var baseURL = config.baseUrl;

        var parseData = function (data) {
            var obj = {
                productionAppId: config.productionAppId,
                id: data.id,
                name: data.name,
                pages: []
            };

            // Attach app pages
            if (data.pages && data.pages.length >= 1) {
                for (var i = 0; i < data.pages.length; i++) {
                    obj.pages.push(data.pages[i].label);
                }
            }

            return obj;
        };

        return {
            getAppData: function (appId) {
                
                var defer = $q.defer();

                if (!appData)
                {
                    $http.jsonp(baseURL + appId + '/65?appVersion=4.1.0.29&callback=JSON_CALLBACK', { withCredentials: true }).then(function (result) {
                        appData = parseData(result.data.result);
                        defer.resolve(appData);
                    });
                }
                else
                {
                    defer.resolve(appData);
                }

                return defer.promise;
            },
        };

    }]);

})();