angular.module('app').controller('StoryCtrl', function ($q, $scope, $modal, StoryService) {

    function init() {
        StoryService.getStories().$promise.then(
            function (value) {
                $scope.rows = chunk(value);
            }
        );

        $scope.statuses = StoryService.getStatuses();
        $scope.types = StoryService.getTypes();
    }

    function chunk(value) {
        return _.chain(value).groupBy(function (element, index) {
            return Math.floor(index / 3);
        }).toArray().value();
    }

    init();

    var statusesIndex = _.indexBy($scope.statuses, 'name');
    var typesIndex = _.indexBy($scope.types, 'name');
    var modalPromise = $modal({template: 'story_edit.html', persist: true, show: false, backdrop: 'static', scope: $scope});


    $scope.setCurrentStory = function (story) {
        $scope.currentStory = story;
        $scope.currentType = typesIndex[story.type];
        $scope.currentStatus = statusesIndex[story.status];

        $q.when(modalPromise).then(function (modalEl) {
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

    $scope.$on('storyChanged', function (event) {
        StoryService.getStories().$promise.then(
            function (value) {
                $scope.rows = chunk(value);
            }
        );
    });
});
