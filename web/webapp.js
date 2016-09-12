
var app = angular.module('sandboxApp', ['angularFileUpload']);

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

    // $scope.signedUrl = undefined
    // $scope.myFile = undefined

    // $scope.getSignedKey = function(){
    // }

    // $scope.fileNameChanged = function(ele){
    //     // console.log('changing file', file)
    //     var files = ele.files;
    //     var l = files.length;
    //     var namesArr = [];

    //     for (var i = 0; i < l; i++) {
    //        namesArr.push(files[i].name);
    //     }

    //     console.log(namesArr)

    // }


    var getSignedKey = function(file){
        console.log('name',file.name)
        console.log('size',file.size)
        console.log('type',file.type)

        $http.get(`http://localhost:3001/sign?file_name=${file.name}&file_type=${file.type}`)
        .then(function(result){
            console.log(result.data)

            var sgn = result.data.signed_request

            console.log('signed request', sgn)
            return $http.put(sgn)
        })
        .then(function(result){
            console.log(result)
        })
        .catch(function(error){
            console.log(error)
        })

    }


    var uploader = $scope.uploader = new FileUploader({
        url: 'upload.php'
    });

    // FILTERS
    uploader.filters.push({
        name: 'imageFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
    });

    uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
        console.info('onWhenAddingFileFailed', item, filter, options);
    };
    uploader.onAfterAddingFile = function(fileItem) {
        console.info('onAfterAddingFile', fileItem);

        getSignedKey(fileItem.file)

    };
    uploader.onAfterAddingAll = function(addedFileItems) {
        console.info('onAfterAddingAll', addedFileItems);
    };
    uploader.onBeforeUploadItem = function(item) {
        console.info('onBeforeUploadItem', item);
    };
    uploader.onProgressItem = function(fileItem, progress) {
        console.info('onProgressItem', fileItem, progress);
    };
    uploader.onProgressAll = function(progress) {
        console.info('onProgressAll', progress);
    };
    uploader.onSuccessItem = function(fileItem, response, status, headers) {
        console.info('onSuccessItem', fileItem, response, status, headers);
    };
    uploader.onErrorItem = function(fileItem, response, status, headers) {
        console.info('onErrorItem', fileItem, response, status, headers);
    };
    uploader.onCancelItem = function(fileItem, response, status, headers) {
        console.info('onCancelItem', fileItem, response, status, headers);
    };
    uploader.onCompleteItem = function(fileItem, response, status, headers) {
        console.info('onCompleteItem', fileItem, response, status, headers);
    };
    uploader.onCompleteAll = function() {
        console.info('onCompleteAll');
    };

    console.info('uploader', uploader);



}]);
