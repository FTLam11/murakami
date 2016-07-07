app.controller('UserCtrl', function($scope, $http, Books, $location, $stateParams) {
  $scope.leftSide.src = 'templates/menu.html';
  // console.log($stateParams)
  var userId = $stateParams.userId

  $http({
    method: 'GET',
    url: 'http://localhost:3000/users/' + userId,
  }).then(function(response){
    $scope.user = response
    console.log(response)
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
