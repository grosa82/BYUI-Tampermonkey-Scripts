// ==UserScript==
// @name         BYUI Calendar List
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Ricardo Goncalves
// @include      https://byui.brightspace.com/d2l/le/calendar*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    setTimeout(function(){highlightNextNDays(3);}, 5000);
})();

function highlightDay(month, day) {
	var self = this;
	self.m = month;
	self.d = day;
}

function highlightNextNDays(numDays) {

	var dates = [];

	for (var i = 0; i < numDays; i++) {
		var currentDate = new Date();
		currentDate.setDate(currentDate.getDate() + i);
		var currentDateArray = currentDate.toString().split(' ');

		dates.push(new highlightDay(currentDateArray[1], currentDateArray[2]));
	}
	
	$(".d2l-right").each(function(){
	  var text = $(this).html().split(' ');
	  var obj = $(this);
	  if (text.length > 1)
	  {
	    var month = text[0];
	    var day = text[1].replace(",","");
	   
	    $.each(dates, function(i, item) {
	    	if (month.toString() == item.m.toString() && 
            day.toString() == item.d.toString()) {
          console.log(month + " " + day);
	    		obj.parent().parent().parent().parent().parent().css("background-color", "yellow");
	    	}
	    });
	  }  
	});
    
    $(".d2l-textblock").each(function(){
        var text = $(this).html();
        if (text.indexOf('Availability Ends') > -1 || text.indexOf('Available') > -1) {
          $(this).parent().parent().parent().parent().parent().css("opacity", 0.2);
        }
    });
}

