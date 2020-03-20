'use strict';
app.controller('register0Controller', ['$scope', '$location', '$routeParams', '$rootScope', 'generalService', 'authService', 'notificationService', '$route', function ($scope, $location, $routeParams, $rootScope, generalService, authService, notificationService, $route) {
    //test
    $scope.prms = $routeParams.prms;
    $scope.firstBind = true;

    $scope.title = null;



    $scope.scroll_height = 200;
    $scope.scroll_main = {
        width: '100%',
        bounceEnabled: true,
        showScrollbar: 'never',
        pulledDownText: '',
        pullingDownText: '',
        useNative: false,
        refreshingText: 'Updating...',
        onPullDown: function (options) {
            $scope.bind();
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

    //// Controls ////////////////
    $scope.entity = {
        MobileNumber: null,
       
    };
    $scope.txt_mobileNumber = {
        placeholder: "Enter Mobile Number",
        showClearButton: true,
        mask: "(+\\98) \\9000000000",
        // maskRules: {
        //    X:9 ///[02-9]/
        //},
        maskInvalidMessage: "The phone must have a correct Iran phone format",
        useMaskedValue: true,
        bindingOptions: {
            value: 'entity.MobileNumber'
        }
    };
   
    $scope.btn_send = {
        icon: "check",
        type: "success",
        text: "Send Vertiication Cide",
        width:'100%',
        useSubmitBehavior: true,
        onClick: function (e) {
            DevExpress.ui.notify(JSON.stringify($scope.entity));
            console.log($scope.entity);
        }
    };
    $scope.mobileNumberValidationRules = {
        validationRules: [{
            type: "required",
            message: "Mobile Number is required"
        }]
    };
    
    $rootScope.page_title = 'Register';
    $scope.scroll_height = $(window).height() - 45 - 62;
    $('.register0').fadeIn();


    //////////////////////////////////////////
    $scope.$on('PageLoaded', function (event, prms) {
        //footerbook
        //  if (prms == 'footer')
        //      $('.footer' + $scope.active).addClass('active');


    });
    $rootScope.$broadcast('AppLibraryLoaded', null);


}]);
