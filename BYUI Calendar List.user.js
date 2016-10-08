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

    setTimeout(function(){highlightNextNDays(3);}, 2000);
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
console.log(dates);
    $(".d2l-right").each(function(){
      var text = $(this).html().split(' ');
      var obj = $(this);
      if (text.length > 1)
      {
        var month = text[0];
        var day = text[1].replace(",","");
        $.each(dates, function(i, item) {
            if (month.toString() == item.m.toString() &&
            parseInt(day.toString()) == parseInt(item.d.toString())) {
            //console.log(month + " " + day);
                obj.css("color", "red");
            }
        });
      }
    });
    
    
    
    $(".d2l-textblock.d2l-textblock-strong.d2l-left").each(function(){
        var obj = $(this);
        var text = $(this).html();
        var id = text.replace("'", "").replace("&","e") + obj.parent().children().eq(0).children().eq(1).html().substr(0,9);
        if (text.indexOf('Available') > -1) {
          $(this).parent().parent().parent().parent().parent().css("opacity", 0.2);
        } else {
            if (text.indexOf('changeStatus') == -1) {
                $(this).append("&nbsp;<button onclick=\"localStorage.setItem('" + id + "', 'done');$(this).parent().parent().parent().parent().parent().css('background-color', '#afe3b2');\" class='changeStatus'>Done</button>");
                $(this).append("&nbsp;<button onclick=\"localStorage.setItem('" + id + "', 'partial');$(this).parent().parent().parent().parent().parent().css('background-color', '#afc8e3');\" class='changeStatus'>Partial</button>");
                $(this).append("&nbsp;<button onclick=\"localStorage.removeItem('" + id + "');$(this).parent().parent().parent().parent().parent().css('background-color', 'white');\" class='changeStatus'>Clean</button>");
            }
        }
        var data = localStorage.getItem(id.toString());
        console.log(id);
        console.log(localStorage.getItem(id.toString()));
        if (data !== null) {
            console.log(data);
            if (data == "done") {
                obj.parent().parent().parent().parent().parent().css("background-color", "green");
            } else if (data == "partial") {
                obj.parent().parent().parent().parent().parent().css("background-color", "#afc8e3");
            }
        }
    });
}

