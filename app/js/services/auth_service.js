angular.module('app').factory('AuthenticationService', function ($http, $location, $rootScope, FlashService) {
    var success = function () {
        FlashService.show({type: "success", content: 'Authentication successful!'});
        $location.url('/story');
    };

    var error = function () {
        FlashService.show({type: "warning", content: 'Authentication failed.'});
        $location.url('/login');
    };

    return {
        login: function (credentials) {
            $rootScope.log("Logging in with " + credentials.username);
            return $http.post('/auth/logIn', {
                credentials: credentials
            }).success(success).error(error);
        }
    };
});


