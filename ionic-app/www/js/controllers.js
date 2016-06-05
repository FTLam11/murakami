angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, Books) {

  $scope.books = Books.all();
  $scope.remove = function(book) {
    Books.remove(book);
  };
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('BookDiscussCtrl', function($scope, $http, $stateParams, Books) {
  $scope.book = Books.get($stateParams.bookId)
})

.controller('BookDetailCtrl', function($scope, $http, $stateParams, Books){
  if ($stateParams.bookId < 100) {
    var book = Books.get($stateParams.bookId);
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

.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state) {
    $scope.data = {};

    $scope.login = function() {
      var request = {
        method: 'POST',
        url: '#',
        dataType: "json",
        data: $scope.data
      }

      request.success(function(data) {

            $state.go('tab.dash');
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
            });
        });
    }

    $scope.register = function() {
      $location.path("#/register");
    }
})

.controller('RegisterCtrl', function($scope, $location, $http){
  $scope.data = {};

  $scope.register = function(){
    var userData = $scope.data
    var jsonData = JSON.stringify(userData)
    console.log(jsonData)
    $location.path('/tab/dash')
  $http({
    method: 'POST',
    url: 'http://tranquil-tundra-32569.herokuapp.com/register',
    dataType: "json",
    data: jsonData
  }).then(function(response){
  console.log("success")
  })
  }
  })

