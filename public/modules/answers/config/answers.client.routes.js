'use strict';

//Setting up route
angular.module('answers').config(['$stateProvider',
	function($stateProvider) {
		// Answers state routing
		$stateProvider.
		state('createAnswer', {
			url: '/answers/create',
			templateUrl: 'modules/answers/views/create-answer.client.view.html'
		}).
		state('editAnswer', {
			url: '/answers/:answerId/edit',
			templateUrl: 'modules/answers/views/edit-answer.client.view.html'
		});
	}
]);
