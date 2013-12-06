angular.module('app').directive('userstory', function () {
    var linker = function (scope, element, attrs) {

        element.mouseover(function () {
            element.css({ 'opacity': 0.7 });
        }).mouseout(function () {
                element.css({ 'opacity': 1.0 });
            });

    };
    var controller = function ($scope) {

    };
    return {
        restrict: 'A',
        controller: controller,
        link: linker
    };
});