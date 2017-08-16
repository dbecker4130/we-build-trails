'use strict';

module.exports = ['$log', '$rootScope', 'postService', ProfileController];

function ProfileController($log, $rootScope, postService) {
  $log.debug('ProfileController()');

  this.allPosts = [];

  this.fetchProfilePosts = function() {
    postService.fetchProfilePosts()
    .then( posts => {
      this.allPosts = posts.reverse();
    });
  };

  this.fetchProfilePosts();
}
