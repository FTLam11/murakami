angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $http, Books, $location) {
  $scope.leftSide.src = 'templates/menu.html';
  function ContentController($scope, $ionicSideMenuDelegate) {
    $scope.toggleLeft = function() {
      $ionicSideMenuDelegate.toggleLeft();
    };
  }


  userId = window.localStorage['authToken']
  $http.get("https://tranquil-tundra-32569.herokuapp.com/users/" + userId + "/current")
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

    $http.get("https://tranquil-tundra-32569.herokuapp.com/books/" + bookId + '/chapters')
    .then(function(response){
      var chapterStart = response.data.first_chapter.id
      var chapterEnd = response.data.last_chapter.id
      $location.path("/tab/books/" + bookId + "/chapters/" + chapterStart)
    })
  }

})

.controller('QueueCtrl', function($scope, $http, Books, $stateParams){
  if ($stateParams.userId === null ){
    userId = window.localStorage['authToken']
  }else{
    userId = $stateParams.bookId
  }
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

.controller('CurrentBookCtrl', function($scope, $http, Books, $location, $stateParams){
  console.log($stateParams.userId)
  if ($stateParams.userId === null ){
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


.controller('HistoryCtrl', function($scope, $http, $stateParams){
  if ($stateParams.userId === null ){
    userId = window.localStorage['authToken']
  }else{
    userId = $stateParams.bookId
  }

  $http.get('https://tranquil-tundra-32569.herokuapp.com/users/' + userId + '/history').then(function(response){
    $scope.books = response.data.history_books
    if ($scope.books === null){
      $scope.message = "No Books in your History Yet! Add some!"
    }
  })
})


.controller('UserReviewCtrl', function($scope, $http, $stateParams){
  if ($stateParams.userId === null ){
    userId = window.localStorage['authToken']
  }else{
    userId = $stateParams.bookId
  }
  $http.get('https://tranquil-tundra-32569.herokuapp.com/users/' + userId + '/reviews')
  .then(function(response){
    console.log(response)
    $scope.reviews = response.data.reviews
    if ($scope.reviews.length < 0){
      $scope.message = "No user reviews. Add some!"
    }
  })
})

.controller('FavoriteCtrl', function($scope, $http, $stateParams){
  if ($stateParams.userId === null ){
    userId = window.localStorage['authToken']
  }else{
    userId = $stateParams.bookId
  }

  $http.get('https://tranquil-tundra-32569.herokuapp.com/users/' + userId + '/favorite')
  .then(function(response){
    $scope.books = response.data.favorite_books
    if ($scope.books === null){
      $scope.message = "No Books in your Favorites Yet! Add one!"
    }
  })
})


.controller('SocialCtrl', function($scope, $http, $ionicPopup, $location) {
  $http.get('https://tranquil-tundra-32569.herokuapp.com/users')
  .then(function(response){
    $scope.resultsArray = response.data.users
    console.log($scope.resultsArray)
  })

  $scope.showPopup = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Don\'t eat that!',
      template: 'It might taste good'
    });

    alertPopup.then(function(res) {
      console.log('Thank you for not eating my delicious ice cream cone');
    });
  }

    $scope.data = {};

  $scope.search = function() {
    var query = $scope.data.username
    console.log($scope)
    $http.get('https://tranquil-tundra-32569.herokuapp.com/users/search?user_name=' + query).then(function(response) {
      console.log(response)
      if (response.data.user === null){
        $scope.showPopup()
      }else{
        console.log("hello")
        userId = response.data.user.id
        console.log(userId)
        $location.path("/tab/users/" + userId)
      }
    })
  }


  // $scope.find = function(){
  //   var query = .search
  //   $http.get('https://www.googleapis.com/books/v1/volumes?q=' + query)
  //   .then(function(response){
  //     $scope.resultsArray = response.data.items
  //   })
  // }
})

.controller('AccountCtrl', function($scope, $http, Books, $location, $stateParams) {
  $scope.leftSide.src = 'templates/menu.html';
  var data = window.localStorage['authToken']

  $http({
    method: 'GET',
    url: 'https://tranquil-tundra-32569.herokuapp.com/users/' + data,
  }).then(function(response){
    $scope.user = response
    var userId = window.localStorage['authToken']
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

.controller('UserCtrl', function($scope, $http, Books, $location, $stateParams) {
  $scope.leftSide.src = 'templates/menu.html';
  // console.log($stateParams)
  var userId = $stateParams.userId

  $http({
    method: 'GET',
    url: 'https://tranquil-tundra-32569.herokuapp.com/users/' + userId,
  }).then(function(response){
    $scope.user = response
    console.log(response)
  })

  $scope.settings = {
    enableFriends: true
  };

  $scope.sendToCurrent = function(){
    $location.path("/tab/users/" + userId + "/books")
  }

   $scope.sendToQueue = function(){
    $location.path("/tab/users/" + userId + "/queue")
  }

   $scope.sendToHistory = function(){
    $location.path("/tab/users/" + userId + "/history")
  }

   $scope.sendToFavorites = function(){
    $location.path("/tab/users/" + userId + "/favorites")
  }

   $scope.sendToReviews = function(){
    $location.path("/tab/users/" + userId + "/reviews")
  }


})

.controller('ChapterCtrl', function(SideMenuSwitcher,$scope, $http, $stateParams,$location, Books) {

  $scope.leftSide.src = 'templates/chapter-menu.html';
  $http.get("https://tranquil-tundra-32569.herokuapp.com/chapters/" + $stateParams.chapterId + "/reactions")
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

  $http.get("https://tranquil-tundra-32569.herokuapp.com/books/" + $stateParams.bookId + '/chapters')
    .then(function(response){
      // console.log(response)
      $scope.bookId = response.data.first_chapter.book_id
      $scope.chapterStart = response.data.first_chapter.id
      $scope.chapterEnd = response.data.last_chapter.id
      $scope.currentChapter = $stateParams.chapterId - $scope.chapterStart + 1
      var chapterCount = $scope.chapterEnd - $scope.chapterStart
      $scope.items.splice(0, $scope.items.length)

      for (var i = 0; i < (chapterCount + 1); i++){
        $scope.items.push({bookId: $stateParams.bookId, chapterNumber: (i + 1), chapterId: ($scope.chapterStart + i)})
      }

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
      url: 'https://tranquil-tundra-32569.herokuapp.com/chapters/'+ $stateParams.chapterId +'/reactions',
      dataType: "json",
      data: jsonData
    }).then(function(response){
      console.log(response)
      $scope.reactions.push(response.data)
      $scope.reactionText = "";
    })
  }



  $scope.seeComments = function(reaction_id){
    chapterId = $stateParams.chapterId
    reactionId = reaction_id
    $location.path("tab/chapters/" + chapterId + "/reactions/" + reactionId)
  }

})

.controller('BookDetailCtrl', function($scope, $http, $stateParams, Books, $location, $ionicPopup){
  userId = window.localStorage['authToken']

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


 $http.get("https://tranquil-tundra-32569.herokuapp.com/users/" + userId  + '/current')
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
    $http.get("https://tranquil-tundra-32569.herokuapp.com/users/" + userId  + '/favorite')
    .then(function(response){
       var favorites = response.data.favorite_books
       var result = false
      favorites.forEach(function(book){
        if(book.id === parseInt($stateParams.bookId)){
          result = true
        }
      })
      return (result ? true : false)
    })
  }
    if ($scope.isFavorite() === true){
      $('#favoriteIcon').removeClass("favoriteIconInactive")
      $('#favoriteIcon').addClass("favoriteIconActive")
    }else{
      $('#favoriteIcon').removeClass("favoriteIconActive")
      $('#favoriteIcon').addClass("favoriteIconInactive")
    }


  $scope.viewChapter = function() {
    $http.get("https://tranquil-tundra-32569.herokuapp.com/books/" + $stateParams.bookId + '/chapters')
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

    if (/^\d+$/.test($stateParams.bookId)) {
      $scope.BookReq($scope.data.chapters, $scope)
    }
    else{
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
      url: 'https://tranquil-tundra-32569.herokuapp.com/users/'+userId+'/add_to_queue',
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
      url: 'https://tranquil-tundra-32569.herokuapp.com/users/'+userId+'/add_to_favorites',
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

.controller('LoginCtrl', function($scope, $ionicPopup, $state, $http) {
    $scope.data = {};

    $scope.login = function() {

    var userData = $scope.data;
    var jsonData = JSON.stringify(userData);
    $http({
      method: 'POST',
      url: 'https://tranquil-tundra-32569.herokuapp.com/login',
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
      url: 'https://tranquil-tundra-32569.herokuapp.com/register',
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

  function ContentController($scope, $ionicSideMenuDelegate) {
    $scope.toggleLeft = function() {
      $ionicSideMenuDelegate.toggleLeft();
    };
  }

  $http.get("https://tranquil-tundra-32569.herokuapp.com/reactions/" + $stateParams.reactionId + "/comments")
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
        url: 'https://tranquil-tundra-32569.herokuapp.com/reactions/'+ $stateParams.reactionId +'/comments',
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
  $http.get("https://tranquil-tundra-32569.herokuapp.com/books/" + bookId + "/reviews")
  .then(function(response){
    // console.log(response)
    $scope.reviews = response.data.reviews;
    console.log($scope.reviews)
    if ($scope.reviews.length === 0) {
      $scope.message = "No reviews so far. Add one!"
    } else {
      $scope.message = ""
    }
  })



  $scope.submitReview = function() {
    // $scope.reviews = []
    var newReview = {content: $scope.reviewText, user_id: window.localStorage['authToken'], book_id:$stateParams.bookId, rating: $scope.rating};

      var jsonData = JSON.stringify(newReview);

      $http({
        method: 'POST',
        url: 'https://tranquil-tundra-32569.herokuapp.com/books/' + $stateParams.bookId + '/reviews',
        dataType: "json",
        data: jsonData
      }).then(function(response){
        $scope.reviews.push(response.data)
        // $location.path('/tab/books/' + $stateParams.bookId + '/reviews')
        $scope.reviewText = "";

      })
  }
})


.controller('TabCtrl', function($window,$scope, $location,SideMenuSwitcher){
  $scope.send = function(path){
    if (path === "current") {
    $location.path("/tab/books")
  } else if (path === "queue") {
    $location.path("/tab/queue")
  } else if (path === "history") {
    $location.path("/tab/history")
  } else if (path === "favorites") {
    $location.path("/tab/favorites")
  } else if (path === "user-review") {
    $location.path("/tab/user-review")
  }
  }

  $scope.sendChapter = function(bookId, chapterId){
    $location.path("/tab/books/" + bookId + "/chapters/" + chapterId)
  }

  $scope.items = []
  $scope.leftSide = SideMenuSwitcher.leftSide;



})
