
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

				//objeto para permitir el preview de la imagen
				//TODO: limitar a los tipos de imagen conocidos
				var reader = new FileReader()
				reader.onload = function (loadEvent) {
					scope.$apply(function () {
						scope.preview = loadEvent.target.result

						console.log(scope.preview);

						scope.$parent.preview = loadEvent.target.result
					})
				}
				reader.readAsDataURL(event.target.files[0])
			});
		}
	};
});

app.directive('fileUploader', ['$http', function($http) {
	return {
		templateUrl: '/web/file-uploader/file-uploader-directive.html',
		restrict: 'E',
		scope: {
			file: '@'
		},
		link: function(scope, el, attrs){
			scope.file = undefined
			scope.preview = undefined
			scope.signedUrl = undefined
			scope.errorMsg = undefined
			scope.uploadedImageUrl = undefined
			scope.progress = 0
			var tmpUrl = undefined

			scope.upload = function(){
				$http.get(`http://localhost:5002/sign?file_name=${scope.file.name}&file_type=${scope.file.type}`)
				.then(function(result){
					scope.signedUrl = result.data.signed_request
					tmpUrl = result.data.url
					return $http.put(scope.signedUrl, scope.file, {
						headers: {'Content-Type': scope.file.type},
						eventHandlers: {
							progress: function(c) {
								// console.log('Progress ->', c);
							}
						},
						uploadEventHandlers: { progress: function(e) { scope.progress = Math.round((e.loaded*100)/scope.file.size) } }
					})
				})
				.then(function(result){
					console.log('done');
					scope.uploadedImageUrl = tmpUrl
				})
				.catch(function(error){
					console.log(error)
					scope.errorMsg = error.data
				})
			}
		}
	};
}]);

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

	}
]);
