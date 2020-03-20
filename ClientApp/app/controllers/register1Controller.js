﻿'use strict';
app.controller('register1Controller', ['$scope', '$location', '$routeParams', '$rootScope', 'generalService', 'authService', 'notificationService', '$route', function ($scope, $location, $routeParams, $rootScope, generalService, authService, notificationService, $route) {
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
        FirstName: null,
        LastName: null,
        Email:null,
        Password:null,
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
    $scope.txt_firstName = {
        placeholder: "Enter First Name",
        showClearButton: true,
        bindingOptions: {
            value: 'entity.FirstName'
        }
    };
    $scope.txt_lastName = {
        placeholder: "Enter Last Name",
        showClearButton: true,
        bindingOptions: {
            value: 'entity.LastName'
        }
    };
    $scope.txt_email = {
        hoverStateEnabled: false,
        placeholder: "Enter Email Address",
        showClearButton: true,
        bindingOptions: {
            value: 'entity.Email'

        }
    };
    $scope.txt_password = {
        mode: "password",
        placeholder: "Enter password",
        showClearButton: true,
        bindingOptions: {
            value: 'entity.Password'
        }
    };
    $scope.txt_confirmPassword = {
        mode: "password",
        placeholder: "Confirm Password",
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
    $scope.mobileNumberValidationRules = {
        validationRules: [{
            type: "required",
            message: "Mobile Number is required"
        }]
    };
    $scope.firstNameValidationRules = {
        validationRules: [{
            type: "required",
            message: "First Name is required"
        }]
    };
    $scope.lastNameValidationRules = {
        validationRules: [{
            type: "required",
            message: "Last Name is required"
        }]
    };
    $scope.emailValidationRules = {
        validationRules: [{
            type: "required",
            message: "Email is required"
        }, {
            type: "email",
            message: "Email is invalid"
        }, {
            type: "async",
            message: "Email is already registered",
            validationCallback: function (params) {
                return sendRequest(params.value);
            }
        }]
    };
    $scope.passwordValidationRules = {
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

           $rootScope.page_title = 'Register';
        $scope.scroll_height = $(window).height() - 45 - 62;
        $('.register1').fadeIn();

   
    //////////////////////////////////////////
    $scope.$on('PageLoaded', function (event, prms) {
        //footerbook
        //  if (prms == 'footer')
        //      $('.footer' + $scope.active).addClass('active');


    });
    $rootScope.$broadcast('AppLibraryLoaded', null);


}]);