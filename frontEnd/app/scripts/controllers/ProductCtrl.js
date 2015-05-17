'use strict';

tunariAppApp.controller('ProductCtrl',
    function ($scope, $routeParams, Restangular){       
        Restangular.one('products',$routeParams.productId).get().then(function(result){
            $scope.product= result;
        });
    });
    
