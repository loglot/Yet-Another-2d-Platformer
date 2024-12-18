const {protocol, app, BrowserWindow } = require('electron')
const createWindow = () => {
const win = new BrowserWindow({
  width: 192000,
  height: 108000,
  icon: __dirname + '/icon.ico',
  transparent: true, frame: false
})

  win.loadFile('index.html')
}
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
app.whenReady().then(() => {
  createWindow()
  win.setFullScreen(true)

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})