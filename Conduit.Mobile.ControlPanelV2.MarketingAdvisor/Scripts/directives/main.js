'use strict';

app.directive('overlay', function ($rootScope, LocalStorageService) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.on('click', function () {
                if (!$rootScope.isNotFirstTime) {
                    LocalStorageService.set('isNotFirstTime', true);
                    $rootScope.isNotFirstTime = true;
                    $rootScope.$apply();
                }
            });
        }
    };
});

app.directive('sendEmail', function (PopupService) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.on('click', function (e) {
                e.preventDefault();
                PopupService.openPopup(scope, {
                    templateUrl: 'templates/popups/send_email.html',
                    customClass: 'send_email_popup',
                    _width: 570,
                    closeButton: false
                });
            });
        }
    };
});

app.directive('sendMail', function (PopupService) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.on('click', function (e) {
                e.preventDefault();
                if (element.hasClass('disabled')) {
                    return;
                }
                if (!scope.isPremium) {
                    PopupService.openPopup(scope, {
                        templateUrl: 'templates/popups/not_premium.html',
                        customClass: 'not_premium_popup',
                        _width: 430,
                        closeButton: false
                    });
                    return;
                }
                PopupService.openPopup(scope, {
                    templateUrl: 'templates/popups/send_mail.html',
                    customClass: 'send_mail_popup',
                    _width: 430,
                    closeButton: false
                });
            });
        },
        controller: function ($scope) {
            $scope.onUpgradeClicked = function () {
                // Close current popup
                angular.element(".closeLB").click();
                parent.openUpgradeAppFrame();
            }
        }
    };
});

app.directive('previewCertificate', function (PopupService) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.on('click', function (e) {
                e.preventDefault();
                PopupService.openPopup(scope, {
                    templateUrl: 'templates/popups/certificate.html',
                    customClass: 'certificate_popup',
                    _width: 660,
                    closeButton: false
                });
            });
        }
    };
});

app.directive('previewSticker', function (PopupService) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.on('click', function (e) {
                e.preventDefault();
                PopupService.openPopup(scope, {
                    templateUrl: 'templates/popups/sticker.html',
                    customClass: 'sticker_popup',
                    _width: 540,
                    closeButton: false
                });
            });
        }
    };
});