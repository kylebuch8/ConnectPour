'use strict';

angular.module('ConnectPourApp')
  .controller('SearchCtrl', function ($scope, $http) {
    $scope.search = function(){
        var key = //key here
    	var url = 'http://localhost:3000/v2/search?q=' + $scope.searchTerm + '&type=beer&withBreweries=Y&key=' + key + '&format=json';
    	$http.get(url)
    		.success(function(data){
    			$scope.results = data.data;
    		})
    		.error(function(){
    			console.log('error getting results');
    		});
    }
  });
