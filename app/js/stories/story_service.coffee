angular.module('app').factory 'StoryService', ($q, $http, $rootScope, FlashService) ->

  class StoryService

    getStories: ->
      d = $q.defer()
      $http.get("/resources/stories").success ((result) ->
        d.resolve(_.chain(result).groupBy((element, index) ->
                Math.floor(index / 4)).toArray().value()))
      d.promise


    saveStory: (story) ->
      $http.post("/resources/stories", story).success((result) -> $rootScope.$broadcast("storyChanged", ""))


    updateStory: (story) ->
      $http.put("/resources/stories/#{story.id}", story).success((result) -> FlashService.show({type: "success", content: "Story updated"}))


    deleteStory: (id) ->
      $http.delete("/resources/stories/#{id}").success((result) -> $rootScope.$broadcast("storyChanged", ""))


    getStatuses: ->
      [
        {name: 'Back Log'},
        {name: 'To Do'},
        {name: 'In Progress'},
        {name: 'Code Review'},
        {name: 'QA Review'},
        {name: 'Verified'},
        {name: 'Done'}
      ]


    getTypesAndColors: ->
      [
        {name: 'Feature', color: 'success'},
        {name: 'Enhancement', color: 'info'},
        {name: 'Bug', color: 'danger'},
        {name: 'Spike', color: 'warning'}
      ]

  new StoryService()





