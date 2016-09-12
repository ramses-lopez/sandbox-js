
var app = angular.module('sandboxApp', []);

app.controller('mainController', ['$rootScope',
    '$scope',
    '$log',
    '$location',
    function($rootScope,
        $scope,
        $log,
        $location
    ) {

    $scope.myFile = undefined
    $scope.fileNameChanged = function(ele){
        // console.log('changing file', file)
        var files = ele.files;
        var l = files.length;
        var namesArr = [];

        for (var i = 0; i < l; i++) {
           namesArr.push(files[i].name);
        }
        console.log(namesArr)
    }
}]);
