'use strict';

require('./_user-container.scss');

module.exports = {
  template: require('./user-container.html'),
  controller: ['$log', '$location', UserContainerController],
  controllerAs: 'userContainerCtrl',
  bindings: {
    user: '<'
  }
};

function UserContainerController($log, $location) {
  $log.debug('userContainerCtrl()');

  this.goHome = function() {
    $location.url('/home');
  };
}
