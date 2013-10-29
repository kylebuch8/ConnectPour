'use strict';

angular.module('ConnectPourApp')
	.factory('Feed', ['$resource', function($resource) {
    	return $resource('data/feed.json');
	}]);
