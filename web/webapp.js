
var app = angular.module('sandboxApp', ['angularFileUpload']);

app.directive('file', function() {
  return {
    restrict: 'A',
    scope: {
      file: '@'
    },
    link: function(scope, el, attrs){
	console.log('files, like a boss');
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

    $scope.upload = function(){
        
		// console.log('name',file.name,'size',file.size, 'type',file.type)
		console.log($scope.file);
		console.log('---------------------------------------------------');
		//http://www.cheynewallace.com/uploading-to-s3-with-angularjs/
        // $http.get(`http://localhost:5002/sign?file_name=${file.name}&file_type=${file.type}`)
        $http.get(`http://localhost:5002/sign?file_name=${file.name}&file_type=${file.type}`)
        .then(function(result){
            var sgn = result.data.signed_request
			$scope.signedUrl = sgn

			$http.put(sgn, $scope.file, {headers: {'Content-Type': $scope.file.type}})
	          .success(function(resp) {
	            //Finally, We're done
	            alert('Upload Done!')
	          })
	          .error(function(resp) {
	            alert("An Error Occurred Attaching Your File");
	          });

			// console.log('>>>>',file);
			// 
			// var xhr = new XMLHttpRequest();
		    // xhr.open("PUT", sgn);
		    // xhr.setRequestHeader('x-amz-acl', 'public-read');
		    // xhr.setRequestHeader('Content-Type', file.type);
		    // xhr.onload = function() {
		    //     if (xhr.status === 200) {
			// 		console.log('party boy 👾');
		    //     }
		    // };
		    // xhr.onerror = function() {
		    //     alert("Could not upload file.");
		    // };
		    // xhr.send(file);			
			// return $http.put(sgn, {'file': file  }, { 
			// 		transformRequest: angular.identity,
			// 		headers: {
			// 			// 'Content-Type': undefined,
			// 			'Content-Type': file.type,
			// 			'x-amz-acl': 'public-read'
			// 		}
			// 	}
			// )	
        })
        .then(function(result){
            console.log(result)
        })
        .catch(function(error){
            console.log(error)
			$scope.errorMsg = error.data
        })
    }

    // var uploader = $scope.uploader = new FileUploader({
    //     url: 'upload.php'
    // });
	// 
    // // FILTERS
    // uploader.filters.push({
    //     name: 'imageFilter',
    //     fn: function(item /*{File|FileLikeObject}*/, options) {
    //         var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
    //         return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
    //     }
    // });
	// 
    // uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
    //     console.info('onWhenAddingFileFailed', item, filter, options);
    // };
    // uploader.onAfterAddingFile = function(fileItem) {
    //     console.info('onAfterAddingFile', fileItem);
    //     getSignedKey(fileItem.file)
    // };
    // uploader.onAfterAddingAll = function(addedFileItems) {
    //     console.info('onAfterAddingAll', addedFileItems);
    // };
    // uploader.onBeforeUploadItem = function(item) {
    //     console.info('onBeforeUploadItem', item);
    // };
    // uploader.onProgressItem = function(fileItem, progress) {
    //     console.info('onProgressItem', fileItem, progress);
    // };
    // uploader.onProgressAll = function(progress) {
    //     console.info('onProgressAll', progress);
    // };
    // uploader.onSuccessItem = function(fileItem, response, status, headers) {
    //     console.info('onSuccessItem', fileItem, response, status, headers);
    // };
    // uploader.onErrorItem = function(fileItem, response, status, headers) {
    //     console.info('onErrorItem', fileItem, response, status, headers);
    // };
    // uploader.onCancelItem = function(fileItem, response, status, headers) {
    //     console.info('onCancelItem', fileItem, response, status, headers);
    // };
    // uploader.onCompleteItem = function(fileItem, response, status, headers) {
    //     console.info('onCompleteItem', fileItem, response, status, headers);
    // };
    // uploader.onCompleteAll = function() {
    //     console.info('onCompleteAll');
    // };

    // console.info('uploader', uploader);
	
}]);
