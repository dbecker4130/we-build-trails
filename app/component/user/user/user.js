'use strict';

require('./_user.scss');

module.exports = {
  template: require('./user.html'),
  controller: ['$log', 'profileService', 'authService', UserController],
  controllerAs: 'userCtrl',
  bindings: {
    user: '<'
  }
};

function UserController($log, profileService, authService) {
  $log.debug('userCtrl()');

  this.changeEdit = {
    showEditProfile: false
  };

  this.user = null;

  this.fetchUserData = function() {
    profileService.fetchUserData()
    .then( user => {
      $log.log('user data retrieved');
      this.user = user;
    });
  };

  this.fetchUserData();
}
