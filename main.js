import fs from 'fs'
import electron, { app, dialog, globalShortcut, ipcMain } from 'electron'
import { initDatabase } from './database-config'
import dirTree from 'directory-tree'
// Module to control application life.
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

// init the projects database
let db = initDatabase()

const path = require('path')
const url = require('url')

const registerGlobalShortcuts = (win) => {
  globalShortcut.register('CmdOrCtrl+N', () => {
    win.webContents.send('create-new-file')
  })

  globalShortcut.register('CmdOrCtrl+O', () => {
    selectProjectDirectory(win)
  })

  globalShortcut.register('CmdOrCtrl+Shift+B', () => {
    console.log('Should invoke Hugo to build project...')
  })
}

const selectProjectDirectory = (win) => {
  dialog.showOpenDialog(win, {properties: ['openDirectory']}, (selectedDirs) => {
    let selectedDir = ''
    let contentTree = {}
    if (selectedDirs && selectedDirs.length === 1) {
      selectedDir = selectedDirs[0]
      contentTree = dirTree(`${selectedDir}/content`)
    }

    win.webContents.send('project-directory-selected', selectedDir, contentTree)
  })
}

const unregisterGlobalShortcuts = () => {
  globalShortcut.unregisterAll()
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 1024, height: 800})

  registerGlobalShortcuts(mainWindow)

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  if (process.env.ENV === 'development') {
    mainWindow.webContents.openDevTools()
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('will-quit', () => {
  unregisterGlobalShortcuts()
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

ipcMain.on('get-project-list', (event, arg) => {
  console.log(arg)
  let projects = db.getCollection('projects')
  event.sender.send('fetched-project-list', projects)
})

ipcMain.on('open-a-project', (event, arg) => {
  selectProjectDirectory(mainWindow)
})

ipcMain.on('open-file', (event, filePath) => {
  const file = fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      // do something about the error, maybe an new event?
      event.sender.send('error-opening-file', err, filePath)
    } else {
      event.sender.send('file-opened', data)
    }
  })
})
