angular.module('app').filter 'TypeFilter', (StoryService) ->
  (elements) ->
    for item in elements
      backgroundColor = _.findWhere(StoryService.getTypesAndColors(), {name: item.type}).color
      _.extend(item, {storyBackgroundColor: backgroundColor})

