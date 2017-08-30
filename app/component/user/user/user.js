'use strict';

module.exports = {
  template: require('./user.html'),
  controller: ['$log', 'profileService', UserController],
  controllerAs: 'userCtrl',
  bindings: {
    user: '<'
  }
};

function UserController($log, profileService) {
  $log.debug('userCtrl()');

  this.changeEdit = {
    showEditProofile: false
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
