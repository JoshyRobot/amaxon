// Require jquery
var $ = require('jquery')

// Require IconContainer class
var IconContainer = require('./js/classes/IconContainer.class.js')

// Create icon container
var icons = new IconContainer({
  prev: {
    element: '.chair .controls .prev .prev-icon',
    duration: 0,
    paths: {
      prev: 'm 12,12 h 2 v 12 h -2 z m 3.5,6 8.5,6 V 12 z'
    },
    state: 'prev'
  },
  play: {
    element: '.chair .controls .play .play-icon',
    duration: 350,
    paths: {
      play: 'M 12,26 18.5,22 18.5,14 12,10 z M 18.5,22 25,18 25,18 18.5,14 z',
      pause: 'M 12,26 16,26 16,10 12,10 z M 21,26 25,26 25,10 21,10 z'
    },
    state: 'play'
  },
  next: {
    element: '.chair .controls .next .next-icon',
    duration: 0,
    paths: {
      next: 'M 12,24 20.5,18 12,12 V 24 z M 22,12 v 12 h 2 V 12 h -2 z'
    },
    state: 'next'
  }
})

// When document ready
$(function () {
  icons._start()

  var chairVideo = document.querySelector('.chair .video')

  $(chairVideo).click(function () {
    if (icons.play.state === 'play') {
      icons.play.change('pause')
      chairVideo.play()
    } else {
      icons.play.change('play')
      chairVideo.pause()
    }
  })

  chairVideo.ondurationchange = function () {
    chairVideo.onprogress = function () {
      var bufferedEnd = chairVideo.buffered.end(chairVideo.buffered.length - 1)
      var duration = chairVideo.duration
      if (duration > 0) {
        $('.chair .controls .progress .buffered').width(((bufferedEnd / duration) * 100) + '%')
      }
    }
    chairVideo.onprogress()
  }
  chairVideo.ontimeupdate = function () {
    var played = chairVideo.currentTime
    var duration = chairVideo.duration
    $('.chair .controls .progress .played').width(((played / duration) * 100) + '%')
  }

  var mouseDown = false
  $('.chair .controls .progress').on('mouseenter mousemove', function (e) {
    $(this).addClass('hover')
    var x = e.pageX - $(this).offset().left
    var length = $(this).width()
    $('.chair .controls .progress .hovered').width(((x / length) * 100) + '%')
  }).mouseleave(function () {
    if (!mouseDown) {
      $(this).removeClass('hover')
    }
    $('.chair .controls .progress .hovered').width(0)
  }).mousedown(function (e) {
    mouseDown = true
    var x = e.pageX - $(this).offset().left
    var length = $(this).width()
    var duration = chairVideo.duration
    chairVideo.currentTime = (x / length) * duration
    $('.chair .controls .progress .played').width(((x / length) * 100) + '%')
  })

  $(document).mouseup(function () {
    $('.chair .controls .progress').removeClass('hover')
    mouseDown = false
  }).mousemove(function (e) {
    if (mouseDown) {
      var x = e.pageX - $('.chair .controls .progress').offset().left
      var length = $('.chair .controls .progress').width()
      var duration = chairVideo.duration
      chairVideo.currentTime = (x / length) * duration
      $('.chair .controls .progress .played').width(((x / length) * 100) + '%')
    }
  })

  $('.chair .controls .play').click(function () {
    if (icons.play.state === 'play') {
      icons.play.change('pause')
      chairVideo.play()
    } else {
      icons.play.change('play')
      chairVideo.pause()
    }
  })
})
