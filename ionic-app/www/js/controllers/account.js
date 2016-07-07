app.controller('AccountCtrl', function($scope, $http, Books, $location, $stateParams) {
  $scope.leftSide.src = 'templates/menu.html';
  var data = window.localStorage['authToken']

  $http({
    method: 'GET',
    url: 'http://localhost:3000/users/' + data,
  }).then(function(response){
    $scope.user = response
    var userId = window.localStorage['authToken']
  })

  $scope.settings = {
    enableFriends: true
  };

   $scope.sendToCurrent = function(){
    $location.path("/tab/books")
  }

   $scope.sendToQueue = function(){
    $location.path("/tab/queue")
  }

   $scope.sendToHistory = function(){
    $location.path("/tab/history")
  }

   $scope.sendToFavorites = function(){
    $location.path("/tab/favorites")
  }

   $scope.sendToReviews = function(){
    $location.path("/tab/user-review")
  }
})
