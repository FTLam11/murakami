angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $http, Books) {
  userId = window.localStorage['authToken']
  $http.get("http://localhost:3000/users/" + userId + "/current")
  .then(function(response){
    var currentBooks = response.data.current_books;
    $scope.books = currentBooks;
    if (currentBooks.length === 0) {
      $scope.message = "Go to search and add books."
    } else {
      $scope.message = ""
    }
  })
  $scope.remove = function(book) {
    Books.remove(book);
  };
})

.controller('QueueCtrl', function($scope, $http, Books){
  userId = window.localStorage['authToken']
  $http.get("http://localhost:3000/users/" + userId + '/queue')
  .then(function(response){
    $scope.books = response.data.queue_books
    if ($scope.books === null){
      $scope.message = "No Books in Your Queue Yet! Add one!"
    } 
  })
})


.controller('HistoryCtrl', function($scope, $http){
  userId = window.localStorage['authToken']
  $http.get('http://localhost:3000/users/' + userId + '/history').then(function(response){
    console.log(response);
  })
})


.controller('FavoriteCtrl', function($scope, $http){
  userId = window.localStorage['authToken']
  $http.get('http://localhost:3000/users/' + userId + '/favorite').then(function(response){
    $scope.books = response.data.favorite_books
    if ($scope.books === null){
      $scope.message = "No Books in your Favorites Yet! Add one!"
    } 
  })

})

.controller('AccountCtrl', function($scope, $http) {
  $scope.settings = {
    enableFriends: true
  };

    var data =  window.localStorage['authToken']
    console.log(data)
    $http({
      method: 'GET',
      url: 'http://localhost:3000/users/' + data,
    }).then(function(response){
      $scope.user = response
    })

})

.controller('ChapterCtrl', function($scope, $http, $stateParams, Books ,$location) {
  $http.get("http://localhost:3000/chapters/" + $stateParams.chapterId + "/reactions")
  .then(function(response){
    $scope.reactions = response.data.reactions
    if ($scope.reactions === null){
      $scope.message = "There are no reactions! React!"
    } 
  })

  $scope.nextChapter = function() {
    $stateParams.chapterId 
    $location.path("/books/" + 5 + "/chapters/" + 2)
  }
})

.controller('BookDetailCtrl', function($scope, $http, $stateParams, Books, $location, $ionicPopup){

  if (Books.get($stateParams.bookId) !=null) {
    var book = Books.get($stateParams.bookId);
    $scope.book = {}
    $scope.book.book_id = book.id
    $scope.book.author = book.author
    $scope.book.title = book.title
    $scope.book.image_url = book.image
    $scope.book.description = book.description

  }else{
    $http.get('https://www.googleapis.com/books/v1/volumes?q=' + $stateParams.bookId)
    .then(function(response){
      var book = response.data.items[0]
      $scope.book = {}
      $scope.book.author = book.volumeInfo.authors[0]
      $scope.book.title = book.volumeInfo.title
      $scope.book.description = book.volumeInfo.description
      $scope.book.image_url = book.volumeInfo.imageLinks.thumbnail
      $scope.book.pageCount = book.volumeInfo.pageCount
      $scope.book.publishedDate = book.volumeInfo.publishedDate
    })
  }


  $scope.go = function ( path ){
    $location.path( path );
  }

  $scope.start = function() {
    $scope.data = {};

    var myPopup = $ionicPopup.show({
      template: '<input type="text" ng-model="data.wifi">',
      title: 'Enter number of chapters',
      scope: $scope,
      buttons: [
        { text: 'Cancel' },
        {
          text: '<b>Save</b>',
          type: 'button-positive',
          onTap: function(e) {
            if (!$scope.data.wifi) {
              //don't allow the user to close unless he enters wifi password
              e.preventDefault();
            } else {
              $scope.sendBookReq($scope.data.wifi, $scope)
              // go('/#/tab/books/5/chapters/1')
            }
          }
        }
      ]
    })
  }

  $scope.queue = function() {
    $scope.data = {};

    var myPopup = $ionicPopup.show({
      template: '<input type="text" ng-model="data.wifi">',
      title: 'Enter number of chapters',
      scope: $scope,
      buttons: [
        { text: 'Cancel' },
        {
          text: '<b>Save</b>',
          type: 'button-positive',
          onTap: function(e) {
            if (!$scope.data.wifi) {
              //don't allow the user to close unless he enters wifi password
              e.preventDefault();
            } else {
              $scope.sendBookReq($scope.data.wifi, $scope)
            }
          }
        }
      ]
    })
  }

  $scope.sendBookReq = function(chapter_number, $scope) {
    var bookData = $scope.book
    bookData.chapter_count = parseInt(chapter_number)
    var userId = window.localStorage['authToken']
    var jsonData = JSON.stringify(bookData)

  $http({
    method: 'POST',
    url: 'http://localhost:3000/users/'+userId+'/books',
    dataType: "json",
    data: jsonData
  }).then(function(response){
    window.localStorage['authToken'] = response.data.token
  })
    $location.path('/books/5/chapters/1')
    console.log(window.localStorage['authToken'])
    console.log("+++++++++++++++++++++++++")
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

    var userData = $scope.data;
    var jsonData = JSON.stringify(userData);
    $http({
      method: 'POST',
      url: 'http://localhost:3000/login',
      dataType: "json",
      data: jsonData
    })
      .success(function(response) {
        if (response.token == "failed") {
          var alertPopup = $ionicPopup.alert({
              title: 'Login failed!',
              template: 'Please check your credentials!'
          })
          } else {
          window.localStorage['authToken'] = response.token
          $state.go('tab.dash');
        }
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

  var userData = $scope.data;
  var jsonData = JSON.stringify(userData);
  console.log(jsonData)
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

.controller('ReviewCtrl', function($scope, $http, $stateParams){
  bookId = $stateParams.bookId
  userId = window.localStorage['authToken']
  $http.get("http://localhost:3000/books/" + bookId + "/reviews")
  .then(function(response){

    var reviews = response.data.reviews;
    if (reviews.length === 0) {
      $scope.message = "No reviews so far. Add one!"
    } else {
      $scope.message = ""
    }
  })
  // $scope.remove = function(book) {
  //   Books.remove(book);
  // };
})
