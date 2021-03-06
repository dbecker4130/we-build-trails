'use strict';

module.exports = ['$stateProvider', '$urlRouterProvider', routerConfig];

function routerConfig($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.when('', '/join#signup');
  $urlRouterProvider.when('/', 'join#signup');
  $urlRouterProvider.when('/signin', '/join#signin');

  let states = [
    {
      name: 'home',
      url: '/home',
      template: require('../view/home/home.html'),
      controller: 'HomeController',
      controllerAs: 'homeCtrl'
    },
    {
      name: 'landing',
      url: '/join',
      template: require('../view/landing/landing.html'),
      controller: 'LandingController',
      controllerAs: 'landingCtrl'
    },
    {
      name: 'profile',
      url: '/profile',
      template: require('../view/profile/profile.html'),
      controller: 'ProfileController',
      controllerAs: 'profileCtrl'
    }
  ];

  states.forEach(state => {
    $stateProvider.state(state);
  });
}
