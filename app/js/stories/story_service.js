angular.module('app').factory('StoryService', function ($resource, $q, $http, $rootScope, FlashService) {

    var getStories = function () {
        var d = $q.defer();
        $http.get("/resources/stories").success(function(result){
            d.resolve(result);
        });

        return d.promise;
    };

    var saveStory = function (story) {
        $resource("/resources/stories").save(story, function (resp) {
            $rootScope.$broadcast("storyChanged", "");
        }, function (error) {
            //handle error
        });
    };

    var updateStory = function (story) {
        var Story = $resource('/resources/stories/:id', { id: story.id }, {
            update: { method: 'PUT' }
        });

        Story.update(story, function (resp) {
            FlashService.show({type: "success", content: "Story updated"});
        }, function (error) {
            //handle error
        });
    };

    var deleteStory = function (id) {
        $resource("/resources/stories/:storyId").delete({storyId: id}, function (resp) {
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


    var getTypesAndColors = function () {
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
        getTypesAndColors: getTypesAndColors,
        saveStory: saveStory,
        deleteStory: deleteStory,
        updateStory: updateStory
    };
});


