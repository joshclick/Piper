'use strict';

//Answers service used to communicate Answers REST endpoints
angular.module('answers')
	.factory('Answers', ['$resource',
		function($resource) {
			return $resource('answers/:answerId',
				{ answerId: '@_id' },
				{ update:
					{ method: 'PUT' }
				}
			);
		}
	])

	.factory('QuestionAnswers', ['$resource',
		function($resource) {
			return $resource('/questions/:questionId/answers',
				{ questionId: '@_id' }
			);
		}
	]);
