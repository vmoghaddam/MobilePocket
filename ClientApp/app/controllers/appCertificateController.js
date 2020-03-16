'use strict';
app.controller('appCertificateController', ['$scope', '$location', '$routeParams', '$rootScope', 'generalService', 'authService', 'notificationService', '$route', function ($scope, $location, $routeParams, $rootScope, generalService, authService, notificationService, $route) {
   //test
    $scope.prms = $routeParams.prms;
    $scope.firstBind = true;
    $scope.active = $route.current.type;
    
    $scope.title = null;
    //switch ($scope.active) {
        

    //    case 'all':
             
    //        $scope.title = 'All';
    //        break;
    //    case 'last':
             
    //        $scope.title = 'Last';
    //        break;
         
    //    default:
    //        break;
    //}
     

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

    $scope.ds = null;
     
    $scope.bind = function () {
        //if ($scope.firstBind)
        //    $scope.loadingVisible = true;
        //if ($scope.active == 'all') {
        //    generalService.getAllCertificates($rootScope.userId).then(function (response) {
        //        $scope.loadingVisible = false;
        //        $scope.firstBind = false;
        //        $scope.processData(response);
        //    }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });
        //}
        //else {
        //    generalService.getLastCertificates($rootScope.userId).then(function (response) {
        //        $scope.loadingVisible = false;
        //        $scope.firstBind = false;
        //        $scope.processData(response);
        //    }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });
        //}
        $scope.ds = [];
        $scope.ds.push({
            Title: 'Medical',
            //IssueDate: new Date(2019, 8, 1, 0, 0, 0),
            //ExpireDate: new Date(2020, 8, 1, 0, 0, 0),
            IssueDate: moment(new Date(2019, 8, 1, 0, 0, 0)).format('MMM DD YYYY').toUpperCase(),
            ExpireDate: moment(new Date(2020, 8, 1, 0, 0, 0)).format('MMM DD YYYY').toUpperCase(),
            Remaining:98,
            
        }, {
            Title: 'CCRM',
            //IssueDate: new Date(2019, 5, 11, 0, 0, 0),
            //ExpireDate: new Date(2020, 5, 11, 0, 0, 0),
                IssueDate: moment(new Date(2019, 5, 11, 0, 0, 0)).format('MMM DD YYYY').toUpperCase(),
                ExpireDate: moment(new Date(2020, 5, 11, 0, 0, 0)).format('MMM DD YYYY').toUpperCase(),
            Remaining: 12,

        }, {
            Title: 'CRM',
            //IssueDate: new Date(2019, 3, 5, 0, 0, 0),
            //ExpireDate: new Date(2020, 3, 11, 0, 0, 0),
                IssueDate: moment(new Date(2019, 3, 5, 0, 0, 0)).format('MMM DD YYYY').toUpperCase(),
                ExpireDate: moment(new Date(2020, 3, 11, 0, 0, 0)).format('MMM DD YYYY').toUpperCase(),
            Remaining: 143,

        }, {
            Title: 'SEPT',
            //IssueDate: new Date(2018, 3, 5, 0, 0, 0),
            //ExpireDate: new Date(2021, 3, 11, 0, 0, 0),
                IssueDate: moment(new Date(2018, 3, 5, 0, 0, 0)).format('MMM DD YYYY').toUpperCase(),
                ExpireDate: moment(new Date(2021, 3, 11, 0, 0, 0)).format('MMM DD YYYY').toUpperCase(),
            Remaining: 343,

        });
         
    
    };



    $scope.itemClick = function (bookId, employeeId) {
        //alert(bookId+' '+employeeId);
       // $location.path('/applibrary/item/' + bookId);
    };

    if (!authService.isAuthorized()) {

        authService.redirectToLogin();
    }
    else {
        $rootScope.page_title = 'Certificates';
        $scope.scroll_height = $(window).height() - 45 - 62;
        $('.certificate').fadeIn();
       $scope.bind();
    }
    //////////////////////////////////////////
    $scope.$on('PageLoaded', function (event, prms) {
        //footerbook
      //  if (prms == 'footer')
      //      $('.footer' + $scope.active).addClass('active');


    });

    $scope.popup_certificate_visible = false;
    $scope.popup_certificate_title = 'Certificate';
    $scope.popup_certificate = {
        width: 300,
        height: 260,
        //position: 'left top',
        fullScreen: true,
        showTitle: true,
        dragEnabled: false,
        toolbarItems: [
            { widget: 'dxButton', location: 'after', options: { type: 'danger', text: 'Close', icon: 'remove', }, toolbar: 'bottom' }
        ],

        //visible: false,

        //closeOnOutsideClick: false,
        //onShowing: function (e) {


        //},
        //onShown: function (e) {
       
        //},
        //onHiding: function () {

        //    $scope.flight = null;
        //    $scope.crew = null;
        //},
        bindingOptions: {
            visible: 'popup_certificate_visible',
            //width: 'pop_width',
            //height: 'pop_height',
            title: 'popup_certificate_title',

        }
    };

    //close button
    $scope.popup_certificate.toolbarItems[0].options.onClick = function (e) {

        $scope.popup_certificate_visible = false;

    };
    ////////////////////////////////////
    $scope.popup_newcertificate_visible = false;
     
    $scope.popup_newcertificate = {
       title:'Certificate',
        fullScreen: true,
        showTitle: true,
        dragEnabled: false,   
        toolbarItems: [
           { widget: 'dxButton', location: 'after', options: { type: 'danger', text: 'Close', icon: 'remove', }, toolbar: 'bottom' }
        ],

        visible: false,

        //closeOnOutsideClick: false,
        //onShowing: function (e) {


        //},
        //onShown: function (e) {
            
        //},
        //onHiding: function () {

            
        //},
        bindingOptions: {
            visible: 'popup_newcertificate_visible',
            
             

        }
    };

    $scope.newCertificate = {
        Issued: null,
        Expires: null,
        Title: null,
        Remark: null,
    };
    $scope.date_issued = {
        adaptivityEnabled: true,
        type: "date",
        placeholder: 'Issued',

        useMaskBehavior: true,

        bindingOptions: {
            value: 'newCertificate.Issued'

        }
    };


    $scope.txt_title = {

        bindingOptions: {
            value: 'newCertificate.Title'
        }
    };

    //close button
    $scope.popup_newcertificate.toolbarItems[0].options.onClick = function (e) {

        $scope.popup_newcertificate_visible = false;

    };




    $scope.$on('new_certificate', function (event, prms) {
        $scope.popup_newcertificate_visible = true;
    });
    $rootScope.$broadcast('AppLibraryLoaded', null);


}]);
