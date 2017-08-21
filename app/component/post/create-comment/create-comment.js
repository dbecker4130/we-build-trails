'use strict';

require('./_create-comment.scss');

module.exports = {
  template: require('./create-comment.html'),
  controller: ['$log', 'postService', CreateCommentController],
  controllerAs: 'createCommentCtrl',
  bindings: {
    comment: '<',
    post: '<'
  }
};

function CreateCommentController($log, postService) {
  $log.debug('createCommentCtrl()');

  this.comment = {};

  this.createComment = function() {
    postService.createComment(this.comment)
    .then( () => {
      this.comment.desc = null;
      this.comment.userID = null;
    });
  };
}
