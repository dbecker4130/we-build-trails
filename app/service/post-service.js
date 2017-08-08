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

  service.updatePost = (postID, postData) => {
    $log.debug('postService.updatePost()');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/post/${postID}`;
      let config = {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };
      return $http.put(url, postData, config);
    })
    .then( res => {
      for (var i = 0; i < service.allPosts.length; i++) {
        let current = service.allPosts[i];
        if (current._id === postID) {
          service.allPosts[i] = res.data;
          break;
        }
      }
      return res.data;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.deletePost = function(postID) {
    $log.debug('postService.deletePost()');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/post/${postID}`;
      let config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      return $http.delete(url, config);
    })
    .then( res => {
      for (var i = 0; i < service.allPosts.length; i++) {
        let current = service.allPosts[i];
        if (current._id === postID) {
          service.allPosts.splice(i, 1);
          break;
        }
      }
    })
    .then( token => {
      let url = `${__API_URL__}/api/post/${postData._id}/image/${imageData._id}`;
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      };
      return $http.delete(url, config);
    })

    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.fetchAllPostsFromDB = function() {
    $log.debug('postService.fetchAllPostsFromDB()');

    return authService.getToken()

    .then( token => {
      let url = `${__API_URL__}/api/post`;
      let config = {
        headers: {
          'Accect': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };
      return $http.get(url, config);
    });
  };

  service.fetchProfilePosts = function() {
    $log.debug('postService.fetchProfilePosts()');

    authService.getUserId();

    return authService.getToken()

    .then( token => {
      let url = `${__API_URL__}/api/${authService.currentUserID}/post`;
      let config = {
        headers: {
          'Accept': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };
      return $http.get(url, config);
    })
    .then( res => {
      $log.log('profile posts retrieved');
      service.allPosts = res.data;
      console.log(service.allPosts);
      return service.allPosts;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  return service;

}
