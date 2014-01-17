angular.module('app').controller('StoryCtrl', function ($q, $scope, $modal, $rootScope, StoryService) {

    function init() {
        StoryService.getStories().then(
            function (value) {
                $scope.rows = value;
            }
        );

        $scope.statuses = StoryService.getStatuses();
        $scope.types = StoryService.getTypesAndColors();
    }

    init();

    var statusesIndex = _.indexBy($scope.statuses, 'name');
    var typesIndex = _.indexBy($scope.types, 'name');
    var editDialog = $modal({template: 'story_edit.html', persist: true, show: false, backdrop: 'static', scope: $scope});


    $scope.setCurrentStory = function (story) {
        $scope.currentStory = story;
        $scope.currentType = typesIndex[story.type];
        $scope.currentStatus = statusesIndex[story.status];

        $q.when(editDialog).then(function (modalEl) {
            modalEl.modal('show');
        });
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

    $scope.updateStory = function () {
        StoryService.updateStory($scope.currentStory);
    };

    $rootScope.createStory = function () {
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

    $scope.$on('storyChanged', function (event) {
        StoryService.getStories().then(
            function (value) {
                $scope.rows = value;
            }
        );
    });
});
