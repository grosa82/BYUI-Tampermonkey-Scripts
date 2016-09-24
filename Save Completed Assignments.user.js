// ==UserScript==
// @name         Save Completed Assignments
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Ricardo Goncalves
// @include      https://byui.brightspace.com/d2l/lms/quizzing/user/quizzes_list.d2l*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var className = getParameterByName('ou');
    var assignments = [];

    $("td > a.vui-link").each(function(){
        var lesson = $(this).text();
        var nTimes = $(this).parent().parent().children().last().first().text().split(' / ')[0];
        if (nTimes != "0") {
            assignments.push(new Assignment(lesson, nTimes, className));
        }
    });
    
    if (typeof(Storage) !== "undefined") {
        // Code for localStorage/sessionStorage.
        localStorage.setItem("BYUICompletedAssignments_" + className, JSON.stringify(assignments));
    } else {
        console.log("Sorry! No Web Storage support...");
    }
    
    
})();

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function Assignment(name, nTimes, className) {
	var self = this;
	self.name = name;
	self.nTimes = nTimes;
    self.className = className;
}