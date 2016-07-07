app.controller('SearchCtrl', function($scope, $http,Books){
$scope.leftSide.src = 'templates/menu.html';
  var userId = window.localStorage['authToken']
  $scope.data = {};

  $http.get('https://tranquil-tundra-32569.herokuapp.com/users/' + userId + '/recommended').then(function(response){
    var author = response.data.recommendations
    $http.get('https://www.googleapis.com/books/v1/volumes?q=+ inauthor:' + author).then(function(response){
      $scope.books = response.data.items
    })
  })

  $http.get('https://tranquil-tundra-32569.herokuapp.com/trending')
  .then(function(response) {
    $scope.popular_books = response.data.popular_books
    $scope.favorite_books = response.data.favorite_books
  })

  $scope.remove = function(book) {
    Books.remove(book);
  };

  $scope.find = function(){
    var query = $scope.data.search
    $http.get('https://www.googleapis.com/books/v1/volumes?q=' + query)
    .then(function(response){
      $scope.resultsArray = response.data.items
    })
  }
})
