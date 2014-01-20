angular.module('app').filter 'TypeFilter', (StoryService) ->
  (elements) ->
    for item in elements
      background = _.findWhere(StoryService.getTypesAndColors(), {name: item.type}).color
      _.extend(item, {storyBackground: background})

