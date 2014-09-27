'use strict';

// Votes controller
angular.module('votes').controller('VotesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Votes', 'AnswerVotes',
	function($scope, $stateParams, $location, Authentication, Votes, AnswerVotes ) {
		$scope.authentication = Authentication;

		// Create new Vote
		$scope.create = function() {
			// Create new Vote object
			var vote = new Votes ({
				answer: this.answer._id
			});

			vote.$save(function(response) {
				$scope.findFor(response.answer)

			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Vote
		$scope.remove = function( vote ) {
			if ( vote ) { vote.$remove();

				for (var i in $scope.votes ) {
					if ($scope.votes [i] === vote ) {
						$scope.votes.splice(i, 1);
					}
				}
			} else {
				$scope.vote.$remove(function() {
					$location.path('votes');
				});
			}
		};

		// Update existing Vote
		$scope.update = function() {
			var vote = $scope.vote ;

			vote.$update(function() {
				$location.path('votes/' + vote._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Votes
		$scope.find = function() {
			$scope.votes = Votes.query();
		};

		// Find existing Vote
		$scope.findOne = function() {
			$scope.vote = Votes.get({
				voteId: $stateParams.voteId
			});
		};

		$scope.findFor = function(answerId) {
			$scope.votes = AnswerVotes.query({
				answerId: answerId
			});
		};
	}
]);
