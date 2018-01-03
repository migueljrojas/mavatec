// Main javascript entry point
// Should handle bootstrapping/starting application

'use strict';

global.$ = global.jQuery = require('jquery');
var Tabs = require('../_modules/tabs/tabs');

$(function() {
  new Tabs(); 
});
