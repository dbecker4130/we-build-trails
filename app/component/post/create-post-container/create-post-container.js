'use strict';

require('./_create-post-container.scss');

module.exports = {
  template: require('./create-post-container.html'),
  controller: ['$log', 'authService', CreatePostContController],
  controllerAs: 'createPostContCtrl',
  bindings: {
    post: '<',
  }
};

function CreatePostContController($log, authService) {
  $log.debug('CreatePostContController');

  this.showCreatePost = false;
  this.showUploadImage = false;

  this.user = null;
  this.fetchUsername = function() {
    authService.fetchUserData()
    .then(user => {
      $log.log('got user', user);
      this.user = user;
    });
  };
  this.fetchUsername();
}
