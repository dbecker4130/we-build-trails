'use strict';

require('./_signin.scss');

module.exports = {
  template: require('./signin.html'),
  controller: ['$log', '$location', 'authService', SigninContoller],
  controllerAs: 'signinCtrl'
};

function SigninContoller($log, $location, authService) {
  $log.debug('SigninContoller()');

  authService.getToken()
  .then(() => {
    $location.url('/home');
  })
  .catch( err => {
    $log.error(err.message);
    // alert('- Username: 4 characters ' + '\n' + '- Password: 6 charaters');
  });

  this.signin = function() {
    $log.log('signinCtrl.signin()');

    authService.signIn(this.user)
    .then(() => {
      $location.url('/home');
    });
  };
}
