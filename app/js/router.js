angular.module("app").config(function ($routeProvider, $httpProvider) {


    var isLoggedIn = function ($q, $timeout, $http, $location, $rootScope, FlashService) {
        var deferred = $q.defer();

        $http.get('/auth/loggedIn').success(function (resp) {
            if (resp !== '0') {
                $rootScope.loggedIn = true;
                deferred.resolve();
            } else {
                FlashService.show({type: "warning", content: "You need to log in "});
                deferred.reject();
                $rootScope.loggedIn = false;
                $location.url('/login');
            }
        }).error(function (resp) {
                FlashService.show({type: "error", content: "Could not connect to the server to authenticate the user " + resp.data});

            });

        return deferred.promise;
    };

    var logsOutUserOn401 = function ($rootScope, $location, $q, FlashService) {

        var success = function (response) {
            return response;
        };

        var error = function (response) {
            if (response.status === 401) {
                $rootScope.loggedIn = false;
                $location.path('/login');
                FlashService.show({type: 'danger', content: 'You have been logged out'});
            }
            return $q.reject(response);
        };

        return function (promise) {
            return promise.then(success, error);
        };
    };

    $httpProvider.responseInterceptors.push(logsOutUserOn401);


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

}).run(function ($rootScope, $http) {


        $rootScope.logout = function () {
            $http.post('/auth/logout');
        };

        $rootScope.log = function (thing) {
            console.log(thing);
        };

        $rootScope.alert = function (thing) {
            alert(thing);
        };
    });
