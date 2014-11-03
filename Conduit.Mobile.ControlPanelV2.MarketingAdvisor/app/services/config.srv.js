(function () {
    'use strict';

    angular
        .module('app')
        .service('Config', configFn);

    configFn.$inject = ['CommonService'];

    function configFn(CommonService) {
        var config = CommonService.config;

        var config = CommonService.config;
        var urlPos = config.absUrl.indexOf("?");
        var url = config.absUrl;
        if (urlPos > 0)
            url = config.absUrl.substring(0, urlPos);
        var baseUrl = url.substring(0, url.lastIndexOf("/")); 

        this.imagesVirtualDir = baseUrl;
        this.virtualDir = baseUrl;
    }

})();

