// Require electron
const {app, BrowserWindow, Menu} = require('electron')

// Require localshortcut
const localshortcut = require('electron-localshortcut')

// Debugging shortcuts
require('electron-debug')()

// Keep win alive
let win

// Create window
app.createWindow = function () {
  // Remove menu bar
  Menu.setApplicationMenu(null)

  // Create the browser window.
  win = new BrowserWindow({
    title: 'peak',
    useContentSize: true,
    width: 640,
    height: 360,
    icon: './images/icon.png'
  })

  // Create shortcuts
  localshortcut.register(win, 'Left', function () {
    win.webContents.send('key', 'left')
  })
  localshortcut.register(win, 'Right', function () {
    win.webContents.send('key', 'right')
  })
  localshortcut.register(win, 'Up', function () {
    win.webContents.send('key', 'up')
  })
  localshortcut.register(win, 'Down', function () {
    win.webContents.send('key', 'down')
  })
  localshortcut.register(win, 'Space', function () {
    win.webContents.send('key', 'space')
  })
  localshortcut.register(win, 'Esc', function () {
    win.webContents.send('key', 'esc')
  })

  // On crash
  win.webContents.on('crashed', (err) => {
    // Show error
    console.error(err)
  })

  // On unresponsive
  win.on('unresponsive', (err) => {
    // Show error
    console.error(err)
  })

  // Load index.html
  win.loadURL(`file://${__dirname}/www/index.html`)

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Remove window
    win = null
  })
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // Keep app alive if macOS
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// On click
app.on('activate', () => {
  // Start if not open
  if (win === null) {
    app.createWindow()
  }
})

// Expose app to exports
module.exports = app
