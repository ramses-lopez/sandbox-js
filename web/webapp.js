
var app = angular.module('sandboxApp', ['angularFileUpload']);

app.directive('file', function() {
	return {
		restrict: 'A',
		scope: {
			file: '@'
		},
		link: function(scope, el, attrs){
			el.bind('change', function(event){
				var files = event.target.files;
				var file = files[0];
				scope.file = file;
				scope.$parent.file = file;
				scope.$apply();
			});
		}
	};
});

app.controller('mainController', ['$rootScope',
	'$scope',
	'$log',
	'$location',
	'FileUploader',
	'$http',
	function($rootScope,
		$scope,
		$log,
		$location,
		FileUploader,
		$http) {

	$scope.signedUrl = undefined
	$scope.errorMsg = undefined
	$scope.uploadedImageUrl = undefined

	var url = undefined

	$scope.upload = function(){
		console.log($scope.file)
		$http.get(`http://localhost:5002/sign?file_name=${$scope.file.name}&file_type=${$scope.file.type}`)
		.then(function(result){
			console.log(result)
			var sgn = result.data.signed_request
			url = result.data.url
			$scope.signedUrl = sgn
			return $http.put(sgn, $scope.file, {headers: {'Content-Type': $scope.file.type}})
		})
		.then(function(result){
			console.log('all done!')
			$scope.uploadedImageUrl = url
		})
		.catch(function(error){
			console.log(error)
			$scope.errorMsg = error.data
		})
	}

}]);
