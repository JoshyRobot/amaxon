'use strict'

// Require sprintf
const {sprintf} = require('sprintf-js')

// Export function
module.exports = (controls, elems, win, classes, config, lib) => {
  // Create icon container
  const icons = new classes.IconContainer(config.icons)

  // Start icons
  icons._start()

  // Seconds to time
  function time (seconds, pattern = seconds) {
    let timeArr = []
    if (pattern / 3600 > 1) {
      timeArr.push(Math.floor(seconds / 3600))
      seconds = seconds % 3600
    }
    timeArr.push(Math.floor(seconds / 60))
    seconds = seconds % 60
    timeArr.push(Math.floor(seconds))
    timeArr.forEach((val, index) => {
      if (index) {
        timeArr[index] = sprintf('%02d', val)
      }
    })
    return timeArr.join(':')
  }

  // Move progress bar
  function moveProgress (to) {
    elems.played.style.width = ((to / elems.video.duration) * 100) + '%'
    elems.scrubber.style.left = ((to / elems.video.duration) * 100) + '%'
    elems.time.innerHTML = time(to, elems.video.duration) + ' / ' + time(elems.video.duration)
  }

  // Show correct buttons
  controls.emit('fullscreen', win.isFullScreen())

  // Move progress bar on seek
  controls.on('seek', (to) => {
    moveProgress(to)
  })

  // When play event emitted
  controls.on('play', () => {
    // Switch to pause icon
    icons.play.change('pause')
  })

  // When pause event emitted
  controls.on('pause', () => {
    // Switch to play icon
    icons.play.change('play')
  })

  // On buffering
  elems.video.onprogress = function () {
    if (elems.video.buffered.length < 1) {
      return
    }
    let bufferedEnd = elems.video.buffered.end(elems.video.buffered.length - 1)
    let duration = elems.video.duration
    if (duration > 0) {
      elems.buffered.style.width = ((bufferedEnd / duration) * 100) + '%'
      elems.time.innerHTML = time(0, elems.video.duration) + ' / ' + time(elems.video.duration)
    }
  }

  // On video progress
  elems.video.ontimeupdate = () => {
    moveProgress(elems.video.currentTime)
  }

  // When mouse moves or enters progress bar
  elems.progress.onmouseenter = elems.progress.onmousemove = (e) => {
    elems.progress.classList.add('hover')
    let x = e.pageX - lib.elems.offset(elems.progress).left
    let width = elems.progress.clientWidth
    elems.hovered.style.width = ((x / width) * 100) + '%'
  }

  // When mouse leaves progress bar
  let mouseDown = false
  elems.progress.onmouseleave = () => {
    if (!mouseDown) {
      elems.progress.classList.remove('hover')
    }
    elems.hovered.style.width = 0
  }

  // When mouse is pressed in progress bar
  elems.progress.onmousedown = (e) => {
    mouseDown = true
    let x = e.pageX - lib.elems.offset(elems.progress).left
    let width = elems.progress.clientWidth
    let duration = elems.video.duration
    controls.emit('seek', (x / width) * duration)
  }

  // When mouse is released
  document.onmouseup = () => {
    elems.progress.classList.remove('hover')
    mouseDown = false
  }

  // When mouse is moved
  document.onmousemove = (e) => {
    if (mouseDown) {
      let x = e.pageX - lib.elems.offset(elems.progress).left
      let width = elems.progress.clientWidth
      let duration = elems.video.duration
      controls.emit('seek', (x / width) * duration)
    }
  }

  // When play button or overlay clicked
  elems.playBtn.onclick = elems.overlay.onclick = () => {
    // Check current state
    if (icons.play.state === 'play') {
      // Play the video
      controls.emit('play')
    } else {
      // Pause the video
      controls.emit('pause')
    }
  }

  // When fullscreen button hovered
  elems.fullscreenBtn.onmouseenter = () => {
    icons.fullscreen.change('expand')
    setTimeout(() => {
      icons.fullscreen.change('normal')
    }, 150)
  }

  // When windowed button hovered
  elems.windowedBtn.onmouseenter = () => {
    icons.windowed.change('shrink')
    setTimeout(() => {
      icons.windowed.change('normal')
    }, 150)
  }

  // When fullscreen button clicked
  elems.fullscreenBtn.onclick = () => {
    // Enter fullscreen
    controls.emit('fullscreen', true)
  }

  // When windowed button clicked
  elems.windowedBtn.onclick = () => {
    // Exit fullscreen
    controls.emit('fullscreen', false)
  }
}
