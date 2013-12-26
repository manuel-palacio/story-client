angular.module('app').directive('userStory', function () {

    var controller = function ($scope, StoryService) {
        $scope.deleteStory = function (id) {
            StoryService.deleteStory(id);
        };
    };

    var linker = function (scope, element, attrs) {

        element.mouseover(function () {
            element.css({ 'opacity': 0.7 });
        }).mouseout(function () {
                element.css({ 'opacity': 1.0 });
            });
    };

    return {
        restrict: 'A',
        controller: controller,
        link: linker
    };
});


