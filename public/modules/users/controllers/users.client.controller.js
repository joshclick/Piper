'use strict';

angular.module('users').controller('UsersController', ['$scope', '$stateParams', '$http', '$location', 'Users', 'Authentication',
  function($scope, $stateParams, $http, $location, Users, Authentication) {
    // Find existing User
    $scope.findOne = function() {
      $scope.user = Users.get({
        userId: $stateParams.userId
      });
    };
  }
]);
