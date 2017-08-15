'use strict';

module.exports = ['$logProvider', logConfig];

function logConfig($logProvider) {
  $logProvider.debugEnabled(__DEBUG__); //eslint-disable-line
}
