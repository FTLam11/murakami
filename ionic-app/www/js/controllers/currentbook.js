app.controller('CurrentBookCtrl', function($scope, $http, Books, $location, $stateParams){
  if (typeof($stateParams.userId) === 'undefined' ){
    userId = window.localStorage['authToken']
  }else{
    userId = $stateParams.userId
  }


  $http.get("https://tranquil-tundra-32569.herokuapp.com/users/" + userId + "/current")
  .then(function(response){
    var currentBooks = response.data.current_books;
    Books.replaceCurrent(currentBooks)
    $scope.books = Books.all("current");
    if (currentBooks.length === 0) {
      $scope.message = "Go to search and add some books!"
    } else {
      $scope.message = ""
    }
  })

  $scope.remove = function(book) {
    Books.remove(book);
  };

  $scope.viewDetails = function(bookId){
    $location.path("/tab/books/" + bookId)
  }

})
