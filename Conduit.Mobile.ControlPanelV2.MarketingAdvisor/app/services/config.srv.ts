(function () {
    'use strict';

    angular
        .module('app')
        .service('Config', configFn);

    configFn.$inject = ['CommonService'];

    function configFn(CommonService) {
        var config = CommonService.config;

        var config = CommonService.config;
        var baseUrl = config.absUrl.substring(0, config.absUrl.lastIndexOf("/")); 

        this.imagesVirtualDir = baseUrl;
        this.virtualDir = baseUrl;
    }

})();

