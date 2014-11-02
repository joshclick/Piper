'use strict';

// Answers controller
angular.module('answers').controller('AnswersController', ['$scope', '$stateParams', '$location', 'Authentication', 'Answers', 'QuestionAnswers', 'Users', 'Votes', 'AnswerVotes',
		function($scope, $stateParams, $location, Authentication, Answers, QuestionAnswers, Users, Votes, AnswerVotes ) {
		$scope.authentication = Authentication;
		$scope.user = Authentication.user;

		// Create new Answer
		$scope.create = function() {
			// Create new Answer object
			var answer = new Answers ({
				content: this.content,
				question: $stateParams.questionId,
			});

			answer.$save(function(response) {
				$scope.findForQuestion();

				// Clear form fields
				$scope.content = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Answer
		$scope.remove = function( answer ) {
			if ( answer ) { answer.$remove();

				for (var i in $scope.answers ) {
					if ($scope.answers [i] === answer ) {
						$scope.answers.splice(i, 1);
					}
				}
			} else {
				$scope.answer.$remove(function() {
					$location.path('answers');
				});
			}
		};

		// Update existing Answer
		$scope.update = function() {
			var answer = $scope.answer ;

			answer.$update(function() {
				$location.path('answers/' + answer._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Answers
		$scope.find = function() {
			$scope.answers = Answers.query();
		};

		// Find existing Answer
		$scope.findOne = function() {
			$scope.answer = Answers.get({
				answerId: $stateParams.answerId
			});
		};

		$scope.findForQuestion = function() {
			$scope.answers = QuestionAnswers.query({
				questionId: $stateParams.questionId
			}, function(answers) {
				answers.forEach(function(answer, i) {
					answer.votes = $scope.findVotes(answer._id);
				});
			});
		};

		$scope.addPoints = function() {
			var answer = $scope.answer;

			if ($scope.user.points > 10) {
				answer.points += 10;
				$scope.user.points -= 10;
			}

			answer.$update(function() {
				$location.path('answers/' + answer._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.findVotes = function(answerId) {
			return AnswerVotes.query({
				answerId: answerId
			}, function(votes) {
				$scope.myVote = votes.filter(function(vote) {
					return vote.user.username === $scope.user.username;
				});
			});
		};

		$scope.vote = function(answerId) {
			var answer = $scope.answers.filter(function(answer) {
				return answer._id === answerId;
			})[0];

			// Create new Vote object
			var vote = new Votes ({
				answer: answer._id
			});

			vote.$save(function(response) {
				$scope.findVotes(response.answer);

				var user = new Users(answer.user);
				user.acquiredVotes++;
				user.$update(function(response) {
					$scope.findForQuestion();
				});

			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
	}
]);
