angular.module('app').factory 'FlashService', ($rootScope) ->

  $rootScope.alert = null


  show: (message) ->
    $rootScope.alert = message

  clear: ->
    $rootScope.alert = null


