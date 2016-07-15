app.controller('BookReviewCtrl', function($scope, $http, $stateParams, $location){
  bookId = $stateParams.bookId
  userId = window.localStorage['authToken']
  
  $http.get("https://tranquil-tundra-32569.herokuapp.com/books/" + bookId + "/reviews")
  .then(function(response){
    $scope.reviews = response.data.reviews;
    if ($scope.reviews.length === 0) {
      $scope.message = "No reviews so far. Add one!"
    } else {
      $scope.message = ""
    }
  })

  $scope.submitReview = function() {

    $http.get("https://tranquil-tundra-32569.herokuapp.com/books/" + $stateParams.bookId)
    .then(function(response){
      var title = response.data.book.title;
      var newReview = {content: $scope.reviewText, user_id: window.localStorage['authToken'], book_id: $stateParams.bookId, rating: $scope.rating, book_title: title};
      var jsonData = JSON.stringify(newReview);
        $http({
        method: 'POST',
        url: 'https://tranquil-tundra-32569.herokuapp.com/books/' + $stateParams.bookId + '/reviews',
        dataType: "json",
        data: jsonData
      }).then(function(response){
        $scope.reviews.push(response.data)
        $scope.message = ""
        $scope.reviewText = ""
      })
    })
  }
})
