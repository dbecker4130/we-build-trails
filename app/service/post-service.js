'use strict';

module.exports = ['$q', '$log', '$http', 'authService', postService];

function postService($q, $log, $http, authService) {
  $log.debug('postService()');

  let service = {};
  service.allPosts = [];
  service.currentPostID = null;
  service.postData = {};

  service.createPost = (post) => {
    $log.debug('postService.createPost()');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/post`;
      let config = {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };
      return $http.post(url, post, config);
    })
    .then( res => {
      $log.log('post created');
      let post = res.data;
      service.allPosts.unshift(post);
      console.log(service.allPosts);
      return post;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  
}
