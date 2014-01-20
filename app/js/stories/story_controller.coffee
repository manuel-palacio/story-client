angular.module('app').controller 'StoryCtrl', ($q, $scope, $modal, $rootScope, StoryService) ->

    init = ->
        StoryService.getStories().then (value) -> $scope.rows = value
        $scope.statuses = StoryService.getStatuses()
        $scope.types = StoryService.getTypesAndColors()

    init()

    statusesIndex = _.indexBy($scope.statuses, 'name');
    typesIndex = _.indexBy($scope.types, 'name');
    editDialog = $modal({template: 'story_edit.html', persist: true, show: false, backdrop: 'static', scope: $scope})


    $scope.setCurrentStory =  (story) ->
        $scope.currentStory = story
        $scope.currentType = typesIndex[story.type]
        $scope.currentStatus = statusesIndex[story.status]

        $q.when(editDialog).then (modalEl) -> modalEl.modal('show')


    $scope.setCurrentStatus =  (status) ->
        if typeof $scope.currentStory != 'undefined'
            $scope.currentStory.status = status.name

    $scope.setCurrentType = (type) ->
        if typeof $scope.currentStory != 'undefined'
            $scope.currentStory.type = type.name;
            $scope.currentStory.storyBackground = typesIndex[$scope.currentStory.type].color

    $scope.updateStory =  ->
        StoryService.updateStory($scope.currentStory)

    $rootScope.createStory = ->
        StoryService.saveStory({
            title: 'New Story',
            description: 'Description pending.',
            criteria: 'Criteria pending.',
            status: 'Back Log',
            type: 'Feature',
            reporter: 'rep',
            assignee: 'Pending'
        });

    $scope.$on 'storyChanged',  () -> StoryService.getStories().then (value) -> $scope.rows = value
