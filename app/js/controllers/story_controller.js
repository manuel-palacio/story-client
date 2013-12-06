angular.module('app').controller('StoryCtrl', function ($scope, StoryService) {


    function init() {
        $scope.stories = StoryService.getStories();
        $scope.statuses = StoryService.getStatuses();
        $scope.types = StoryService.getTypes();
    }

    init();

    var statusesIndex = _.indexBy($scope.statuses, 'name');
    var typesIndex = _.indexBy($scope.types, 'name');

    $scope.setCurrentStory = function (story) {
        $scope.currentStory = story;
        $scope.currentType = typesIndex[story.type];
        $scope.currentStatus = statusesIndex[story.status];
    };

    $scope.setCurrentStatus = function (status) {
        if (typeof $scope.currentStory !== 'undefined') {
            $scope.currentStory.status = status.name;
        }
    };

    $scope.setCurrentType = function (type) {
        if (typeof $scope.currentStory !== 'undefined') {
            $scope.currentStory.type = type.name;
            $scope.currentStory.storyBackground = typesIndex[$scope.currentStory.type].color;

        }
    };

    $scope.deleteStory = function (id) {
        StoryService.deleteStory(id);
    };

    $scope.updateStory = function () {
        StoryService.updateStory($scope.currentStory);
    };

    $scope.createStory = function () {
        StoryService.saveStory({
            title: 'New Story',
            description: 'Description pending.',
            criteria: 'Criteria pending.',
            status: 'Back Log',
            type: 'Feature',
            reporter: 'rep',
            assignee: 'Pending'
        });
    };

    $scope.$on('loadStories', function (event) {
        $scope.stories = StoryService.getStories();
    });
});
