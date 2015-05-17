'use strict';

/**
 * @ngdoc function
 * @name tunariAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tunariAppApp
 */

var tunariAppApp = angular.module('tunariAppApp', ['ngRoute','restangular', 'ngAnimate'])
    .config(function($routeProvider){
        $routeProvider.when('/products',
            {
                templateUrl: 'templates/SampleBook.html',
                controller: 'ProductListCtrl'
            });
        $routeProvider.when('/product/:productId',
            {
                templateUrl: 'templates/ProductDetails.html',
                controller: 'ProductCtrl'
            });
        $routeProvider.when('/register',
            {
                templateUrl: 'templates/Register.html',
                controller: 'RegisterCtrl'
            });
        $routeProvider.when('/printers',
            {
                templateUrl: 'templates/PrinterList.html',
                controller: 'PrinterListCtrl'
            });
        $routeProvider.when('/login',
            {
                templateUrl: 'templates/Login.html',
                controller: 'LoginCtrl'
            });
        $routeProvider.when('/logout',
            {
                templateUrl: 'templates/SampleBook.html',
                controller: 'LogoutCtrl'
            });
        
        $routeProvider.otherwise('/products');
        
    })
    .config(function(RestangularProvider){
        RestangularProvider.setBaseUrl('http://192.168.0.101:8000/api');      
        /*RestangularProvider.addElementTransformer('products', true, function(element){
            //element.imageUrl = 'hola';
        });*/
        
    
});
