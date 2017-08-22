'use strict';

require('./_mobile-nav.scss');

module.exports = {
  template: require('./mobile-nav.html'),
  controller: ['$log', '$location', 'authService', MobileNavController],
  controllerAs: 'mobileNavCtrl',
};

function MobileNavController($log, $location, authService) {
  $log.debug('MobileNavController');

  this.showSearch = false;

  this.toProfile = function() {
    $location.url('/profile');
  };

  this.toHome = function() {
    $location.url('/home');
  };

  this.toLogout = function() {
    $log.log('mobileNavCtrl.logout()');

    authService.logout()
    .then( () => {
      $location.url('/');
    });
  };



}
