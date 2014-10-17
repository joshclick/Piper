'use strict';

// Votes controller
angular.module('votes').controller('VotesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Votes', 'AnswerVotes', 'Users',
	function($scope, $stateParams, $location, Authentication, Votes, AnswerVotes, Users ) {
		$scope.authentication = Authentication;
		$scope.user = Authentication.user;

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
	}
]);
