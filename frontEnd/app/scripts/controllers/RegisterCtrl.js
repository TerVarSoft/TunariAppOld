'use strict';

tunariAppApp.controller('RegisterCtrl',
    function ($scope, Restangular, Auth){
    
    
    $scope.submit = function(email, password){
        Auth.register($scope.email, $scope.password).then(function(result){
            alert('Haz sido registrado satisfactoriamente, Bienvenido a TunariApp '+ result.user.email+' !!!');
        },function(result){
            alert('Oops, hubo un problema con el registro intente de nuevo ');
        });
    };
    
});