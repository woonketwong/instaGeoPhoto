angular.module('myApp.controllers', [])
	.controller('Gallery', function ($scope, $http, $timeout, $route, $location) {
		$scope.cities = [
			{name: 'San Francisco', city: 'sf', lat: '37.7750', lng: '122.4183'},
			{name: 'Los Angeles', city: 'la', lat: '34.0522', lng: '118.2428'},
			{name: 'New York', city: 'ny', lat: '40.7142', lng: '74.0064'},
			{name: 'Las Vegas', city: 'lv', lat: '36.0800', lng: '115.1522'}
		];
    $scope.caption = "Show Caption";

		var body = $("body");
    
    // remove animation class once its execution is completed
		$("body").on("animationEnd webkitAnimationEnd oAnimationEnd",
	    function(e) {
        $(e.target).removeClass("rotate slideRight pulse");
	    }
		);

		// Function to fetch images from Instagram
		$scope.fetchImages = function() {
			body.addClass('loading');

			if (!$route.current) {
				$location.path('/' + $scope.city);
			} else if (angular.isDefined($route.current.params.city)) {
				$scope.city = $route.current.params.city;
				if (!findProperty($scope.cities, 'city', $scope.city, 'city')) {
					$location.path('/sf');
				}
			}
			
			var api = document.URL.match(/.+?(?=#)/) + 'instasearch';

	    $http({
	    	method: "GET",
	    	url: api,
	    	params: {lat: findProperty($scope.cities, 'city', $scope.city, 'lat'), 
	    					 lng: findProperty($scope.cities, 'city', $scope.city, 'lng')
	    					}
	    })
	    .success(function(data, status, headers, config){
				$scope.images = data.data;
				$timeout($scope.stack);
	    })
	    .error(function(data, status, headers, config){
	    	console.log("http request fails");
	    	$scope.response = "Request Error!";
	    	// On error, try again to fetch images after a short delay
				$timeout($scope.fetchImages, 2000);
	    });
		}

		// Fetch images
		$timeout($scope.fetchImages);

		// Update city on select change
		$scope.cityChange = function() {
			$location.path('/' + $scope.city);
			// Fetch images
			$timeout($scope.fetchImages);
		};

		// Function for showing caption
		$scope.showCaption = function() {
			var photo = $(".meta");
			photo.each(function() {
				if ($(this).hasClass('displayNone')){
					$scope.caption = "Hide Caption";
					$(this).removeClass("displayNone");
				} else {
					$(this).addClass('displayNone');
					$scope.caption = "Show Caption";
				}
			});
			$scope.stack(60);
		}

		// Function for rotate
		$scope.rotate = function() {
			var photo = $(".photo");
			photo.each(function() {
				$(this).removeClass("pulse");
				$(this).addClass('rotate');
			});
		}

		// Function for pulse
		$scope.pulse = function() {
			var photo = $(".photo");
			photo.each(function() {
				if ($(this).hasClass('pulse')){
					$(this).removeClass('pulse');
				} else {
					$(this).addClass('pulse');
				}
			});
		}

		// Function for stacking images
		$scope.stack = function(yOffset) {
			var divXOffset = 50;
			var divYOffset = yOffset || 60;
			var stackX = divXOffset;
			var stackY = divYOffset - 20;
			var photo = $(".photo");
	    
			photo.each(function() {

				$(this).removeClass("pulse");

				$(this).addClass('slideRight').css({
					"top": stackY,
					"left": stackX,
					"z-index": 0
					}).draggable({ containment: "body", scroll: false });

				$('#menu').addClass('shake');

				stackX += 220;
				if (stackX > ($(window).width() - $(this).width())){
					stackX  = divXOffset;
					stackY += $(this).height() + divYOffset;
				}
			});

			body.removeClass('loading');
		}
	}
);