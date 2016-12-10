'use strict'

// requireFolder library
const requireFolder = require('./js/lib/requireFolder.lib.js')

// Require events
const EventEmitter = require('events').EventEmitter

// Create controls event emitter
const controls = new EventEmitter()

// Get window
const win = require('electron').remote.getCurrentWindow()

// Requrie classes
const classes = requireFolder('./js/classes', '.class.js')

// Requrie config
const config = requireFolder('./js/config', '.config.js')

// Require libraries
const lib = requireFolder('./js/lib', '.lib.js')

// Require parts
const parts = requireFolder('./js/parts', '.part.js')

// When document ready
document.addEventListener('DOMContentLoaded', () => {
  // Save elements for later use
  let elems = {
    video: document.querySelector('.chair .video'),
    overlay: document.querySelector('.chair .overlay'),
    playBtn: document.querySelector('.chair .controls .play'),
    fullscreenBtn: document.querySelector('.chair .controls .fullscreen'),
    windowedBtn: document.querySelector('.chair .controls .windowed'),
    progress: document.querySelector('.chair .controls .progress'),
    buffered: document.querySelector('.chair .controls .progress .buffered'),
    hovered: document.querySelector('.chair .controls .progress .hovered'),
    played: document.querySelector('.chair .controls .progress .played'),
    scrubber: document.querySelector('.chair .controls .progress .scrubber')
  }

  // When move event emitted
  controls.on('move', (change) => {
    controls.emit('seek', elems.video.currentTime + change)
  })

  // On volume change
  controls.on('volume', (change) => {
    // console.log(change)
  })

  // On fullscreen event
  controls.on('fullscreen', (state) => {
    // Check which state to change to
    if (state) {
      // Hide fullscreen and show windowed
      elems.fullscreenBtn.style.display = 'none'
      elems.windowedBtn.style.display = 'block'
    } else {
      // Show fullscreen and hide windowed
      elems.fullscreenBtn.style.display = 'block'
      elems.windowedBtn.style.display = 'none'
    }

    // Change fullscreen state
    win.setFullScreen(state)
  })

  // When seek event emitted
  controls.on('seek', (to) => {
    elems.video.currentTime = to
  })

  // When play event emitted
  controls.on('play', () => {
    elems.video.play()
  })

  // When pause event emitted
  controls.on('pause', () => {
    elems.video.pause()
  })

  // When playing is toggled
  controls.on('togglePlay', () => {
    if (elems.video.paused) {
      controls.emit('play')
    } else {
      controls.emit('pause')
    }
  })

  // Start parts
  for (let part in parts) {
    parts[part](controls, elems, win, classes, config, lib)
  }
})
