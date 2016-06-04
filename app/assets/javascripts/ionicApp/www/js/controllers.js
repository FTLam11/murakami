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

.controller('BookDetailCtrl', function($scope, $stateParams ,Books){
  $scope.book = Books.get($stateParams.bookId);
})

.controller('SearchCtrl', function($scope, Books){
  $scope.books = Books.all();
  $scope.remove = function(book) {
    Books.remove(book);
  };

  $scope.searchList = function($scope, $stateParams){
    console.log($scope)

    // var request = $.ajax({
    //   url: 'https://www.googleapis.com/books/v1/volumes?q=' + query
    // })
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

.controller('RegisterCtrl', function($scope, $location){
  $scope.data = {};

  $scope.register = function(){
    console.log($scope.data)
    $location.path('/tab/dash')
  var request = {
    method: 'POST',
    url: '#',
    dataType: "json",
    data: $scope.data
  }

  }
})

