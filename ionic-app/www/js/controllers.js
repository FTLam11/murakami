angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $http, Books, $location) {
  userId = window.localStorage['authToken']
  $http.get("http://localhost:3000/users/" + userId + "/current")
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
    $http.get("http://localhost:3000/books/" + bookId + '/chapters')
    .then(function(response){
      var chapterStart = response.data.first_chapter.id
      var chapterEnd = response.data.last_chapter.id
      $location.path("/tab/books/" + bookId + "/chapters/" + chapterStart)
    })
  }

})

.controller('QueueCtrl', function($scope, $http, Books){
  userId = window.localStorage['authToken']
  $http.get("http://localhost:3000/users/" + userId + '/queue')
  .then(function(response){
    var queueBooks = response.data.queue_books;
    Books.add(queueBooks,"queue")
    $scope.books = queueBooks

    if ($scope.books.length === 0){
      $scope.message = "No Books in Your Queue Yet! Add one!"
    }
  })
})

.controller('CurrentBookCtrl', function($scope, $http, Books, $location){
  userId = window.localStorage['authToken']

  $http.get("http://localhost:3000/users/" + userId + "/current")
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


.controller('HistoryCtrl', function($scope, $http){
  userId = window.localStorage['authToken']
  $http.get('http://localhost:3000/users/' + userId + '/history').then(function(response){
    $scope.books = response.data.history_books
    if ($scope.books === null){
      $scope.message = "No Books in your History Yet! Add some!"
    }
  })
})


.controller('UserReviewCtrl', function($scope, $http){
  userId = window.localStorage['authToken']
  $http.get('http://localhost:3000/users/' + userId + '/reviews')
  .then(function(response){
    $scope.reviews = response.data.reviews
    if ($scope.reviews.length < 0){
      $scope.message = "No user reviews. Add some!"
    }
  })
})

.controller('FavoriteCtrl', function($scope, $http){
  userId = window.localStorage['authToken']
  $http.get('http://localhost:3000/users/' + userId + '/favorite')
  .then(function(response){
    $scope.books = response.data.favorite_books
    if ($scope.books === null){
      $scope.message = "No Books in your Favorites Yet! Add one!"
    }
  })
})

.controller('AccountCtrl', function($scope, $http, Books, $location) {
  var data =  window.localStorage['authToken']

  $http({
    method: 'GET',
    url: 'http://localhost:3000/users/' + data,
  }).then(function(response){
    $scope.user = response
  })

  $scope.settings = {
    enableFriends: true
  };

  $scope.sendToCurrent = function(){
    $location.path("/tab/books")
  }

   $scope.sendToQueue = function(){
    $location.path("/tab/queue")
  }

   $scope.sendToHistory = function(){
    $location.path("/tab/history")
  }

   $scope.sendToFavorites = function(){
    $location.path("/tab/favorites")
  }

   $scope.sendToReviews = function(){
    $location.path("/tab/user-review")
  }
})

.controller('ChapterCtrl', function($scope, $http, $stateParams,$location, Books) {
  $http.get("http://localhost:3000/chapters/" + $stateParams.chapterId + "/reactions")
  .then(function(response){
    var bookId = ($stateParams.bookId);
    $scope.reactions = response.data.reactions;
    $scope.book = response.data.specific_book;
    $scope.reactionText = "";
    var chapterStart = 0;
    var chapterEnd = 0;


    if ($scope.reactions.length === 0){
      $scope.message = "There are no reactions! React!"
    }
  })

  $http.get("http://localhost:3000/books/" + $stateParams.bookId + '/chapters')
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
      url: 'http://localhost:3000/users/' + window.localStorage['authToken'] + '/books/' + $stateParams.bookId + '/mark_complete',
      dataType: "json",
      data: jsonData
    }).then(function(response){
      Books.removeCurrent(response.data.book)
      $location.path('/tab/books/' + response.data.book.id + "/reviews");
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
    var userReaction = {content: $scope.reactionText, user_id: window.localStorage['authToken'], chapter_id: $stateParams.chapterId};
    var jsonData = JSON.stringify(userReaction);

    $http({
      method: 'POST',
      url: 'http://localhost:3000/chapters/'+ $stateParams.chapterId +'/reactions',
      dataType: "json",
      data: jsonData
    }).then(function(response){
      $scope.reactions.push(response.data)
      $scope.reactionText = "";
    })
  }



  $scope.seeComments = function(reaction_id){
    console.log(reaction_id)
    chapterId = $stateParams.chapterId
    reactionId = reaction_id
    $location.path("tab/chapters/" + chapterId + "/reactions/" + reactionId)
  }

})

.controller('BookDetailCtrl', function($scope, $http, $stateParams, Books, $location, $ionicPopup){
  userId = window.localStorage['authToken']

  if (/^\d+$/.test($stateParams.bookId)) {
    $http.get('http://localhost:3000/check_books/' + $stateParams.bookId)
    .then(function(response){
    var book = response.data.book
    $scope.book = {}
    $scope.book.book_id = book.id
    $scope.book.author = book.author
    $scope.book.title = book.title
    $scope.book.image_url = book.image_url
    $scope.book.description = book.description
    $scope.book.page_numbers = book.page_numbers
    $scope.reviewButton = false
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
    $scope.reviewButton = true
    })
  }


 $http.get("http://localhost:3000/users/" + userId  + '/current')
  .then(function(response){
     var items = response.data.current_books
     var isCurrent = false
    items.forEach(function(book){
      if(book.id === parseInt($stateParams.bookId)){
        isCurrent = true
      }
    })
    if (isCurrent){
      $scope.readButton = false
      $scope.startButton = true
    }else{
      $scope.readButton = true
      $scope.startButton = false
    }
  })



  $scope.isFavorite = function() {
    $http.get("http://localhost:3000/users/" + userId  + '/favorite')
    .then(function(response){
      console.log(response)
       var favorites = response.data.favorite_books
       var result = false
      favorites.forEach(function(book){
        if(book.id === parseInt($stateParams.bookId)){
          console.log(book.id)
          console.log($stateParams.bookId)
          result = true
        }
      })
      console.log(result)
      return (result ? true : false)
    })
  }
    if ($scope.isFavorite() === true){
      console.log("FAV")

      $('#favoriteIcon').removeClass("favoriteIconInactive")
      $('#favoriteIcon').addClass("favoriteIconActive")
    }else{
      console.log("NOFAV")
      $('#favoriteIcon').removeClass("favoriteIconActive")
      $('#favoriteIcon').addClass("favoriteIconInactive")
    }



  $scope.viewChapter = function() {
    $http.get("http://localhost:3000/books/" + $stateParams.bookId + '/chapters')
    .then(function(response){
      var chapterStart = response.data.first_chapter.id
      var chapterEnd = response.data.last_chapter.id
      var bookId = $stateParams.bookId
      $location.path("/tab/books/" + bookId + "/chapters/" + chapterStart)
    })
  }

  $scope.favoriteAction = function(){
    var button = document.getElementById("favoriteButton");
    var icon = document.getElementById("favoriteIcon");
    move(icon)
    .ease('in-out')
    .set("color", "red")
    .duration('0.5s')
    .end();
    move(button)
    .ease('in-out')
    .scale(1.3)
    .set("background-color", "#FF7666")
    .duration('0.5s')
    .end();
    setTimeout(function(){
    if ($scope.isFavorite()){
      move(icon)
      .ease('in-out')
      .set("color", "white")
      .duration('0.5s')
      .end();
    }else{
      move(icon)
      .ease('in-out')
      .set("color", "red")
      .duration('0.5s')
      .end();
    }
      move(button)
      .ease('in-out')
      .scale(.9)
      .set("background-color", "#FFC3C3")
      .duration('0.5s')
      .end();
    }, 700)
  };



  $scope.go = function ( path ){
    $location.path( path );
  }

  $scope.start = function() {
    $scope.data = {};

    var myPopup = $ionicPopup.show({
      template: '<input type="text" ng-model="data.chapters">',
      title: 'Enter number of chapters (greater than 0)',
      scope: $scope,
      buttons: [
        { text: 'Cancel' },
        {
          text: '<b>Save</b>',
          type: 'button-positive',
          onTap: function(e) {
            if (!$scope.data.chapters || $scope.data.chapters < 1) {
              e.preventDefault();
            } else {
              $scope.BookReq($scope.data.chapters, $scope)
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
      url: 'http://localhost:3000/users/'+userId+'/books',
      dataType: "json",
      data: jsonData
    }).then(function(response){
      window.localStorage['authToken'] = response.data.token
      if (response.data.book === "dont"){
      }else {
        Books.remove(response.data.book,"queue")
        Books.addOne(response.data.book,"current")
      }
      $location.path("/tab/dash")
    })
  }



  $scope.queue = function() {
    $scope.data = {};
    var bookData = $scope.book
    var userId = window.localStorage['authToken']
    var jsonData = JSON.stringify(bookData)

    $http({
      method: 'POST',
      url: 'http://localhost:3000/users/'+userId+'/add_to_queue',
      dataType: "json",
      data: jsonData})
    .then(function(response){
      Books.addOne(response.data.book, "queue")
      window.localStorage['authToken'] = response.data.token
    })
  }

  $scope.favorite = function() {
    $scope.data = {};
    var bookData = $scope.book
    var userId = window.localStorage['authToken']
    var jsonData = JSON.stringify(bookData)

    $http({
      method: 'POST',
      url: 'http://localhost:3000/users/'+userId+'/add_to_favorites',
      dataType: "json",
      data: jsonData
    }).then(function(response){

      Books.addOne(response.data.book, "favorite")
      window.localStorage['authToken'] = response.data.token
    })
  }


  $scope.review = function() {
    $location.path("/tab/books/" + $stateParams.bookId + "/reviews")
  }


})

.controller('SearchCtrl', function($scope, $http,Books){

  var userId = window.localStorage['authToken']
  $scope.data = {};

  $http.get('http://localhost:3000/users/' + userId + '/recommended').then(function(response){
    var author = response.data.recommendations
    $http.get('https://www.googleapis.com/books/v1/volumes?q=+ inauthor:' + author).then(function(response){
      $scope.books = response.data.items
    })
  })

  $http.get('http://localhost:3000/trending')
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

.controller('LoginCtrl', function($scope, $ionicPopup, $state, $http) {
    $scope.data = {};

    $scope.login = function() {

    var userData = $scope.data;
    var jsonData = JSON.stringify(userData);
    $http({
      method: 'POST',
      url: 'http://localhost:3000/login',
      dataType: "json",
      data: jsonData})
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
      url: 'http://localhost:3000/register',
      dataType: "json",
      data: jsonData})
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

.controller ('ReactionCtrl', function($scope, $http, $stateParams){
  $scope.commentText = ""

  $http.get("http://localhost:3000/reactions/" + $stateParams.reactionId + "/comments")
  .then(function(response){
    $scope.comments = response.data.comments
    $scope.reaction = response.data.reaction
    $scope.username = response.data.username

  })

  $scope.submitComment= function(){
      var userComment = {content: $scope.commentText, user_id: window.localStorage['authToken'], reaction_id: $stateParams.reactionId};

      var jsonData = JSON.stringify(userComment);

      $http({
        method: 'POST',
        url: 'http://localhost:3000/reactions/'+ $stateParams.reactionId +'/comments',
        dataType: "json",
        data: jsonData
      }).then(function(response){
        $scope.comments.push(response.data)
        $scope.commentText = "";
      })

    }

})




.controller('BookReviewCtrl', function($scope, $http, $stateParams, $location){
  bookId = $stateParams.bookId
  userId = window.localStorage['authToken']
  $http.get("http://localhost:3000/books/" + bookId + "/reviews")
  .then(function(response){
    console.log(response)
    $scope.reviews = response.data.reviews;
    if ($scope.reviews.length === 0) {
      $scope.message = "No reviews so far. Add one!"
    } else {
      $scope.message = ""
    }
  })



  $scope.submitReview = function() {
    $scope.reviews = []
    var newReview = {content: $scope.reviewText, user_id: window.localStorage['authToken'], book_id:$stateParams.bookId, rating: $scope.rating};

      var jsonData = JSON.stringify(newReview);

      $http({
        method: 'POST',
        url: 'http://localhost:3000/books/' + $stateParams.bookId + '/reviews',
        dataType: "json",
        data: jsonData
      }).then(function(response){
        console.log(response.data)
        $scope.reviews.push(response.data.book_reviews)
        $location.path('/tab/dash')
      })
  }
})
