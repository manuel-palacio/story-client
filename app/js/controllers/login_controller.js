angular.module('app').controller('LoginCtrl', function ($scope, AuthenticationService) {
    // This object will be filled by the form
    $scope.credentials = {username: "", password: ""};

    $scope.login = function () {
        AuthenticationService.login($scope.credentials);
    };
});

