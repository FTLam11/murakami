app.controller('SocialCtrl', function($scope, $http, $ionicPopup, $location) {
  $http.get('http://localhost:3000/users')
  .then(function(response){
    $scope.resultsArray = response.data.users
    console.log($scope.resultsArray)
  })

  $scope.showPopup = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Don\'t eat that!',
      template: 'It might taste good'
    });

    alertPopup.then(function(res) {
      console.log('Thank you for not eating my delicious ice cream cone');
    });
  }

    $scope.data = {};

  $scope.search = function() {
    var query = $scope.data.username
    console.log($scope)
    $http.get('http://localhost:3000/users/search?user_name=' + query).then(function(response) {
      console.log(response)
      if (response.data.user === null){
        $scope.showPopup()
      }else{
        console.log("hello")
        userId = response.data.user.id
        console.log(userId)
        $location.path("/tab/users/" + userId)
      }
    })
  }


  // $scope.find = function(){
  //   var query = .search
  //   $http.get('https://www.googleapis.com/books/v1/volumes?q=' + query)
  //   .then(function(response){
  //     $scope.resultsArray = response.data.items
  //   })
  // }
})
