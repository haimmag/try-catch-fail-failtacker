'use strict';

var app = angular.module('app', []);

app.config(['$sceDelegateProvider', '$httpProvider', function ($sceDelegateProvider, $httpProvider) {

    $sceDelegateProvider.resourceUrlWhitelist([
           // Allow same origin resource loads.
           'self',
           // Allow loading from our assets domain.  Notice the difference between * and **.           
           'http://*.site-services.com/**',
           'http://*.como.com/**'           
    ]);

}]);


app.run(function($rootScope) {
    var getUrlParams = function() {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for(var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    };

    $rootScope.urlParams = getUrlParams();
});