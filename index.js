// Require electron
const {app, BrowserWindow, Menu} = require('electron')

// Keep win alive
let win

// Create window
function createWindow () {
  // Remove menu bar
  // Menu.setApplicationMenu(null)

  // Create the browser window.
  win = new BrowserWindow({
    title: 'chair',
    width: 800,
    height: 600
  })

  // Load index.html
  win.loadURL(`file://${__dirname}/www/index.html`)

  // Open the DevTools.
  // win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Remove window
    win = null
  })
}

// When app ready
app.on('ready', createWindow)

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
    createWindow()
  }
})
