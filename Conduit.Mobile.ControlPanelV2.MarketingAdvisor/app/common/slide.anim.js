(function () {
    'use strict';

    angular.module('app').animation('.slide-animation', slide);

    function slide() {
        return {
            beforeAddClass: function (element, className, done) {
                if (className === 'ng-hide') {
                    //jQuery(element).animate({
                    //    opacity: 0, height: 0
                    //}, done);
                    jQuery(element).slideToggle("fast", done);
                } else {
                    done();
                }
            },
            removeClass: function (element, className, done) {
                if (className === 'ng-hide') {
                    //element.css('opacity', 0);
                    //jQuery(element).animate({
                    //    opacity: 1, height: 130
                    //}, done);
                    jQuery(element).slideToggle("fast", done);
                } else {
                    done();
                }
            }
        };
    }
})();
//# sourceMappingURL=slide.anim.js.map
