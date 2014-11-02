'use strict';

angular.module('users').controller('UsersController', ['$scope', '$stateParams', '$http', '$location', 'Users', 'Answers', 'Questions', 'Authentication',
  function($scope, $stateParams, $http, $location, Users, Answers, Questions, Authentication) {
    $scope.contributions = [];

    // Find existing User
    $scope.findOne = function() {
      $scope.user = Users.get({
        userId: $stateParams.userId
      }, function(user) {
        $scope.findContributions(user._id);
      });
    };

    $scope.findContributions = function(userId) {
      Questions.query(function(questions) {
        questions.forEach(function(question) {
          if (question.user._id == userId) {
            $scope.contributions.push(question);
          }
        });
      });

      Answers.query(function(answers) {
        answers.forEach(function(answer) {
          if (answer.user._id == userId) {
            $scope.contributions.push(answer);
          }
        });
      });
    }
  }
]);
