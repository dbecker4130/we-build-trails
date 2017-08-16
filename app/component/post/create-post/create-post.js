'use strict';

require('./_create-post.scss');

module.exports = {
  template: require('./create-post.html'),
  controller: ['$log', 'postService', CreatePostController],
  controllerAs: 'createPostCtrl',
  bindings: {
    image: '<',
    post: '<',
  }
};

function CreatePostController($log, postService) {
  $log.debug('createPostCtrl()');

  this.post = {};

  this.createPost = function() {
    postService.createPost(this.post)
    .then( () => {
      this.post.title = null;
      this.post.desc = null;
      this.post.userID = null;
    });

  };

}
