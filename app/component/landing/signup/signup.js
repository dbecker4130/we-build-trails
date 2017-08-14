'use strict';

module.exports = {
  template: require('./signup.html'),
  controller: ['$log', '$location', 'authService', SignupController],
  controllerAs: 'signupCtrl'
};

function SignupController($log, $location, authService){
  $log.debug('SignupController');

  authService.getToken()
  .then(() => {
    $location.url('/home');
  }).catch(err => {
    $log.error(err.message);
  });

  this.signup = function(user){
    $log.log('SignupController.signup()');

    authService.signUp(user)
    .then(() => {
      $location.url('/home');
    }).catch(() => {
      // alert('- Username: 4 characters ' + '\n' + '- Email: 6 characters' + '\n' + '- Password: 6 charaters');
    });
  };
}
