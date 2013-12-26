angular.module('app').factory('FlashService', function ($rootScope) {

    $rootScope.alert = null;

    return {
        show: function (message) {
            $rootScope.alert = message;
        },
        clear: function () {
            $rootScope.alert = null;
        }
    };
});

