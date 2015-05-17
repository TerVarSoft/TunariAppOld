'use strict';

tunariAppApp.controller('HeaderCtrl',
    function ($scope, AuthToken){
    
    $scope.isAuthenticated = AuthToken.isAuthenticated;
    console.log($scope.isAuthenticated);
});