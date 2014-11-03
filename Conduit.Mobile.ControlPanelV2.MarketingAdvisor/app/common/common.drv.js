(function () {
    'use strict';

    var common = angular.module('common');

    common.directive('niceScroll', ['$timeout', function ($timeout) {
        return {
            restrict: 'A',
            link: function (scope, element, attribute) {

                var nicescrolConf = {
                    styler: "fb",
                    //cursorborder: "0",
                    //cursorcolor: "#888",
                    //cursorwidth: "8px",
                    autohidemode: false,
                    zindex: 9999,
                    cursoropacitymin: 0.3,
                    cursorminheight: 30,
                    //mousescrollstep: 10,                    
                    scrollspeed: 300,
                    horizrailenabled: false
                };

                element.niceScroll(nicescrolConf);

                //$scope.$broadcast("app.main.ctrl.dataservice.repeat.done", []); 
                scope.$on("app.main.ctrl.dataservice.repeat.done", function (event, args) {
                    $timeout(function () {
                        console.log("repeate done");
                        //$("body").getNiceScroll().resize();                        
                        $("body").getNiceScroll().remove();
                        $("body").niceScroll(nicescrolConf);
                        //var scrollTop = $("html").scrollTop() + 1;
                        //var scrollTop1 = $("body").scrollTop() + 1;
                        //scrollTop = Math.max(scrollTop, scrollTop1);
                        //$("body,html").animate({ scrollTop: scrollTop }, "slow");
                    }, 500);

                });

            }
        };
    }]);

    common.directive(
        "cnLogDomCreation",
        function () {

            // I bind the UI to the $scope.
            function link($scope, element, attributes) {

                console.log(
                    attributes.cnLogDomCreation,
                    $scope.$index
                    );

            }

            // Return the directive configuration.
            return ({
                link: link
            });

        });

    common.directive('onlyAlphanumeric', function () {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function (scope, element, attr, ctrl) {
                function inputValue(val) {
                    if (val) {
                        var alphanumeric = val.replace(/[^a-zA-Z0-9א-ת\.\-\_\s\(\)]/g, '');

                        if (alphanumeric !== val) {
                            ctrl.$setViewValue(alphanumeric);
                            ctrl.$render();
                        }
                        return alphanumeric;
                    }
                    return undefined;
                }
                ctrl.$parsers.push(inputValue);
            }
        };
    });

    common.directive('repeatDone', function () {
        return function (scope, element, attrs) {
            if (scope.$last) { // all are rendered
                scope.$eval(attrs.repeatDone);
            }
        };
    });

    common.directive('whenScrolled', function () {
        return function (scope, element, attrs) {
            if (scope.$last) { // all are rendered
                scope.$eval(attrs.repeatDone);
            }
        };
    });

    common.directive('scrollOnClick', function () {
        return {
            restrict: 'A',
            link: function (scope, elm, attrs) {                
                elm.on('click', function () {
                    var elmId = attrs.scrollOnClickPrefix;
                    if (attrs.scrollOnClick != "") elmId = elmId + scope.$eval(attrs.scrollOnClick);
                    var el = angular.element(elmId);
                    $("body,html").animate({ scrollTop: el.offset().top - 125 }, "slow");
                });
            }
        };
    });

    common.directive('stickyClickScrollElement', ['$rootScope', function ($rootScope) {
        return {
            restrict: 'A',
            link: function (scope, elm, attrs) {
                elm.on('click', function () {
                    var el = angular.element($rootScope.stickyActiveElementSelector);
                    if (el.length > 0) {
                        $("body,html").animate({ scrollTop: el.offset().top - 125 }, "slow");
                    }
                });
            }
        };
    }]);

    common.directive('elSize', ['$window', '$parse', '$timeout', function ($window, $parse, $timeout) {
        return {
            restrict: 'A',
            link: function (scope, elm, attrs) {
                var fn = $parse(attrs.elSize);
                var win = angular.element($window);

                win.on("resize", function (e) {
                    var size = { height: elm.height() };
                    fn.assign(scope, size);
                    scope.$apply();
                });

                win.one("scroll", function (e) {
                    var size = { height: elm.height() };
                    fn.assign(scope, size);
                    scope.$apply();
                });

                //scope.$on("app.main.ctrl.dataservice.repeat.done", function (event, args) {
                //    var size = { height: elm.height() };
                //    fn.assign(scope, size);                    
                //});

                //var unbindWatcher;

                //var watcherFn = function () {
                //    return { height: elm.height() };
                //};

                //var applyFn = function (size) {
                //    fn.assign(scope, size);
                //    unbindWatcher();
                //};

                //unbindWatcher = scope.$watch(watcherFn, applyFn, true);
            }
        };
    }]);

    common.directive('hideOnScroll', ['$window', '$parse', '$timeout', function ($window, $parse, $timeout) {
        return {
            restrict: 'A',
            link: function (scope, elm, attrs) {
                var win = angular.element($window);
                var fn = $parse(attrs.hideOnScroll);

                win.on("scroll", _.debounce(function () {
                    fn.assign(scope, false);
                    scope.$apply();
                }, 2500)
                    );
            }
        };
    }]);

    common.directive('sticker', ['$window', '$parse', '$timeout', function ($window, $parse, $timeout) {
        return {
            restrict: 'A',
            link: function (scope, elm, attrs) {
                var win = angular.element($window);

                var action = function () {
                    if (win.scrollTop() > 50) {
                        if (!elm.data('faded')) elm.data('faded', 1).stop(true).fadeIn();
                    } else if (elm.data('faded')) {
                        elm.data('faded', 0).stop(true).fadeOut();
                    }
                };

                win.on("scroll", _.throttle(action, 500));
            }
        };
    }]);

    common.directive('checkOffset', ['$window', function ($window) {
        return {
            restrict: 'A',
            link: function (scope, elm, attrs) {
                angular.element($window).on("scroll", function () {
                    console.log(attrs.checkOffset + " - " + elm.offset().top);
                });
            }
        };
    }]);

    common.directive('hoverImageMarker', ['$window', function ($window) {
        return {
            restrict: 'A',
            link: function (scope, elm, attrs) {
                var $img = elm.find(attrs.hoverImageMarker).first();

                //var width = $img.width();
                //var height = $img.height();
                //var zoom = 1.1;
                //var move = -15;

                elm.hover(
                    function (e) {
                        $img.switchClass("regular", "scale", 1000, "easeInOutQuad");
                    },
                    function (e) {
                        $img.switchClass("scale", "regular", 1000, "easeInOutQuad");
                    });                
            }
        };
    }]);

    common.directive('hoverChangeState', ['$window', '$parse', function ($window, $parse) {
        return {
            restrict: 'A',
            link: function (scope, elm, attrs) {                
                var fn = $parse(attrs.hoverChangeState);

                elm.hover(
                    function (e) {
                        fn.assign(scope, true);
                        scope.$digest();
                    },
                    function (e) {
                        fn.assign(scope, false);
                        scope.$digest();
                    });
            }
        };
    }]);

    common.directive('scroll2fixed', ['$window', '$timeout', '$rootScope', function ($window, $timeout, $rootScope) {
        return {
            restrict: 'A',
            link: function (scope, elm, attrs) {

                var lastDate = new Date().getTime();
                var _top = $(window).scrollTop();
                var _direction;

                var lastPos = null
                var timer = 0;
                var delta = 0;
                
                $(window).scroll(function () {
                    var _cur_top = $(window).scrollTop();
                    if (_top < _cur_top) {
                        _direction = 'down';
                    }
                    else {
                        _direction = 'up';
                    }
                    _top = _cur_top;

                    if (_direction == 'down') {
                        var newPos = _cur_top;
                        if (lastPos != null) {
                            delta = newPos - lastPos;
                        }
                        lastPos = newPos;
                        timer && clearTimeout(timer);
                        timer = setTimeout(function () { lastPos = null; }, 40);
                    }

                    revealOnScroll();
                });                
                

                scope.$on("app.main.ctrl.update", function (event, args) {
                    $timeout(function () {
                        console.log("repeate done sticky scroll");

                        $('.btn-month-marker').trigger('detach.ScrollToFixed');

                        var summaries = $('.btn-month-marker');
                        summaries.each(function (i) {
                            var summary = $(summaries[i]);
                            var next = summaries[i + 1];

                            summary.scrollToFixed({
                                marginTop: $('.fixed.shadow').outerHeight(true) + 10,
                                limit: function () {
                                    var limit = 0;
                                    if (next) {
                                        //limit = $(next).parents(".row").first().offset().top - $(this).outerHeight(true) - 16;
                                        limit = $(next).offset().top - $(this).outerHeight(true) - 16;
                                    } else {
                                        limit = $('#footer').offset().top - $(this).outerHeight(true) - 10;
                                    }
                                    return limit;
                                },
                                removeOffsets: true,
                                preAbsolute: function () { 
                                    //if(delta < 8)                                                                                                            
                                    //    $(next).prev().animate({ 'margin-top': "50px" }, 200);

                                    //custom popup marker
                                    setStickyActiveElementSelector(this);
                                },
                                fixed: function () {
                                    if (_direction == 'up') {
                                        //var elmTop = $(next).prev().css("margin-top");

                                        //if (elmTop == "50px")
                                        //    $(next).prev().animate({ 'margin-top': "0px" }, 100);

                                        //custom popup marker
                                        setStickyActiveElementSelector(this);
                                    }
                                }
                            });
                        });

                        function setStickyActiveElementSelector(elm) {
                            $rootScope.stickyActiveElementSelector = '#' + $(elm).parents(".main-row").attr('id');
                        }


                    }, 500);                    

                    //startup animations
                    $timeout(function () {
                        loadAnimationOnDemand();
                    }, 500);   

                });


                var $win = $(window);
                var animConsts = { duration: 400, timeout: 300 };

                function loadAnimationOnDemand() {
                    var $content = $('.mid_fixed_pane');

                    var rows = $content.find('.main-row');

                    rows.each(function (i) {
                        var $this = $(this);                        

                        if (i > 3) return;

                        var btnMonthMarker = $this.find('.btn-month-marker');
                        var divSeperator = $this.find('.CP_div_seperator');
                        var imageContent = $this.find('.CP_image_contnet');

                        setTimeout(function () {                            
                            btnMonthMarker.addClass('animated ' + btnMonthMarker.data('animation'));
                            divSeperator.addClass('animated ' + divSeperator.data('animation'));
                            imageContent.addClass('animated ' + imageContent.data('animation'));
                        }, animConsts.duration * i);

                    });                 
                }

                function loadSingleAnimationOnDemand(parent) {                    

                    var btnMonthMarker = parent.find('.btn-month-marker');
                    var divSeperator = parent.find('.CP_div_seperator');
                    var imageContent = parent.find('.CP_image_contnet');

                    var timeoutDelayMultiplier = 4;
                    if (delta > 6) {
                        timeoutDelayMultiplier = 1;
                    }

                    setTimeout(function () {                        
                        btnMonthMarker.addClass('animated ' + btnMonthMarker.data('animation'));
                        divSeperator.addClass('animated ' + divSeperator.data('animation'));
                        imageContent.addClass('animated ' + imageContent.data('animation'));
                    }, animConsts.duration * timeoutDelayMultiplier);

                }

                function revealOnScroll() {
                    var scrolled = $win.scrollTop(),
                        win_height_padded = $win.height() * 0.9;

                    // Showed...
                    $(".revealOnScroll:not(.animated)").each(function (i) {

                        // performance - no need to loop all element to bottom
                        if (delta < 6 && i > 2) return;

                        var $this = $(this),
                            offsetTop = $this.offset().top;

                        if (scrolled + win_height_padded > offsetTop) {
                            if ($this.hasClass('CP_image_contnet')) {
                                var parent = $this.parents(".main-row").first();
                                loadSingleAnimationOnDemand(parent);
                            }
                        }
                    });
                    // Hidden...
                    //$(".revealOnScroll.animated").each(function (index) {
                    //    var $this = $(this),
                    //        offsetTop = $this.offset().top;
                    //    if (scrolled + win_height_padded < offsetTop) {
                    //        $(this).removeClass('animated fadeInUp flipInX lightSpeedIn')
                    //    }
                    //});
                }

            }//link
        };
    }]);

    //common.directive('wayPointWarrper', ['$window', function ($window) {
    //    return {
    //        restrict: 'A',
    //        link: function (scope, elm: JQuery, attrs) {
    //            elm.waypoint(function (direction) {
    //                if (direction === 'down')
    //                {
    //                    var elmTop = elm.offset().top;
    //                    var docTop = $(document).scrollTop();

    //                    console.log("elmTop:" + elmTop + " ,doctop" + docTop);

    //                    if ((elmTop - docTop) <= 170) {
    //                        elm.find("a").removeClass("info");
    //                    }
    //                }
    //                else
    //                    elm.find("a").addClass("info");

    //                console.log("dir:" + direction);
    //            }, { offset: 170 });

    //            //elm.waypoint('sticky', {
    //            //    offset: 130,
    //            //    wrapper: ''
    //            //});

    //        }
    //    };
    //}]);

})();
