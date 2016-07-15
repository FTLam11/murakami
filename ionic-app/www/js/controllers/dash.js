app.controller('DashCtrl', function($scope, $http, Books, $location) {
  $scope.leftSide.src = 'templates/menu.html';
  function ContentController($scope, $ionicSideMenuDelegate) {
    $scope.toggleLeft = function() {
      $ionicSideMenuDelegate.toggleLeft();
    };
  }

  userId = window.localStorage['authToken']
  $http.get("http://tranquil-tundra-32569.herokuapp.com/users/" + userId + "/current")
  .then(function(response){
    var currentBooks = response.data.current_books;
    Books.replaceCurrent(currentBooks)
    $scope.books = Books.all("current");
    if ($scope.books.length === 0) {
      $scope.message = "Go to search and add some books!"
    } else {
      $scope.message = ""
    }
  })

  $scope.remove = function(book) {
    Books.remove(book);
  };

  $scope.viewChapter = function(bookId) {
    $http.get("http://tranquil-tundra-32569.herokuapp.com/books/" + bookId + '/chapters')
    .then(function(response){
      var chapterStart = response.data.first_chapter.id
      var chapterEnd = response.data.last_chapter.id
      $location.path("/tab/books/" + bookId + "/chapters/" + chapterStart)
    })
  }

})
