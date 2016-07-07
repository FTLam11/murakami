app.controller('ChapterCtrl', function(SideMenuSwitcher,$scope, $http, $stateParams,$location, Books) {

  $scope.leftSide.src = 'templates/chapter-menu.html';
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

      $scope.firstChapter = false
      $scope.lastChapter = false
      $scope.lastChapterButton = true

      if (chapterId === $scope.chapterStart) {
        $scope.firstChapter = true
      }else if(chapterId === $scope.chapterEnd) {
        $scope.lastChapter = true
        $scope.lastChapterButton = false
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

  $scope.changeChapter = function(num) {
      bookId = $stateParams.bookId
      nextChapterNum = parseInt($stateParams.chapterId) + num
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
