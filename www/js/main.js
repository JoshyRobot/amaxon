// Require jquery
var $ = require('jquery')

// Require animation class
var Animation = require('./js/Animation.js')

// When document ready
$(function () {
  var playAnim = new Animation({
    element: $('#play')[0],
    duration: 350,
    paths: {
      play: 'M 12,26 18.5,22 18.5,14 12,10 z M 18.5,22 25,18 25,18 18.5,14 z',
      pause: 'M 12,26 16,26 16,10 12,10 z M 21,26 25,26 25,10 21,10 z'
    }
  })
})
