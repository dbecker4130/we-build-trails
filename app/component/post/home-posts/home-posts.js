'use strict';

require('./_home-posts.scss');

module.exports = {
  template: require('./home-posts.html'),
  controller: ['$log', 'postService', 'authService', HomePostController],
  controllerAs: 'homePostCtrl',
  bindings: {
    user: '<',
    post: '<'
  }
};

function HomePostController($log) {
  $log.debug('HomePostController');

}
