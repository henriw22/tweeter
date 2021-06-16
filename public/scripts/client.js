/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {
  const timeElement = $(".time")
  const time = timeElement.data("time")
  const timeAgo = timeago.format(time)
  timeElement.text(timeAgo)
});