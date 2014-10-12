(function () {
    'use strict';

    angular
        .module('app')
        .service('Config', config);

    config.$inject = [];

    function config() {
        this.virtualDir = "";
    }

})();

