angular.module('app').filter('TypeFilter', function (StoryService) {

    return function (elements) {
        elements.forEach(function (item) {
            var background = _.findWhere(StoryService.getTypes(), {name: item.type}).color;
            _.extend(item, {storyBackground: background});
        });

        return elements;
    };
});
