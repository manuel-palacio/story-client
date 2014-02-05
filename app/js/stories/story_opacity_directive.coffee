angular.module('app').directive 'hoverable', ->

  controller = ($scope, StoryService) ->
    $scope.deleteStory = (id) ->
      StoryService.deleteStory(id)

  linker = (scope, element, attrs) ->
    element.mouseover(->
      element.css({ 'opacity': 0.7 }))
    .mouseout(->
        element.css({ 'opacity': 1.0 }))

  restrict: 'A'
  controller: controller
  link: linker



