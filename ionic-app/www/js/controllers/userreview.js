app.controller('UserReviewCtrl', function($scope, $http, $stateParams){
  if (typeof($stateParams.userId) === 'undefined' ){
    userId = window.localStorage['authToken']
  }else{
    userId = $stateParams.userId
  }
  $http.get('http://localhost:3000/users/' + userId + '/reviews')
  .then(function(response){
    console.log(response)
    $scope.reviews = response.data.reviews
    if ($scope.reviews.length < 0){
      $scope.message = "No user reviews. Add some!"
    }
  })
})
