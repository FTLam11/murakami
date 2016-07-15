app.controller('TabCtrl', function($window,$scope, $location,SideMenuSwitcher){
  $scope.send = function(path){
    if (path === "current") {
    $location.path("/tab/books")
  } else {
    $location.path("/tab/" + path)
  }
}
  $scope.sendChapter = function(bookId, chapterId){
    $location.path("/tab/books/" + bookId + "/chapters/" + chapterId)
  }
    $scope.leftSide = SideMenuSwitcher.leftSide;
})
