'use strict';

require('./_user-container.scss');

module.exports = {
  template: require('./user-container.html'),
  controller: ['$log', UserContainerController],
  controllerAs: 'userContainerCtrl',
  bindings: {
    user: '<'
  }
};

function UserContainerController($log) {
  $log.debug('userContainerCtrl()');


}
