'use strict';

require('./_create-comment.scss');

module.exports = {
  template: require('./create-comment.html'),
  controller: ['$log', 'commentService', CreateCommentController],
  controllerAs: 'createCommentController',
  bindings: {
    comment: '<',
  }
};
function CreateCommentController($log, commentService) {
  $log.debug('createCommentCtrl()');

  this.comment = {};

  this.createComment = function() {
    commentService.createComment(this.comment)
    .then( () => {
      this.comment.desc = null;
      this.comment.userID = null;
    });
  };
}
