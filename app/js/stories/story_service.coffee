angular.module('app').factory 'StoryService', ($resource, $q, $http, $rootScope, FlashService) ->

  getStories = ->
    d = $q.defer();
    $http.get("/resources/stories").success (result) -> d.resolve(chunk(result))
    d.promise


  chunk = (value) -> _.chain(value).groupBy((element, index) -> Math.floor(index / 4)).toArray().value()


  saveStory = (story) ->
    $resource("/resources/stories").save(story, (resp) ->
      $rootScope.$broadcast("storyChanged", "")
    , (error) ->)

  updateStory = (story) ->
    Story = $resource('/resources/stories/:id', { id: story.id }, {
      update: { method: 'PUT' }
    });

    Story.update(story, (resp) ->
      FlashService.show({type: "success", content: "Story updated"});
    , (error) ->)

  deleteStory = (id) ->
    $resource("/resources/stories/:storyId").delete({storyId: id}, (resp) ->
      $rootScope.$broadcast("storyChanged", "");
    , (error) ->)

  getStatuses = ->
    [
      {name: 'Back Log'},
      {name: 'To Do'},
      {name: 'In Progress'},
      {name: 'Code Review'},
      {name: 'QA Review'},
      {name: 'Verified'},
      {name: 'Done'}
    ]


  getTypesAndColors = ->
    [
      {name: 'Feature', color: 'success'},
      {name: 'Enhancement', color: 'info'},
      {name: 'Bug', color: 'danger'},
      {name: 'Spike', color: 'warning'}
    ];


  getStatuses: getStatuses
  getStories: getStories
  getTypesAndColors: getTypesAndColors
  saveStory: saveStory
  deleteStory: deleteStory
  updateStory: updateStory


