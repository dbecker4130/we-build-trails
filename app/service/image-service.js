'use strict';

module.exports = ['$q', '$log', '$http', 'Upload', 'authService', imageService];

function imageService($q, $log, $http, Upload, authService) {
  $log.debug('imageService()');

  let service = {};

  service.uploadPostImage = function(postData, files) {
    $log.debug('uploadPostImage()');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/post/${postData._id}/image`;
      let headers = {
        'Accept': 'application/json',
        Authorization: `Bearer ${token}`
      };

      if (files && files.length) {
        for (var i = 0; i < files.length; i++) {
          Upload.upload({
            url,
            headers,
            method: 'POST',
            data: {
              image: files[i]
            }
          })
          .then( res => {
            $log.log('image-service fetch', res.data);
            postData.images.unshift(res.data);
            return res.data;
          })
          .catch( err => {
            $log.error(err.mesasge);
            return $q.reject(err);
          });
        }
      }
    });
  };




}
