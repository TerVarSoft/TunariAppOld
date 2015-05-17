tunariAppApp.service('Auth', function($window, Restangular, AuthToken){
    function authSuccesful(result){
        AuthToken.setToken(result.token); 
        $window.location.href = '/#/products';
        return result
    }
    
    this.login = function(email, password){
        return Restangular.all('login')
            .post({
            email:email, 
            password: password
        }).then(authSuccesful);
    }
    
    this.register = function(email, password){
        return Restangular.all('register')
            .post({
            email:email, 
            password: password
        }).then(authSuccesful);
    }
});