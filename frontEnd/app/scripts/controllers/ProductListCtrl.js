'use strict';

tunariAppApp.controller('ProductListCtrl',
    function ($scope, Restangular){
    console.log("hiii");
    //$scope.products = Restangular.all('products').getList();
    Restangular.all('products').getList().then(function(result){
        $scope.products= result;
    });
    //$scope.products = productData.products;
   // $http.get('http://0.0.0.0:8000/api/products')
//    .success(function(response) {$scope.products = response.data;});
    //console.log($scope.products);
    
    $scope.productTypes = ["Todos","Mementos","Estampas"];
    $scope.selectedType = "Todos";
    $scope.changeType = function(selected)
    {
        $scope.selectedType = selected;
        
        if($scope.tags){
            Restangular.all('products?tags=' + $scope.tags+'&productType='+$scope.selectedType).getList().then(function(result){
            //$scope.products= result;   
            });  
        }
        else{
            Restangular.all('products?productType='+$scope.selectedType).getList().then(function(result){
            $scope.products= result;   
            });
        }        
    };
    $scope.updateProducts = function(){
        console.log($scope.selectedType);
        Restangular.all('products?tags=' + $scope.tags+'&productType='+$scope.selectedType).getList().then(function(result){
        $scope.products= result;   
        });
    };
});