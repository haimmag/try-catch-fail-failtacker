(function () {
    'use strict';

    var app = angular.module('app', ['ngAnimate', 'common']);

    app.config([
        '$sceDelegateProvider', '$httpProvider', function ($sceDelegateProvider) {
            $sceDelegateProvider.resourceUrlWhitelist([
                'self',
                'http://*.site-services.com/**',
                'http://*.como.com/**'
            ]);
        }]);

    app.run(function ($rootScope) {
        var getUrlParams = function () {
            var vars = [], hash;
            var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
            for (var i = 0; i < hashes.length; i++) {
                hash = hashes[i].split('=');
                vars.push(hash[0]);
                vars[hash[0]] = hash[1];
            }
            return vars;
        };

        $rootScope.urlParams = getUrlParams();

        $rootScope.$on('$viewContentLoaded', function () {
            console.log('$viewContentLoaded');
        });
    });

    $(function () {
        $(document).foundation();
        //$("html").niceScroll({
        //    cursorborder: "0",
        //    cursorcolor: "#888",
        //    cursorwidth: "10px",
        //    autohidemode: 'leave',
        //    zindex: 9999,
        //    cursoropacitymin: 0.3,
        //    cursorminheight: 30
        //});
    });
})();
//# sourceMappingURL=app.mdl.js.map
