angular.module('app').factory('AuthenticationService', function ($rootScope, $http, $location, FlashService) {


    var success = function () {
        FlashService.show({type: "success", text: 'Authentication successful!'});
        $location.url('/story');
    };

    var error = function () {
        FlashService.show({type: "warning", text: 'Authentication failed.'});
        $location.url('/login');
    };

    return {
        login: function (credentials) {

            return $http.post('/TrelloLiteGrails/auth/logIn', {
                credentials: credentials
            }).success(success).error(error);
        }
    };
});