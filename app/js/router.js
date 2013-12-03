var app = angular.module("app");

app.config(function ($routeProvider) {

    var isLoggedIn = function ($q, $timeout, $http, $location, $rootScope, FlashService) {
        var deferred = $q.defer();

        $http.get('/TrelloLiteGrails/auth/loggedIn').success(function (resp) {
            if (resp !== '0') {
                $rootScope.loggedIn = true;
                $timeout(deferred.resolve, 0);
            } else {
                FlashService.show({type: "warning", text: "You need to log in "});
                $timeout(function () {
                    deferred.reject();
                }, 0);
                $rootScope.loggedIn = false;
                $location.url('/login');
            }
        }).error(function (resp) {
                FlashService.show({type: "error", text: "Could not connect to the server to authenticate the user " + resp.data});

            });

        return deferred.promise;
    };

    $routeProvider
        .when('/story', {
            templateUrl: 'story.html',
            controller: 'StoryCtrl',
            resolve: {
                loggedIn: isLoggedIn
            }
        })
        .when('/login', {
            templateUrl: 'login.html',
            controller: 'LoginCtrl'
        })
        .otherwise({
            redirectTo: '/story'
        });

});

app.config(function ($httpProvider) {


    var logsOutUserOn401 = function ($rootScope, $location, $q, FlashService) {

        var success = function (response) {
            return response;
        };

        var error = function (response) {
            if (response.status === 401) {
                $rootScope.loggedIn = false;
                $location.path('/login');
                FlashService.show({type: 'error', text: 'You have been logged out'});
            }
            return $q.reject(response);
        };

        return function (promise) {
            return promise.then(success, error);
        };
    };

    $httpProvider.responseInterceptors.push(logsOutUserOn401);


}).run(function ($rootScope, $http, FlashService) {

        $rootScope.logout = function () {
            $rootScope.message = {type: "info", text: "You've been logged out"};
            $rootScope.loggedIn = false;
            $http.post('/TrelloLiteGrails/auth/logout');
        };

        $rootScope.dismissMessage = function () {
            FlashService.clear();
        };
    });
