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
    

    ////////////////////////////////////
    $scope.popup_filter_visible = false;
    $scope.popup_filter = {
        title: 'Filter',
        width: 350,
        height: 500,
        //fullScreen: true,
        showTitle: true,
        dragEnabled: false,
        toolbarItems: [
            {
                widget: 'dxButton', location: 'after', options: {
                    type: 'success', text: 'OK', icon: 'check', useSubmitBehavior: true, validationGroup: 'fdpsfilter',
                    onClick: function (e) {
                        $location.path('/reports/viewer');
                        var result = e.validationGroup.validate();

                        if (!result.isValid) {
                            //   General.ShowNotify('Please fill in all required fields.', 'error');
                            return;
                        }
                        $rootScope.bindFrom = new Date($scope.filterFrom);
                        $rootScope.bindTo = new Date($scope.filterTo);
                        $scope.bind();
                        $scope.popup_filter_visible = false;



                    }
                }, toolbar: 'bottom'
            },
            {
                widget: 'dxButton', location: 'after', options: {
                    type: 'danger', text: 'Close', icon: 'remove', onClick: function (e) {
                        $scope.popup_filter_visible = false;
                    }
                }, toolbar: 'bottom'
            }
        ],

        visible: false,

        closeOnOutsideClick: false,
        onShowing: function (e) {
           // $scope.filterFrom = new Date($rootScope.bindFrom);
           // $scope.filterTo = new Date($rootScope.bindTo);

        },
        onShown: function (e) {

        },
        onHiding: function () {



        },
        bindingOptions: {
            visible: 'popup_filter_visible',



        }
    };
    /////////////////////////////////////
    $scope.showFilter = function () {
        $scope.popup_filter_visible = true;
    };

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
