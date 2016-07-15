app.controller('UserCtrl', function($scope, $http, $location, Books, $stateParams) {
  $scope.leftSide.src = 'templates/menu.html';
  var userId = $stateParams.userId

  $http({
    method: 'GET',
    url: 'http://tranquil-tundra-32569.herokuapp.com/users/' + userId,
  }).then(function(response){
    $scope.user = response
  })

  $scope.settings = {
    enableFriends: true
  };

  $scope.sendToCurrent = function(){
    $location.path("/tab/users/" + userId + "/books")
  }

   $scope.sendToQueue = function(){
    $location.path("/tab/users/" + userId + "/queue")
  }

   $scope.sendToHistory = function(){
    $location.path("/tab/users/" + userId + "/history")
  }

   $scope.sendToFavorites = function(){
    $location.path("/tab/users/" + userId + "/favorites")
  }

   $scope.sendToReviews = function(){
    $location.path("/tab/users/" + userId + "/reviews")
  }

})
