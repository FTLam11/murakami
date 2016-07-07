app.controller('BookReviewCtrl', function($scope, $http, $stateParams, $location){
  bookId = $stateParams.bookId
  userId = window.localStorage['authToken']
  $http.get("http://localhost:3000/books/" + bookId + "/reviews")
  .then(function(response){
    $scope.reviews = response.data.reviews;
    console.log($scope.reviews)
    if ($scope.reviews.length === 0) {
      $scope.message = "No reviews so far. Add one!"
    } else {
      $scope.message = ""
    }
  })



  $scope.submitReview = function() {

    $http.get("http://localhost:3000/books/" + $stateParams.bookId)
    .then(function(response){
      var title = response.data.book.title;
      console.log(title)
      var newReview = {content: $scope.reviewText, user_id: window.localStorage['authToken'], book_id: $stateParams.bookId, rating: $scope.rating, book_title: title};
      var jsonData = JSON.stringify(newReview);
        $http({
        method: 'POST',
        url: 'http://localhost:3000/books/' + $stateParams.bookId + '/reviews',
        dataType: "json",
        data: jsonData
      }).then(function(response){
        $scope.reviews.push(response.data)
        $scope.message = ""
        $scope.reviewText = ""
      })
    })


    // $scope.reviews = []



  }
})
