'use strict';

tunariAppApp.controller('LoginCtrl',
    function ($scope, AuthToken, Restangular, Auth){
    $scope.submit = function(){
        var user = {
        email: $scope.email,
        password: $scope.password
        };
        Auth.login($scope.email, $scope.password).then(function(result){
            //AuthToken.setToken(result.token); 
            alert('Haz sido autenticado satisfactoriamente, Bienvenido a TunariApp '+ result.user.email+' !!!');
        },function(err){
            alert('warning, Algo salio mal :(', err.message);
        });
    };
});