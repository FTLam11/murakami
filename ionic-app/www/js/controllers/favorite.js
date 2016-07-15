app.controller('FavoriteCtrl', function($scope, $http, $stateParams){
  if(typeof($stateParams.userId) === 'undefined' ){
    userId = window.localStorage['authToken']
  }else{
    userId = $stateParams.userId
  }

  $http.get('http://tranquil-tundra-32569.herokuapp.com/users/' + userId + '/favorite')
  .then(function(response){
    $scope.books = response.data.favorite_books
    if ($scope.books === null){
      $scope.message = "No Books in your Favorites Yet! Add one!"
    }
  })
})
