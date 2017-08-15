'use strict';

module.exports = ['$log', '$location', 'authService', 'postService', HomeController];

function HomeController($log, $location, authService, postService) {
  $log.debug('HomeController');

  let url = $location.url();
  this.showUpload = url = '/home#upload' || '/home';

  this.homePostArray = [];

  this.fetchAllPostsFromDB = () => {
    postService.fetchAllPostsFromDB()
    .then( posts => {
      this.homePostArray = posts.data.reverse();
      console.log('posts', this.homePostArray);
    });
  };

  this.fetchAllPostsFromDB();
}
