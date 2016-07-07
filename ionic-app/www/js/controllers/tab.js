app.controller('TabCtrl', function($window,$scope, $location,SideMenuSwitcher){
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
