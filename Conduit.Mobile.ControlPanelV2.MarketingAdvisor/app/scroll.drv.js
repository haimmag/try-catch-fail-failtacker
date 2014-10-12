(function () {
    'use strict';

    angular.module('app').directive('scroll', scrollfn);

    scrollfn.$inject = ['$window', '$timeout'];

    function scrollfn($window, $timeout) {
        // usage:
        //     <scroll></scroll>
        // creates:
        //
        var directive = {
            link: link,
            restrict: 'EA'
        };

        return directive;

        function link(scope, element, attrs) {
            var raw = element[0];

            angular.element($window).on("scroll", function () {
                //$('.mid_fixed_pane .CP_month_marker').do(function () {
                //    this.find("a").addClass("info");
                //    $(".mid_fixed_pane .image-left-border").removeClass("active");
                //});
                //$('.mid_fixed_pane .CP_month_marker:in-viewport(180)').do(function () {
                //    this.find("a").removeClass("info");
                //    var cssMarker = this.find("input:hidden").first().val();
                //    // every class cssMarker that is found add active class
                //    $(".mid_fixed_pane .image-left-border." + cssMarker).addClass("active");
                //});
                //$('.mid_fixed_pane .CP_month_marker').do(function () {
                //    if (this.offset().top < 171) {
                //        this.find("a").removeClass("info");
                //    }
                //});
                $(".mid_fixed_pane .image-left-border").removeClass("active");

                $('.mid_fixed_pane .CP_month_marker').each(function (index, elm) {
                    var elmTop = $(elm).offset().top;
                    var docTop = $(document).scrollTop();

                    if ((elmTop - docTop) <= 180) {
                        $(elm).find("a").removeClass("info");
                        var cssMarker = $(this).find("input:hidden").first().val();

                        // every class cssMarker that is found add active class
                        $(".mid_fixed_pane .image-left-border." + cssMarker).addClass("active");
                    } else {
                        $(elm).find("a").addClass("info");
                    }
                    //console.log(index + ": " + elmTop + ", " + docTop);
                    //console.log(index + ": " + (elmTop - docTop));
                });

                if (raw.scrollTop + raw.offsetHeight + 200 >= raw.scrollHeight) {
                    scope.$apply(attrs.whenScrolled);
                }
                //scope.$apply();
            });
        }
    }
})();
//# sourceMappingURL=scroll.drv.js.map
