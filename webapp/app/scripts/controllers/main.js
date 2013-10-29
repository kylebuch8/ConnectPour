'use strict';

angular.module('ConnectPourApp')
	.controller('MainCtrl', ['$scope', 'Feed', function($scope, Feed) {
		$scope.entries = Feed.query();
	}]);