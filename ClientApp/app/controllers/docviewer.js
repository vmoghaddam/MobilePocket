'use strict';
app.controller('docViewerController', ['$scope', '$sce', '$location', '$routeParams', '$rootScope', 'libraryService', 'activityService', 'authService', 'notificationService', '$route', function ($scope, $sce, $location, $routeParams, $rootScope, libraryService, activityService, authService, notificationService, $route) {
    $scope.prms = $routeParams.prms;
    $scope.url = $routeParams.url;
    $scope.title = $routeParams.title;
    $scope.id = $routeParams.id;

    $scope._url = $sce.trustAsResourceUrl($rootScope.webBase + 'pdfjs/web/viewer.html?file=../../upload/clientsfiles/' + $scope.url);
    activityService.visitFile($rootScope.employeeId, $scope.id);
    $scope.scroll_height = 200;
    $scope.scroll_main = {
        width: '100%',
        bounceEnabled: false,
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
    ///////////////////////////////////
    $scope.btn_sign = {
        text: 'Digital Sign',
        type: 'default',
        icon: 'fas fa-signature',
        //width: 200,
        width:'100%',
        onClick: function (e) {
            
            alert('x');
            ///$scope.popup_expose_visible = true;

        }

    };
    $scope.code = null;
    $scope.txt_code = {
        placeholder: "Code",
        height:35,
        bindingOptions: {
            value: 'code'
        }
    };
    /////////////////////////////////////
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


    if (!authService.isAuthorized()) {

        authService.redirectToLogin();
    }
    else {
        $rootScope.page_title = $scope.title;
        $scope.scroll_height = $(window).height() -100;

        $('.docviewer').fadeIn();
        $('#frame').height($scope.scroll_height);

        //$('#pdf').height($(window).height() - 45 - 62);
        //var options = {
        //    pdfOpenParams: {
        //         pagemode: "thumbs",
        //        navpanes: 0,
        //        toolbar: 0,
        //        statusbar: 0,
        //        view: "FitV"
        //    }
        //};
        ////http://fleet.flypersia.aero:90/airpocket/upload/clientsfiles/test2.pdf
        ////https://pdfobject.com/pdf/sample-3pp.pdf
        //var myPDF = PDFObject.embed("http://fleet.flypersia.aero:90/airpocket/upload/clientsfiles/test2.pdf", "#pdf", options);
    }

    //////////////////////////////////////////
    $rootScope.$broadcast('AppDocViewerLoaded', null);


}]);