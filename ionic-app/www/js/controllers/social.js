app.controller('SocialCtrl', function($scope, $http, $ionicPopup, $location) {
  $http.get('https://tranquil-tundra-32569.herokuapp.com/users')
  .then(function(response){
    $scope.resultsArray = response.data.users
    console.log($scope.resultsArray)
  })

  $scope.showPopup = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'There is an error!' ,
      template: 'Error'
    });

    alertPopup.then(function(res) {
      console.log('Cleared');
    });
  }

  $scope.search = function() {
  var query = $scope.data.username
   $http.get('https://tranquil-tundra-32569.herokuapp.com/users/search?user_name=' + query).then(function(response) {
      if (response.data.user === null){
        $scope.showPopup()
      }else{
        userId = response.data.user.id
        $location.path("/tab/users/" + userId)
      }
    })
  }
})
