'use strict';
app.controller('reportViewerController', ['$scope', '$sce', '$location', '$routeParams', '$rootScope', 'libraryService', 'activityService', 'authService', 'notificationService', '$route', function ($scope, $sce, $location, $routeParams, $rootScope, libraryService, activityService, authService, notificationService, $route) {

    $scope.url = $routeParams.url;

   // $scope._url = $sce.trustAsResourceUrl($rootScope.webBase + 'pdfjs/web/viewer.html?file=../../upload/clientsfiles/' + $scope.url);
    $scope._url = $sce.trustAsResourceUrl("https://localhost:44350/frmReportView.aspx");


    $rootScope.page_title = $scope.title;
   
    $('#frame').height($(window).height() - 85);


}]);