'use strict';

module.expots = ['$q', '$log', '$http', 'authService', commentService];

function commentService($q, $log, $http, authService) {
  $log.debug('commentService()');

  let service = {};

  service.createComment = function(postData, comment) {
    $log.debug('commentService.createComment()');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/post/${postData._id}/comment`;
      let config = {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };
      return $http.post(url, comment, config);
    })
    .then( res => {
      $log.log('comment created');
      let comment = res.data;
      service.allComments.unshift(comment);
      return comment;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.deleteComment = function(postData, commentData) {
    $log.debug('commentService.deleteComment()');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/post/${postData._id}/comment/${commentData._id}`;
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      };
      return $http.delete(url, config);
    })
    .then(() => {
      for (var i =0; i < postData.comments.length; i++) {
        let current = postData.comments[i];
        if (current._id === commentData._id) {
          postData.comments.splice(i, 1);
          break;
        }
      }
      $log.log('comment deleted');
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };


  return service;

}
