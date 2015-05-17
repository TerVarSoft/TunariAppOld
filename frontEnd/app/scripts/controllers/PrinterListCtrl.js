'use strict';

tunariAppApp.controller('PrinterListCtrl',
    function ($scope, Restangular, AuthToken){
    var token = AuthToken.getToken();
            console.log(token);
    if(token)
        Restangular.setDefaultHeaders({authorization:'Bearer ' + token});
    else
         Restangular.setDefaultHeaders({});
    
    Restangular.all('printers').getList().then(function(result){
        $scope.printers= result;
    },function(err){
        alert('No pudimos sacar la lista de imprentas', err.message);
    });
    
});