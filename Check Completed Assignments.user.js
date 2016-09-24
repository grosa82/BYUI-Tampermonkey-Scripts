// ==UserScript==
// @name         Check Completed Assignments
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Ricardo Goncalves
// @include      https://byui.brightspace.com/d2l/home/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var classCode = window.location.href.substr(window.location.href.lastIndexOf('/') + 1, 200);
    if (classCode !== null) {
        var data = localStorage.getItem("BYUICompletedAssignments_" + classCode);
        if (data !== null) {
            var assignments = JSON.parse(data);
            $.each(assignments, function(i, v) {
                $("span.d2l-textblock").each(function() {
                    var lesson = $(this).text().split(' - ')[0];
                    if ($.trim(lesson) == $.trim(v.name)) {
                        $(this).parent().append("&nbsp;&#9989;");
                        $(this).parent().append("&nbsp;<i>Done</i>");
                        $(this).css("text-decoration", "line-through");
                        $(this).css("opacity", 0.7);
                    }
                });
            });
        }
    }
})();