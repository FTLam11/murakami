app.controller('LoginCtrl', function($state, $ionicPopup, $scope, $http) {
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
  }
})
