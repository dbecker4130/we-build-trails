'use strict';

require('./scss/main.scss');

const path = require('path');
const angular = require('angular');
const camelcase = require('camelcase');
const pascalcase = require('pascalcase');
const uiRouter = require('angular-ui-router');
const ngFileUpload = require('ng-file-upload');
// const uiBootstrap = require('angular-ui-bootstrap');

const weBuildTrails = angular.module('we-build-trails', [uiRouter, ngFileUpload]);

let context = require.context('./config/', true, /\.js$/);
context.keys().forEach(path => {
  weBuildTrails.config(context(path));
});

context = require.context('./view/', true, /\.js$/);
context.keys().forEach(key => {
  let name = pascalcase(path.basename(key, '.js'));
  let module = context(key);
  weBuildTrails.controller(name, module);
});

context = require.context('./service/', true, /\.js$/);
context.keys().forEach(key => {
  let name = camelcase(path.basename(key, '.js'));
  let module = context(key);
  weBuildTrails.service(name, module);
});

context = require.context('./component/', true, /\.js$/);
context.keys().forEach( key => {
  let name = camelcase(path.basename(key, '.js'));
  let module = context(key);
  weBuildTrails.component(name, module);
});

context = require.context('./filter/', true, /\.js$/);
context.keys().forEach(key => {
  let name = camelcase(path.basename(key, '.js'));
  let module = context(key);
  weBuildTrails.filter(name, module);
});

// NOTE still need context for Directive and Filter if necessary
