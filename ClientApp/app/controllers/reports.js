'use strict';
app.controller('reportsController', ['$scope', '$location', '$routeParams', '$rootScope', 'generalService', 'authService', 'notificationService', '$route', '$timeout', 'flightService', function ($scope, $location, $routeParams, $rootScope, generalService, authService, notificationService, $route, $timeout, flightService) {
    //////////////////////////////////////////////
    
    ////////////////////////////////////////////////
    $scope.scroll_height = 200;
    $scope.scroll_reports = {
        width: '100%',
        bounceEnabled: true,
        showScrollbar: 'never',
        pulledDownText: '',
        pullingDownText: '',
        useNative: false,
        refreshingText: 'Updating...',
        onPullDown: function (options) {
            //$scope.bind();
            //Alert.getStartupNots(null, function (arg) {
            //    options.component.release();
            //    // refreshCarts(arg);
            //});
            options.component.release();

        },
        bindingOptions: { height: 'scroll_height', }
    };




    $scope.loadingVisible = false;
    $scope.loadPanel = {
        message: 'Please wait...',

        showIndicator: true,
        showPane: true,
        shading: true,
        closeOnOutsideClick: false,
        shadingColor: "rgba(0,0,0,0.4)",
        // position: { of: "body" },
        onShown: function () {

        },
        onHidden: function () {

        },
        bindingOptions: {
            visible: 'loadingVisible'
        }
    };

    $scope.resize = function () {

        $scope.scroll_height = $(window).height() - 45 - 45;
    };

    $(window).resize(function () {
        $scope.$apply(function () {
            $scope.resize();

        });

    });
    


    if (!authService.isAuthorized()) {

        authService.redirectToLogin();
    }
    else {
        $rootScope.page_title = 'Reports';
        $scope.resize();
        $('.reports').fadeIn();
      

        //$scope.bind();
    }
    /////////////////////////////////////////
   


    ///////////////////////////////////
}]);
