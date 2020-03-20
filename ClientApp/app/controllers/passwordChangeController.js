'use strict';
app.controller('passwordChangeController', ['$scope', '$location', '$routeParams', '$rootScope', 'generalService', 'authService', 'notificationService', '$route', function ($scope, $location, $routeParams, $rootScope, generalService, authService, notificationService, $route) {
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
        CurrentPassword: null,
        ConfirmPassword: null,
        NewPassword:null,
    };
    $scope.txt_currentPassword={
        mode: "password",
        placeholder: "Enter current password",
        showClearButton: true,
        bindingOptions: {
            value:'entity.CurrentPassword'
        }
    };
    $scope.txt_newPassword = {
        mode: "password",
        placeholder: "Enter new password",
        showClearButton: true,
        bindingOptions: {
            value: 'entity.NewPassword'
        }
    };
    $scope.txt_confirmPassword = {
        mode: "password",
        placeholder: "Confirm new password",
        showClearButton: true,
        bindingOptions: {
            value: 'entity.ConfirmPassword'
        }
    };
    $scope.btn_save = {
        icon: "check",
        type: "success",
        text: "Save",
        useSubmitBehavior: true,
        onClick: function (e) {
            DevExpress.ui.notify(JSON.stringify($scope.entity));
            console.log($scope.entity);
        }
    };
    $scope.currentpasswordValidationRules = {
        validationRules: [{
            type: "required",
            message: "current Password is required"
        }]
    };
    $scope.newpasswordValidationRules = {
        validationRules: [{
            type: "required",
            message: "new Password is required"
        }]
    };

    $scope.confirmPasswordValidationRules = {
        validationRules: [{
            type: "compare",
            comparisonTarget: function () {
                var password = $("#newPassword").dxTextBox("instance");
                //entity.NewPassword; //$("#password-validation").dxTextBox("instance");
                if (password) {
                    return password.option("value");
                }
            },
            message: "'Password' and 'Confirm Password' do not match."
        },
        {
            type: "required",
            message: "Confirm Password is required"
        }]
    };

    //$("#newpassword").dxTextBox({
    //    mode: "password",
    //    placeholder: "Enter new password",
    //    showClearButton: true,
    //    value: "f5lzKs0T",
    //});
    //$("#confirmpassword").dxTextBox({
    //    mode: "password",
    //    placeholder: "confirm password",
    //    showClearButton: true,
    //    value: "f5lzKs0T",
    //});


    //////////////////////////////

    if (!authService.isAuthorized()) {

        authService.redirectToLogin();
    }
    else {
        $rootScope.page_title = 'Reset Password';
        $scope.scroll_height = $(window).height() - 45 - 62;
        $('.passwordchange').fadeIn();
       
    }
    //////////////////////////////////////////
    $scope.$on('PageLoaded', function (event, prms) {
        //footerbook
        //  if (prms == 'footer')
        //      $('.footer' + $scope.active).addClass('active');


    });
    $rootScope.$broadcast('AppLibraryLoaded', null);


}]);
