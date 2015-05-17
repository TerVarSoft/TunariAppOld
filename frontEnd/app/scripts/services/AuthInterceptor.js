'use strict'

tunariAppApp.provider('AuthInterceptor', function(AuthTokenProvider){
    return {
    setVersion: function (value) {
      version = value;
    },
    $get: function () {
      var token = AuthTokenProvider.getToken();
              
         //   if(token)
        //        config.headers.Authorization = 'Bearer' + token;
            return token;
        }
    };
  
    /*return{
        request: function(config){
            
            var token = AuthToken.getToken();
            
            if(token)
                config.headers.Authorization = 'Bearer' + token;
            return config;
        },
        response: function(response){
            return response;
        }
    };*/
});