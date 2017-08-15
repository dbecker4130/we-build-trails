'use strict';

require('./_navbar.scss');

module.exports = {
  template: require('./navbar.html'),
  controller: ['$log', '$location', '$rootScope', 'authService', NavbarController],
  controllerAs: 'navbarCtrl'
};

function NavbarController($log, $location, $rootScope, authService) {
  $log.debug('NavbarController()');

  let url = $location.url();
  this.showUpload = url === '/home/#upload' || '/home';

  this.profileLink = function() {
    $location.url('/profile');
  };

  this.joinLink = function() {
    $location.url('/join');
  };

  this.homeLink = function() {
    $location.url('/home');
  };

  this.checkPath = function() {
    let path = $location.path();

    if (path === '/join') {
      this.hideButtons = true;
    }

    if (path !== '/join') {
      this.hodeButtons = true;
      authService.getToken()
      .catch( () => {
        $location.url('/join#signin');
      });
    }
  };

  this.checkPath();

  $rootScope.$on('$locationChangeSuccess', () => {
    this.checkPath();
  });

  this.logout = function() {
    $log.log('navbarCtrl.logout()');

    this.hideButtons = true;
    authService.logout()
    .then( () => {
      $location.url('/');
    });
  };
}
