angular.module('app').factory('StoryService', function ($resource, $rootScope, FlashService) {
    var getStories = function () {
        return $resource("/TrelloLiteGrails/resources/stories").query();
    };

    var saveStory = function (story) {
        $resource("/TrelloLiteGrails/resources/stories").save(story, function (resp) {
            $rootScope.$broadcast("storyChanged", "");
        }, function (error) {
            //handle error
        });
    };

    var updateStory = function (story) {
        var Story = $resource('/TrelloLiteGrails/resources/stories/:id', { id: story.id }, {
            update: { method: 'PUT' }
        });

        Story.update(story, function (resp) {
            FlashService.show({type: "success", text: "Story updated"});
        }, function (error) {
            //handle error
        });
    };

    var deleteStory = function (id) {
        $resource("/TrelloLiteGrails/resources/stories/:storyId").delete({storyId: id}, function (resp) {
            $rootScope.$broadcast("storyChanged", "");
        }, function (error) {
            //handle error
        });
    };

    var getStatuses = function () {
        return [
            {name: 'Back Log'},
            {name: 'To Do'},
            {name: 'In Progress'},
            {name: 'Code Review'},
            {name: 'QA Review'},
            {name: 'Verified'},
            {name: 'Done'}
        ];
    };


    var getTypes = function () {
        return [
            {name: 'Feature', color: 'success'},
            {name: 'Enhancement', color: 'info'},
            {name: 'Bug', color: 'danger'},
            {name: 'Spike', color: 'warning'}
        ];
    };


    // Public API here
    return {
        getStatuses: getStatuses,
        getStories: getStories,
        getTypes: getTypes,
        saveStory: saveStory,
        deleteStory: deleteStory,
        updateStory: updateStory
    };
});


