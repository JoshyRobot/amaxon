'use strict'

// Expose config
module.exports = {
  prev: {
    element: '.chair .controls .prev .prev-icon',
    duration: 0,
    paths: {
      prev: 'M 12,12 h 2 v 12 h -2 z m 3.5,6 8.5,6 V 12 z'
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
  },
  fullscreen: {
    element: '.chair .controls .fullscreen .fullscreen-icon',
    duration: 150,
    paths: {
      expand: 'M 9,9 h 6 v 2 h -4 v 4 h -2 v 6 z M 27,9 h -6 v 2 h 4 v 4 h 2 v 6 z M 27,27 h -6 v -2 h 4 v -4 h 2 v -6 z M 9,27 h 6 v -2 h -4 v -4 h -2 v -6 z',
      normal: 'M 10,10 h 6 v 2 h -4 v 4 h -2 v 6 z M 26,10 h -6 v 2 h 4 v 4 h 2 v 6 z M 26,26 h -6 v -2 h 4 v -4 h 2 v -6 z M 10,26 h 6 v -2 h -4 v -4 h -2 v -6 z'
    },
    state: 'normal'
  },
  windowed: {
    element: '.chair .controls .windowed .windowed-icon',
    duration: 150,
    paths: {
      shrink: 'M 17,17 h -6 v -2 h 4 v -4 h 2 v 6 z M 19,17 h 6 v -2 h -4 v -4 h -2 v 6 z M 19,19 h 6 v 2 h -4 v 4 h -2 v -6 z M 17,19 h -6 v 2 h 4 v 4 h 2 v -6 z',
      normal: 'M 16,16 h -6 v -2 h 4 v -4 h 2 v 6 z M 20,16 h 6 v -2 h -4 v -4 h -2 v 6 z M 20,20 h 6 v 2 h -4 v 4 h -2 v -6 z M 16,20 h -6 v 2 h 4 v 4 h 2 v -6 z'
    },
    state: 'normal'
  }
}
