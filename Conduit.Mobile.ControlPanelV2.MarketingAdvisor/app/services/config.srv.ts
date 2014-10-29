(function () {
    'use strict';

    angular
        .module('app')
        .service('Config', configFn);

    configFn.$inject = ['CommonService'];

    function configFn(CommonService) {
        var config = CommonService.config;

        var config = CommonService.config;
        var url = config.absUrl.substring(0, config.absUrl.indexOf("?")); 
        var baseUrl = url.substring(0, url.lastIndexOf("/")); 

        this.imagesVirtualDir = baseUrl;
        this.virtualDir = baseUrl;
    }

})();

