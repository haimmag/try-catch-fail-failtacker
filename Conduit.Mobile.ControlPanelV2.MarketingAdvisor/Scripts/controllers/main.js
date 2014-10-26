app.controller('MainCtrl', function ($scope, $rootScope, $http, AmsService, LocalStorageService, CommonService, AppMobileLinksService) {
    'use strict';

    var config = CommonService.config;

    // Get AppId from url
    $scope.appId = config.productionAppId; // Just for demo in case there is no appId in url

    $scope.features = [];

    $scope.isEditMode = false;

    $scope.isPremium = !config.isAppFreePlan;

    // Get segment ID from url
    $scope.segmentId = 1;

    $scope.preDefinedImages = {
        1: [
            'images/generic_banner0.jpg',
            'images/generic_banner.jpg'
        ],
        2: [
            'images/generic_banner2.jpg',
            'images/generic_banner3.jpg'
        ]
    };

    $scope.stores = [
        {
            name: 'App Store',
            storeId: 1,
            className: 'appstore'
        },
        {
            name: 'Google Play',
            storeId: 2,
            className: 'googleplay'
        },
        {
            name: 'Amazon',
            storeId: 3,
            className: 'amazon'
        }
    ];

    $scope.updateEditModeState = function (state, shippingDetails) {
        if (!state) {
            // Save configuration in server
            $rootScope.isSavingProgress = true;

            var configuration = {};
            configuration.appName = $scope.appData.name;
            configuration.currentActiveImage = $scope.currentActiveImage;
            configuration.qrCodeUrl = $scope.qrCodeUrl;
            configuration.productionAppId = config.productionAppId;

            $http({
                method: 'POST',
                url: config.cpBaseUrl + '/app/' + config.appId + '/SaveMarketingAdvisorConfiguration',
                data: { data: JSON.stringify(configuration), shippingDetails: JSON.stringify(shippingDetails) },
            }).success(function (data, status, headers, config) {
                if (data && data.Data) {
                    var storedInfo = angular.fromJson(data.Data.Data);
                    var bannerImages = angular.fromJson(data.Data.BannerImages);
                    var isMailHaveBeenSent = data.Data.IsMailHaveBeenSent;

                    setMarketingConfigurationData(storedInfo, bannerImages, true);
                }
                else {
                    console.log("Error while saving data");
                }
                $rootScope.isSavingProgress = false;
            }).error(function (data, status, headers, config) {
                $rootScope.isSavingProgress = false;
                console.log("error while savid marketing advisor configuration", data, status);
            });
        }

        $scope.isEditMode = state;
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };

    $rootScope.$on("saveMarketingConfigurations", function (event, args) {
        $scope.updateEditModeState(false, args[0]);
    });

    $scope.getUserSettings = function () {
        return $http.get(config.cpUserSettingsUrl + '/app/' + config.appId + '/GetMarketingAdvisorConfiguration');
    };

    $scope.attachPagesAsFeatures = function () {
        for (var i = 0; i < $scope.appData.pages.length; i++) {
            $scope.features.push({ name: $scope.appData.pages[i] });
        }
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };

    $scope.changeImage = function (where, idx) {
        var imageIndex = 0;
        var len = $scope.preDefinedImages[$scope.segmentId].length;
        if (where === 'next') {
            $scope.currentActiveImage = $scope.currentActiveImage + 1 > len - 1 ? 0 : $scope.currentActiveImage + 1;
        }
        else if (where === 'prev') {
            $scope.currentActiveImage = $scope.currentActiveImage - 1 < 0 ? len - 1 : $scope.currentActiveImage - 1;
        }
        else {
            $scope.currentActiveImage = idx;
        }
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };

    AmsService.getAppData($scope.appId).then(function (appData) {
        // Try to load stored information
        $scope.getUserSettings().then(function (data) {
            if (data && data.data && data.data.Data) {
                var storedInfo = angular.fromJson(data.data.Data.ClientData);
                var bannerImages = angular.fromJson(data.data.Data.BannerImages);
                var isMailHaveBeenSent = data.data.Data.IsMailHaveBeenSent;

                setInitialSettings(storedInfo, bannerImages, isMailHaveBeenSent, appData);
            }
            else {
                // Random image
                $scope.currentActiveImage = Math.floor((Math.random() * $scope.preDefinedImages[$scope.segmentId].length));
            }

            // Set updated app data
            $scope.appData = appData;
            $scope.attachPagesAsFeatures();

            $scope.qrCodeUrl = 'https://chart.googleapis.com/chart?chs=500x500&cht=qr&chl=http://www.dmob.me/' + $scope.appData.productionAppId;
        });
    });

    // test only
    AppMobileLinksService.getCustomLinks().then(function (data) {
        
    });

    function setMarketingConfigurationData(storedInfo, bannerImages) {
        $scope.currentActiveImage = storedInfo.currentActiveImage;
        $scope.printableDisplayImageUrl = bannerImages.PrintableDisplay;
        $scope.digitalCertificateImageUrl = bannerImages.DigitalCertificate;
        $scope.appStickerImageUrl = bannerImages.AppSticker;
    }

    function setInitialSettings(storedInfo, bannerImages, isMailHaveBeenSent, appData) {
        appData.name = storedInfo.appName;
        setMarketingConfigurationData(storedInfo, bannerImages);

        // Root scope params
        $rootScope.isNotFirstTime = true;
        $rootScope.isMailHaveBeenSent = isMailHaveBeenSent;
        $rootScope.isSavingProgress = false;
    }

    $(".download").parent().on('click', function () {
        if ($rootScope.isSavingProgress) {
            return false;
        }
    });
});