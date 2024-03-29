'use strict';

//Votes service used to communicate Votes REST endpoints
angular.module('votes')
  .factory('Votes', ['$resource',
  	function($resource) {
  		return $resource('votes/:voteId', { voteId: '@_id'
  		}, {
  			update: {
  				method: 'PUT'
  			}
  		});
  	}
  ])

  .factory('AnswerVotes', ['$resource',
    function($resource) {
      return $resource('/answers/:answerId/votes',
        { answerId: '@_id' }
      );
    }
  ]);
