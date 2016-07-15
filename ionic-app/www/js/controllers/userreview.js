app.controller('UserReviewCtrl', function($scope, $http, $stateParams){
  if (typeof($stateParams.userId) === 'undefined' ){
    userId = window.localStorage['authToken']
  }else{
    userId = $stateParams.userId
  }
  $http.get('http://tranquil-tundra-32569.herokuapp.com/users/' + userId + '/reviews')
  .then(function(response){
    console.log(response)
    $scope.reviews = response.data.reviews
    if ($scope.reviews.length < 0){
      $scope.message = "No user reviews. Add some!"
    }
  })
})
