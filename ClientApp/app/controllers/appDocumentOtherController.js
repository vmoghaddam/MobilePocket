﻿'use strict';
app.controller('appDocumentOtherController', ['$scope', '$location', '$routeParams', '$rootScope', 'libraryService', 'authService', 'notificationService', '$route', function ($scope, $location, $routeParams, $rootScope, libraryService, authService, notificationService, $route) {
    $scope.prms = $routeParams.prms;
    $scope.firstBind = true;

    $scope.typeId = null;
    $scope.title = "Others";
    //////////////////////////////
    $scope.scroll_height = '100%';
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

            options.component.release();

        },
        height: '100%',
        //bindingOptions: { height: 'scroll_height', }
    };
    ///////////////////////////
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
   
    /////////////////////////////////
    $scope.ds = null;
    $scope.bind = function () {
        if ($scope.firstBind)
            $scope.loadingVisible = true;
        libraryService.getPersonLibrary($rootScope.employeeId, 86).then(function (response) {
            $scope.loadingVisible = false;
            $scope.firstBind = false;
            //$.each(response, function (_i, _d) {
              
                
            //});
            $scope.ds = response;
        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });
    };

    $scope.formatDate = function (dt) {
        return moment(dt.DateExposure).format('MMM DD YYYY');
    };

    $scope.getVisitedClass = function (x) {
        return "far fa-eye " + (x.IsVisited ? "file-visited" : "");
    };

    $scope.getSignedClass = function (x) {
        return "fas fas fa-signature " + (x.IsSigned ? "file-visited" : "");
    };

    $scope.getTitleClass = function (x) {
        return (x.IsVisited && x.IsSigned) ? "" : "w3-text-red";
    };

    $scope.getCardClass = function (x) {
        return "card w3-text-dark-gray bg-white";
    };

    $scope.getDeadLineRemaining = function (x) {
        if (!x.DeadLine)
            return "&nbsp;";

        return -1;
    }
    $scope.getDeadLine = function (x) {
        return "";
    };

    ////////////////////////////////
    $scope.getDay = function (dt) {
        return (new Date(dt)).getDate();
    };
    $scope.getTileMonth = function (dt) {
        var mns = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        var _dt = new Date(dt);
        var m = _dt.getMonth();
        var mstr = mns[m];
        var year = _dt.getFullYear();
        var yearstr = year.toString().substring(2, 4);
        var str = mstr + ' ' + yearstr;
        return str;
    };


    //////////////////////////////////////
    /////////////////////////////////
    $scope.ItemClick = function (bookId, employeeId) {
        alert('x');
        //alert(bookId+' '+employeeId);
        //$location.path('/appdocument/item/' + bookId);
    };

    /////////////////////////////////////

    $scope.$on('PageLoaded', function (event, prms) {
        //footerbook
        if (prms == 'footer')
            $('.footer' + $scope.active).addClass('active');


    });
    var vhHeight = $("body").height();
    var chromeNavbarHeight = vhHeight - window.innerHeight;
    window.addEventListener("orientationchange", function (event) {
 

    }, false);

    window.onresize = function (event) {
        return;
        setTimeout(function () {

            
        }, 200);
    };

    //////////////////////////////

    if (!authService.isAuthorized()) {

        authService.redirectToLogin();
    }
    else {
        $rootScope.page_title = 'Memos > ' + $scope.title;

        $('.documentother').fadeIn();
         $scope.bind();

    }

    $rootScope.$broadcast('ActiveFooterItem', 'footerflightstatistics');


}]);