'use strict';
app.controller('appDocumentController', ['$scope', '$location', '$routeParams', '$rootScope', 'libraryService', 'authService', 'notificationService', '$route', function ($scope, $location, $routeParams, $rootScope, libraryService, authService, notificationService, $route) {
    $scope.prms = $routeParams.prms;
    $scope.firstBind = true;
    
    
    

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

    $scope.ds = null;
    $scope.bind = function () {
        if ($scope.firstBind)
            $scope.loadingVisible = true;
        libraryService.getCrewPIFs($rootScope.employeeId, 86).then(function (response) {
            console.log('PIFs');
            console.log(response);
            $scope.loadingVisible = false;
            $scope.firstBind = false;
            
            $scope.ds = response;
        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });
    };
    //////////////////////////////////////
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

    $scope.getValidRemaining = function (x) {
        if (!x.DateValidUntil)
            return "&nbsp;";

        return -1;
    }
    $scope.getValidUntil = function (x) {
        if (!x.DateValidUntil)
            return "";
        return "Valid Until: " + moment(x.DateValidUntil).format('MMM DD YYYY');;
    };


    //////////////////////////////////////
    $scope.itemClick = function (item) {
        alert('clicked');
        //$location.path('/appdocument/item/' + bookId);
    };

    if (!authService.isAuthorized()) {

        authService.redirectToLogin();
    }
    else {
        $rootScope.page_title = 'PIFs/CIFs';
        $scope.scroll_height = $(window).height() - 45 - 62;
        $('.document').fadeIn();
        $scope.bind();
    }
    //////////////////////////////////////////
    $scope.$on('PageLoaded', function (event, prms) {
        


    });
    $rootScope.$broadcast('AppDocumentLoaded', null);


}]);