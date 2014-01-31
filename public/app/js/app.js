angular.module('myApp', ['myApp.controllers'])
	.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
		$routeProvider
			.when('/:city', 
				{
					controller: 'Gallery',
					templateUrl: 'partials/photos.html'
				})
			.otherwise({ redirectTo: '/sf' });
	}]
);