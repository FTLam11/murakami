app.controller ('ReactionCtrl', function($scope, $http, $stateParams){
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
