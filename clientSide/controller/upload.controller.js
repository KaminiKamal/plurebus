'use strict';

angular.module('users').controller('UploadController', ['$scope', '$http', '$location', 'Users', 'Authentication',
  function ($scope, $http, $location, Users, Authentication) {
    $scope.user = Authentication.user;

    $scope.upload = function() {
      var filesSelected = document.getElementById("inputFileToLoad").files;
      if (filesSelected.length > 0) {
          var fileToLoad = filesSelected[0];
          var fileReader = new FileReader();
          fileReader.onload = function(fileLoadedEvent) {
              $scope.base64value = fileLoadedEvent.target.result;
              console.log($scope.base64value);
             
          };
          fileReader.readAsDataURL(fileToLoad);
      }
      $http.post('/api/users/upload', $scope.base64value).success(function (response) {
        // Show user success message and clear form
        $scope.imageId = response.id;
        $scope.error = response.message;

      }).error(function (response) {
        // Show user error message and clear form
        $scope.imageId = null;
        $scope.error = response.message;
      });
    };
    $scope.uploadview = function(){
      
       $http.post('/api/users/uploadview', $scope.imageId).success(function (response) {
         // Show user success message and clear form
         
         $scope.error = response.message;
         var data = response.image;
         document.getElementById('preview').setAttribute('src', data);
         $("#preview").show();

       }).error(function (response) {
         // Show user error message and clear form
         
         $scope.error = response.message;
       });
    };
  }
]);
