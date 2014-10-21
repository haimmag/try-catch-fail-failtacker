(function (namespace) {
    // set sticky module and directive
    var all = [];


    function stickyFn ($rootScope) {
        return {
            link: function ($scope, element, attrs) {
                var
                // get options
                bottom = parseFloat(attrs[namespace + 'Bottom']),
                media = window.matchMedia(attrs[namespace + 'Media'] || 'all'),
                top = parseFloat(attrs[namespace + 'Top']),
                cssClass = attrs[namespace + 'Css'],
                cssRemoveClass = attrs[namespace + 'RemoveCss'],
                selector = attrs[namespace + 'Selector'],
                selectorCss = attrs[namespace + 'SelectorCss'],
                initOnload = $.parseJSON(attrs[namespace + 'Onload'] || true),
                activeElementInScope = $.parseJSON(attrs[namespace + 'ActiveElement'] || false),

                // get elements
                nativeElement = element[0],
                nativeWrapper = document.createElement('span'),
                wrapper = angular.element(nativeWrapper);

                element.sticky('.group-container');
            }
        };
    }

    stickyFn.$inject = ['$rootScope']

    angular.module(namespace, []).directive(namespace, stickyFn);
})('sticky');