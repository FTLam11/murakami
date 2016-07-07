app.controller('RegisterCtrl', function($state, $ionicPopup, $scope, $location, $http){
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
