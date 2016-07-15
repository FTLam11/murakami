app.controller('QueueCtrl', function($scope, $http, Books, $stateParams){
  if (typeof($stateParams.userId) === 'undefined' ){
    userId = window.localStorage['authToken']
  }else{
    userId = $stateParams.userId
  }
  $http.get("http://tranquil-tundra-32569.herokuapp.com/users/" + userId + '/queue')
  .then(function(response){
    var queueBooks = response.data.queue_books;
    Books.add(queueBooks,"queue")
    $scope.books = queueBooks

    if ($scope.books.length === 0){
      $scope.message = "No Books in Your Queue Yet! Add one!"
    }
  })
})
