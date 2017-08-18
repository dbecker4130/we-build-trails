'use strict';

const JWT = require('jwt-client');

module.exports = ['$q', '$log', '$http', '$window', authService];

function authService($q, $log, $http, $window) {
  $log.debug('authService()');

  let service = {};
  let token = null;
  service.currentUserID = null;
  service.currentPostID = null;
  service.currentCommentID = null;
  service.userData = {};

  function setToken(_token) {
    $log.debug('authService.setToken()');

    if (!_token) {
      return $q.reject(new Error('no token'));
    }

    $window.localStorage.setItem('token', _token);
    token = _token;
    return $q.reject(token);
  }

  service.getToken = function() {
    $log.debug('authService.getToken()');

    if (token) {
      return $q.resolve(token);
    }

    token = $window.localStorage.getItem('token');
    if (token) return $q.resolve(token);
    return $q.reject(new Error('token not found'));
  };

  service.logout = function() {
    $log.debug('authService.logout()');

    $window.localStorage.removeItem('token');
    token = null;
    return $q.resolve();
  };

  service.signUp = function(user) {
    $log.debug('authService.signup()');

    let url = `${__API_URL__}/api/signup`; //eslint-disable-line
    let config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };

    return $http.post(url, user, config)
    .then( res => {
      service.userData = res;
      $log.log('success', res.data);
      setToken(res.data);
    })
    .catch( err => {
      $log.error('failure', err.message);
      return $q.reject(err);
    });
  };

  service.signIn = function(user) {
    $log.debug('authService.signin()');

    let url = `${__API_URL__}/api/signin`; //eslint-disable-line
    let base64 = $window.btoa(`${user.username}:${user.password}`);
    let config = {
      headers: {
        'Accept': 'application/json',
        Authorization: `Basic ${base64}`
      }
    };

    return $http.get(url, config)
    .then( res => {
      $log.log('success', res.data);
      service.userData = user.username;
      setToken(res.data);
    })
    .catch( err => {
      $log.error(err.message, 'token not set');
      return $q.reject(err);
    });
  };

  service.getUserId = function() {
    $log.debug('authService.getUserId()');

    token = $window.localStorage.getItem('token');

    let parsedToken = JWT.read(token);
    service.currentUserID = parsedToken.claim.userID;

    $log.debug('currentUserID', service.currentUserID);
  };

  service.fetchUserData = function() {
    $log.debug('authService.fetchUserData()');

    return service.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/user/${service.currentUserID}`; //eslint-disable-line
      let config = {
        headers: {
          'Accept': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      return $http.get(url, config);
    })
    .then( res => {
      $log.log('user data retrieved');
      let userData = res.data;
      return userData;
    })
    .catch( err => {
      $log.error('user data not retrieved', err.message);
    });
  };

  return service;
}
