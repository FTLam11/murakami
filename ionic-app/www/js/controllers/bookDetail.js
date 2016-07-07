app.controller('BookDetailCtrl', function($scope, $http, $stateParams, Books, $location, $ionicPopup){
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
