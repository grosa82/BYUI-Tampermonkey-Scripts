// ==UserScript==
// @name         BYUI Home
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Ricardo Goncalves
// @include      https://byui.brightspace.com/d2l/home*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    doIt();
})();

function doIt(){
    $(".d2l-textblock").each(function(){
	  var text = $(this).html();
	  if (text.indexOf('Availability Ends') > -1 || text.indexOf('Available') > -1) {
          $(this).parent().parent().parent().css("opacity", 0.2);
      } 
	});
}