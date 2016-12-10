'use strict'

// Require ipcRenderer
const ipc = require('electron').ipcRenderer

// Expose function
module.exports = (controls, elems, win, classes, config, lib) => {
  ipc.on('key', (event, name) => {
    switch (name) {
      case 'left': {
        controls.emit('move', -5)
        break
      }
      case 'right': {
        controls.emit('move', 5)
        break
      }
      case 'up': {
        controls.emit('volume', 1)
        break
      }
      case 'down': {
        controls.emit('volume', -1)
        break
      }
      case 'space': {
        controls.emit('togglePlay')
        break
      }
      case 'esc': {
        controls.emit('fullscreen', false)
        break
      }
    }
  })
}
