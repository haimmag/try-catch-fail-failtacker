(function (namespace) {
    // set sticky module and directive
    var all = [];
    var spliceidx = 0;
    var hasSpliceData = false;

    function stickyFn($rootScope) {
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
                cssParent = attrs[namespace + 'CssParent'],
                cssParentElement = attrs[namespace + 'ParentElement'],
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
                
                all.push(element);
                
                $scope.$on("app.main.ctrl.update", function (event, args) {
                    allElementsUpdateAction();
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

                    if (cssClass)
                        element.addClass(cssClass);

                    if (cssRemoveClass)
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

                    //element.removeAttr('style').removeClass(cssParent);

                    if (activeElementInScope) {
                        $rootScope.stickyActiveElementSelector = selector;
                    }

                    // replace wrapper with element
                    wrapper.replaceWith(element);

                    activeTop = activeBottom = false;
                }

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
                            return;
                        }

                        // make effect like FB colide element                    
                        colideEffectFn(element);
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
                window.addEventListener('scroll', onscroll,false);
                window.addEventListener('resize', onresize, false);

                // initialize sticky
                if (initOnload) onscroll();
            }
        };
    }

    stickyFn.$inject = ['$rootScope']

    angular.module(namespace, []).directive(namespace, stickyFn);
    
    var colideEffectFn = function (element) {        
        // find in stack top and colide element
        var currIdx = all.indexOf(element);

        var topElm = all[currIdx];
        var bottomElm = all[currIdx + 1];

        if (topElm == undefined || bottomElm == undefined) return;

        if (collision(topElm, bottomElm.parents('.row').first(), 15)) {                        
            var tOffset = topElm.offset();
            //var bOffset = bottomElm.offset();

            topElm.offset({ 'top': tOffset.top - 10, 'left': tOffset.left });
            //bottomElm.offset({ 'top': bOffset.top - 1, 'left': bOffset.left });                        
        }

        //colideElementMarginTopAction(topElm);
    };

    function collision($div1, $div2, offsetTop) {
        if ($div1 == undefined || $div2 == undefined) return;

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

    var allElementsUpdateAction = _.debounce(function () {
        console.log("all action");
        var elements = $(".btn-month-marker");
        var newArr = [];

        _.each(elements, function (elem, idx) {
            var e = _.find(all, function (allItem) {
                return allItem.attr("id") == $(elem).attr("id");
            });

            newArr.push(e);
        });

        all = newArr;
    }, 1000);

    var colideElementMarginTopAction = _.debounce(function (elm) {
        if (elm.parents(".row").position().top < 140) {
            elm.css("display", "");
            elm.css("top", "");
            elm.css("left", "");
        }
    }, 1000);

    // shim layer with setTimeout fallback
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       ||
              window.webkitRequestAnimationFrame ||
              window.mozRequestAnimationFrame    ||
              window.oRequestAnimationFrame      ||
              window.msRequestAnimationFrame     ||
              function( callback ){
                window.setTimeout(callback, 1000 / 60);
              };
    })();

})('stickyc');