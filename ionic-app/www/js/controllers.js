angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $http, Books) {
  userId = window.localStorage['authToken']
  $http.get("https://tranquil-tundra-32569.herokuapp.com/users/" + userId + "/current")
  .then(function(response){
    var currentBooks = response.data.current_books;
    Books.add(currentBooks,"current")
    $scope.books = Books.all("current");
    console.log('The call to server occurs only after login page')
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
  $http.get("https://tranquil-tundra-32569.herokuapp.com/users/" + userId + '/queue')
  .then(function(response){
    var queueBooks = response.data.queue_books;
    Books.add(queueBooks,"queue")
    $scope.books = queueBooks

    if ($scope.books.length === 0){
      $scope.message = "No Books in Your Queue Yet! Add one!"
    }
  })
})


.controller('HistoryCtrl', function($scope, $http){
  userId = window.localStorage['authToken']
  $http.get('https://tranquil-tundra-32569.herokuapp.com/users/' + userId + '/history').then(function(response){
    $scope.books = response.data.history_books
    if ($scope.books === null){
      $scope.message = "No Books in your History Yet! Add some!"
    }
  })
})


.controller('UserReviewCtrl', function($scope, $http){
  userId = window.localStorage['authToken']
  $http.get('https://tranquil-tundra-32569.herokuapp.com/users/' + userId + '/reviews').then(function(response){
    $scope.reviews = response.data.reviews
    if ($scope.reviews.length < 0){
      $scope.message = "No user reviews. Add some!"
    }
  })
})

.controller('FavoriteCtrl', function($scope, $http){
  userId = window.localStorage['authToken']
  $http.get('https://tranquil-tundra-32569.herokuapp.com/users/' + userId + '/favorite').then(function(response){
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
    $http({
      method: 'GET',
      url: 'https://tranquil-tundra-32569.herokuapp.com/users/' + data,
    }).then(function(response){
      $scope.user = response
    })

})

.controller('ChapterCtrl', function($scope, $http, $stateParams,$location) {
  $http.get("https://tranquil-tundra-32569.herokuapp.com/chapters/" + $stateParams.chapterId + "/reactions")
  .then(function(response){
    var bookId = ($stateParams.bookId);
    $scope.reactions = response.data.reactions;
    $scope.users = response.data.users;
    $scope.book = response.data.specific_book;
    $scope.reactionText = "";
    var chapterStart = 0;
    var chapterEnd = 0;


    if ($scope.reactions === null){
      $scope.message = "There are no reactions! React!"
    }
  })

  $http.get("https://tranquil-tundra-32569.herokuapp.com/books/" + $stateParams.bookId + '/chapters')
    .then(function(response){
      $scope.chapterStart = response.data.first_chapter.id
      $scope.chapterEnd = response.data.last_chapter.id
      chapterId = parseInt($stateParams.chapterId)
      if (chapterId === $scope.chapterStart) {
        $scope.firstChapter = true
        $scope.lastChapter = false
        $scope.lastChapterButton = true
      }else if(chapterId === $scope.chapterEnd) {
        $scope.firstChapter = false
        $scope.lastChapter = true
        $scope.lastChapterButton = false
      }else{
        $scope.firstChapter = false
        $scope.lastChapter = false
        $scope.lastChapterButton = true
      }
    })

    $scope.markComplete = function() {
      var params = {queue: false, current: false, complete: true}
      var jsonData = JSON.stringify(params);

      $http({
        method: 'POST',
        url: 'https://tranquil-tundra-32569.herokuapp.com/users/' + window.localStorage['authToken'] + '/books/' + $stateParams.bookId + '/mark_complete',
        dataType: "json",
        data: jsonData
      }).then(function(response){
        $location.path('/tab/dash');
      })
    }


  $scope.nextChapter = function() {
    bookId = $stateParams.bookId
    nextChapterNum = parseInt($stateParams.chapterId) + 1
    $location.path("/tab/books/" + bookId + "/chapters/" + nextChapterNum)
  }

  $scope.backChapter = function() {
    bookId = $stateParams.bookId
    nextChapterNum = parseInt($stateParams.chapterId) - 1
    $location.path("/tab/books/" + bookId + "/chapters/" + nextChapterNum)
  }

   $scope.submitReaction = function(){
      var userReaction = {content: $scope.reactionText, user:id = window.localStorage['authToken'], chapter_id: $stateParams.chapterId};

      var jsonData = JSON.stringify(userReaction);

      $http({
        method: 'POST',
        url: 'https://tranquil-tundra-32569.herokuapp.com/chapters/'+ $stateParams.chapterId +'/reactions',
        dataType: "json",
        data: jsonData
      }).then(function(response){
         location.reload();
         // COME BACK AND AJAX NEW RESPONSE
      })

    }
})

.controller('BookDetailCtrl', function($scope, $http, $stateParams, Books, $location, $ionicPopup){
  userId = window.localStorage['authToken']

  $scope.viewChapter = function() {
    $http.get("https://tranquil-tundra-32569.herokuapp.com/books/" + $stateParams.bookId + '/chapters')
    .then(function(response){
      var chapterStart = response.data.first_chapter.id
      var chapterEnd = response.data.last_chapter.id
      var bookId = $stateParams.bookId
      $location.path("/tab/books/" + bookId + "/chapters/" + chapterStart)
    })
  }

  if (/^\d+$/.test($stateParams.bookId)) {
    $http.get('https://tranquil-tundra-32569.herokuapp.com/check_books/' + $stateParams.bookId)
    .then(function(response){
    var book = response.data.book
    $scope.book = {}
    $scope.book.book_id = book.id
    $scope.book.author = book.author
    $scope.book.title = book.title
    $scope.book.image_url = book.image_url
    $scope.book.description = book.description
    $scope.book.page_numbers = book.page_numbers
    })
  } else {
    $http.get('https://www.googleapis.com/books/v1/volumes?q=' + $stateParams.bookId)
    .then(function(response){
    var book = response.data.items[0]
    $scope.book = {}
    $scope.book.author = book.volumeInfo.authors[0]
    $scope.book.title = book.volumeInfo.title
    $scope.book.description = book.volumeInfo.description
    $scope.book.image_url = book.volumeInfo.imageLinks.thumbnail
    $scope.book.page_numbers = book.volumeInfo.pageCount
    $scope.book.publishedDate = book.volumeInfo.publishedDate

    $scope.data = {}
    if (Books.checkBook($scope.book,"current") === true){
      $scope.data.hide = true
    } else {
      $scope.data.hide = false
    }

    })
  }


  $scope.go = function ( path ){
    $location.path( path );
  }

  $scope.start = function() {
    $scope.data = {};

    var myPopup = $ionicPopup.show({
      template: '<input type="text" ng-model="data.chapters">',
      title: 'Enter number of chapters',
      subTitle: 'This is for Current',
      scope: $scope,
      buttons: [
        { text: 'Cancel' },
        {
          text: '<b>Save</b>',
          type: 'button-positive',
          onTap: function(e) {
            if (!$scope.data.chapters) {
              //don't allow the user to close unless he enters wifi password
              e.preventDefault();
            } else {
              $scope.BookReq($scope.data.chapters, $scope)
              $scope.viewChapter()
            }
          }
        }
      ]
    })
  }

  $scope.BookReq = function(chapter_number, $scope) {
    var bookData = $scope.book
    bookData.chapter_count = parseInt(chapter_number)
    var userId = window.localStorage['authToken']
    var jsonData = JSON.stringify(bookData)

  $http({
    method: 'POST',
    url: 'https://tranquil-tundra-32569.herokuapp.com/users/'+userId+'/books',
    dataType: "json",
    data: jsonData
  }).then(function(response){
    window.localStorage['authToken'] = response.data.token
    if (response.data.book === "dont"){
  }else {
    Books.remove(response.data.book,"queue")
    Books.addOne(response.data.book,"current")
  }
  })

  // $http.get("https://tranquil-tundra-32569.herokuapp.com/users/" + userId + "/current")
  // .then(function(response){
  //   var currentBooks = response.data.current_books;
  //   $scope.books = currentBooks;
  //   console.log('The call to server occurs only after login page')
  //   console.log(currentBooks);
  //   if (currentBooks.length === 0) {
  //     $scope.message = "Go to search and add books."
  //   } else {
  //     $scope.message = ""
  //   }
  // })

  // window.location.reload(true)

    $location.path('/tab/dash')

  }



  $scope.queue = function() {
    $scope.data = {};
    var bookData = $scope.book
    var userId = window.localStorage['authToken']
    var jsonData = JSON.stringify(bookData)

    $http({
      method: 'POST',
      url: 'https://tranquil-tundra-32569.herokuapp.com/users/'+userId+'/add_to_queue',
      dataType: "json",
      data: jsonData
    }).then(function(response){

      Books.addOne(response.data.book, "queue")
      window.localStorage['authToken'] = response.data.token

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

.controller('LoginCtrl', function($scope, $ionicPopup, $state, $http) {
    $scope.data = {};

    $scope.login = function() {

    var userData = $scope.data;
    var jsonData = JSON.stringify(userData);
    $http({
      method: 'POST',
      url: 'https://tranquil-tundra-32569.herokuapp.com/login',
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

.controller('RegisterCtrl', function($state, $ionicPopup, $scope, $location, $http){
  $scope.data = {};

  $scope.register = function(){

    var userData = $scope.data;
    var jsonData = JSON.stringify(userData);

    $http({
      method: 'POST',
      url: 'https://tranquil-tundra-32569.herokuapp.com/register',
      dataType: "json",
      data: jsonData
    })

    .then(function(response){
      var errorMessages = response.data.error_messages
      window.localStorage['authToken'] = response.data.token

      if (errorMessages.length > 0){
        var alertPopup = $ionicPopup.alert({
          title: "Registration Failed",
          template: errorMessages[0]
        })
      } else {
        $state.go('tab.dash')
      }
    })
  }
})

.controller('ReviewCtrl', function($scope, $http, $stateParams){
  bookId = $stateParams.bookId
  userId = window.localStorage['authToken']
  $http.get("https://tranquil-tundra-32569.herokuapp.com/books/" + bookId + "/reviews")
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
