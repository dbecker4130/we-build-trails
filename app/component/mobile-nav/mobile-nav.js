'use strict';

require('./_mobile-nav.scss');

module.exports = {
  template: require('./mobile-nav.html'),
  controller: ['$log', '$location', MobileNavController],
  controllerAs: 'mobileNavCtrl',
};

function MobileNavController($log, $location) {
  $log.debug('MobileNavController');

  this.showSearch = false;

  this.toProfile = function() {
    $location.url('/profile');
  };

  this.toHome = function() {
    $location.url('/home');
  };



}
