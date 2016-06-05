angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, Books) {
  window.localStorage['authToken']
  $scope.books = Books.all();
  $scope.remove = function(book) {
    Books.remove(book);
  };
})


.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('ChapterCtrl', function($scope, $http, $stateParams, Books) {
  $scope.book = Books.get($stateParams.bookId)
  // $scope.chapter = Chapters.where(book_id: $stateParams.bookId, id: $stateParams.bookId)
  // $scope.reactions = chapter.reactions
})

.controller('BookDetailCtrl', function($scope, $http, $stateParams, Books, $location){

  $scope.go = function ( path ){
    $location.path( path );
  }



  if (Books.get($stateParams.bookId) !=null) {
    var book = Books.get($stateParams.bookId);
    console.log(book)
    $scope.book_id = book.id
    $scope.author = book.author
    $scope.title = book.title
    $scope.image = book.image
    $scope.description = book.description

  }else{
    $http.get('https://www.googleapis.com/books/v1/volumes?q=' + $stateParams.bookId)
    .then(function(response){
      console.log(response.data.items[0])
      var book = response.data.items[0]
      $scope.author = book.volumeInfo.authors[0]
      $scope.title = book.volumeInfo.title
      $scope.description = book.volumeInfo.description
      $scope.image = book.volumeInfo.imageLinks.thumbnail
      $scope.pageCount = book.volumeInfo.pageCount
      $scope.publishedDate = book.volumeInfo.publishedDate
    })
  }



  $scope.addQueue = function() {
    var bookData = book
    var userId = window.localStorage['authToken']
    var jsonData = JSON.stringify(bookData)
    console.log(jsonData)

  $http({
    method: 'POST',
    url: 'http://localhost:3000/users/'+userId+'/books',
    dataType: "json",
    data: jsonData
  }).then(function(response){
    window.localStorage['authToken'] = response.data.token
  })
    // $location.path('/tab/dash')
  }

})

.controller('SearchCtrl', function($scope, $http,Books){
  $scope.data = {};

  $scope.books = Books.all();
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

.controller('LoginCtrl', function($scope, $ionicPopup, $state, $http) {
    $scope.data = {};

    $scope.login = function() {

      var request = {
        method: 'GET',
        url: 'http://localhost:3000/login',
        dataType: "json",
        data: $scope.data
      }

      $http(request)
      .success(function(data) {
        $state.go('tab.dash');
        })
      .error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
            });
        });
    }


})

.controller('RegisterCtrl', function($scope, $location, $http){
  $scope.data = {};

  $scope.register = function(){

    var userData = $scope.data
        console.log(userData)
        var jsonData = JSON.stringify(userData)
  $http({
    method: 'POST',
    url: 'http://localhost:3000/register',
    dataType: "json",
    data: jsonData
  }).then(function(response){
    window.localStorage['authToken'] = response.data.token
    $location.path('#/login')
  })

  }
  })

