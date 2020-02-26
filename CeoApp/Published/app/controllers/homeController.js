'use strict';
app.controller('homeController', ['$scope', 'authService', 'activityService', 'generalService', '$rootScope', function ($scope, authService, activityService, generalService, $rootScope) {

    $rootScope.page_title = $rootScope.app_title;
    ////////////////////////////////////
    //////////////////////////////////////
    

    //$scope.$watch("speedValue", function (speedValue) {
    //    $scope.gaugeValue = speedValue / 2;
    //});

    

    
    ////////////////////////////////////////////
    $scope.scroll_height = 200;
    $scope.scroll_main = {
        width: '100%',
        bounceEnabled: true,
        showScrollbar: 'never',
        pulledDownText: '',
        pullingDownText: '',
        // useNative:false,
        refreshingText: 'Updating...',
        onPullDown: function (options) {
            console.log('puull');
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


    //$scope.recent = [];


   


   

    Date.prototype.addDays = function (days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    };
    $scope.getDay = function (dt) {
        return (new Date(dt)).getDate();
    };
    $scope.getFlightTileMonth = function (dt) {
        var mns = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        var _dt = new Date(dt);
        var m = _dt.getMonth();
        var mstr = mns[m];
        var year = _dt.getFullYear();
        var yearstr = year.toString().substring(2, 4);
        var str = mstr + ' ' + yearstr;
        return str;
    };
   
    function formatTime2(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();

        //hours = hours % 12;
        //hours = hours ? hours : 12; // the hour '0' should be '12'
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes;
        return strTime;
    }
    $scope.getTimeFormated = function (dt) {
        if (!dt)
            return "-";
        var _dt = new Date(dt);
        return formatTime2(_dt);
    };
    $scope.getDuration = function (x) {
        if (!x)
            return "-";
        return pad(Math.floor(x / 60)).toString() + ':' + pad(x % 60).toString() + ' hrs';
    };
    $scope.formatMinutes = function (mm) {
        mm = Math.round(mm);
        return pad(Math.floor(mm / 60)).toString() + ':' + pad(mm % 60).toString();
    };
   
   
    $scope.bindEmployee2 = function (data) {
        var employee = data.Employee;
       

    };

    $scope.bind = function () {
        $scope.loadingVisible = true;

        generalService.getEmployee($rootScope.employeeId).then(function (employee) {
            $scope.loadingVisible = false;
            $scope.bindEmployee2(employee);

            
            //////////////////////

        }, function (err) { $scope.loadingVisible = false; });


    };
    if (!authService.isAuthorized()) {

        authService.redirectToLogin();
    }
    else {

        $scope.scroll_height = $(window).height() - 45 - 50;
        $scope.bind();

    }



    //////////////////////////////////

}]);