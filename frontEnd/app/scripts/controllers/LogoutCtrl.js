'use strict';

tunariAppApp.controller('LogoutCtrl',
    function ($scope, $window,  AuthToken){
    AuthToken.removeToken();
    $window.location.href = '/#/products';
});