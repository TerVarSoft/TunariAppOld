'use strict';

tunariAppApp.directive('validateEquals', function () {
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, ngModelCtrl){

            var password = attrs.ngModel;
            var password_confirm = attrs.validateEquals;
          
            scope.$watch('[password, password_confirm]', function(){
                ngModelCtrl.$setValidity('equal', scope[password] === scope[password_confirm]);
            });
      }
    };
  });
