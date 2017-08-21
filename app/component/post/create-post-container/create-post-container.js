'use strict';

require('./_create-post-container.scss');

module.exports = {
  template: require('./create-post-container.html'),
  controller: ['$log', CreatePostContController],
  controllerAs: 'createPostContCtrl',
  bindings: {
    post: '<',
  }
};

function CreatePostContController($log) {
  $log.debug('CreatePostContController');

  this.showCreatePost = false;

}
