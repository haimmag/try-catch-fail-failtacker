(function (namespace) {
    // set sticky module and directive
    var all = [];
    var spliceidx = 0;
    var hasSpliceData = false;

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
                wrapper = angular.element(nativeWrapper),

                // cache style
                style = element.attr('style'),

                // initialize states
                activeBottom = false,
                activeTop = false,
                offset = {};                

                if (!hasSpliceData) {
                    all.push(element);
                }
                else {
                    all.splice(spliceidx, 0, element);
                    hasSpliceData = false;
                }
                

                $scope.$on("app.main.ctrl.holidays.spliceidx", function (event, args) {                    
                    spliceidx = args[0];
                    hasSpliceData = true;
                });

                // activate sticky
                function activate() {
                    // conditionally skip unmatched media
                    if (!media.matches) {
                        activeTop = activeBottom = false;

                        return;
                    }

                    // get element computed style
                    var
                    computedStyle = getComputedStyle(nativeElement),
                    position = activeTop ? 'top:' + top : 'bottom:' + bottom;

                    // replace element with wrapper containing element
                    wrapper.append(element.replaceWith(wrapper));

                    // style wrapper
                    wrapper.attr('style', 'display:' + computedStyle.display + ';height:' + nativeElement.offsetHeight + 'px;margin:' + computedStyle.margin + ';width:' + nativeElement.offsetWidth + 'px');

                    // style element
                    element.attr('style', 'left:' + offset.left + 'px;margin:0;position:fixed;transition:none;' + position + 'px;width:' + computedStyle.width);
                    element.addClass(cssClass);
                    element.removeClass(cssRemoveClass);

                    if (activeElementInScope) {
                        $rootScope.stickyActiveElementSelector = selector;
                    }

                    $(selector).addClass(selectorCss);
                }

                // deactivate sticky
                function deactivate() {
                    // unstyle element
                    if (style === undefined) {
                        element.removeAttr('style');
                    } else {
                        element.attr('style', style);
                    }

                    // unstyle wrapper
                    wrapper.removeAttr('style');
                    element.removeClass(cssClass);
                    element.addClass(cssRemoveClass);
                    $(selector).removeClass(selectorCss);

                    if (activeElementInScope) {
                        $rootScope.stickyActiveElementSelector = selector;
                    }

                    // replace wrapper with element
                    wrapper.replaceWith(element);

                    activeTop = activeBottom = false;
                }                

                var colideEffectFn = function () {
                    // find in stack top and colide element
                    var currIdx = all.indexOf(element);
                    var topElm = all[currIdx];
                    var bottomElm = all[currIdx + 1];

                    if (collision(topElm, bottomElm, 15)) {
                        //console.log("colition")
                        foundColide = true;

                        var tOffset = topElm.offset();
                        //var bOffset = bottomElm.offset();

                        topElm.offset({ 'top': tOffset.top - 10, 'left': tOffset.left });
                        //bottomElm.offset({ 'top': bOffset.top - 1, 'left': bOffset.left });
                    }                    
                };                

                var windowYpos = -1;

                // window scroll listener                
                function onscroll() {                    
                    if (windowYpos == window.pageYOffset) return false;
                    windowYpos = window.pageYOffset;                    

                    // if activated
                    if (activeTop || activeBottom) {
                        // get wrapper offset
                        offset = nativeWrapper.getBoundingClientRect();

                        activeBottom = !isNaN(bottom) && offset.top > window.innerHeight - bottom - nativeWrapper.offsetHeight;
                        activeTop = !isNaN(top) && offset.top <= top;

                        // deactivate if wrapper is inside range
                        if (!activeTop && !activeBottom) {
                            deactivate();
                        }

                        // make effect like FB colide element                    
                        colideEffectFn();
                    }
                        // if not activated
                    else {
                        // get element offset
                        offset = nativeElement.getBoundingClientRect();

                        activeBottom = !isNaN(bottom) && offset.top > window.innerHeight - bottom - nativeElement.offsetHeight;
                        activeTop = !isNaN(top) && offset.top <= top;

                        // activate if element is outside range
                        if (activeTop || activeBottom) {
                            activate();
                        }
                    }
                }

                function collision($div1, $div2, offsetTop) {
                    var x1 = $div1.offset().left;
                    var y1 = $div1.offset().top;
                    var h1 = $div1.outerHeight(true);
                    var w1 = $div1.outerWidth(true);
                    var b1 = y1 + h1;
                    var r1 = x1 + w1;
                    var x2 = $div2.offset().left;
                    var y2 = $div2.offset().top - offsetTop;
                    var h2 = $div2.outerHeight(true);
                    var w2 = $div2.outerWidth(true);
                    var b2 = y2 + h2;
                    var r2 = x2 + w2;

                    if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
                    return true;
                }

                // window resize listener
                function onresize() {
                    // conditionally deactivate sticky
                    if (activeTop || activeBottom) {
                        deactivate();
                    }

                    // re-initialize sticky
                    onscroll();
                }

                // bind listeners
                window.addEventListener('scroll', onscroll);
                window.addEventListener('resize', onresize);

                // initialize sticky
                if(initOnload) onscroll();
            }
        };
    }

    stickyFn.$inject = ['$rootScope']

    angular.module(namespace, []).directive(namespace, stickyFn);
})('sticky');