import fs from 'fs'
import loki from 'lokijs'

const init = () => {
  const userHome = process.env.APPDATA || process.env.HOME
  const projectDbFileName = '.stringerdb'
  const dbFile = `${userHome}/${projectDbFileName}`

  console.log('Initializing the database in ', dbFile)

  if (!fs.existsSync(dbFile)) {
    console.log('Database did NOT exist, creating it now')
    fs.writeFile(dbFile, '', (err) => {
      if (err) {
        console.error('Error creating the empty database file', err)
      }
    })

    while (true) {
      if (fs.existsSync(dbFile)) {
        console.log('Database file found at', dbFile)
        break
      }

      console.log('Waiting for the blank db file to be created...')
    }
  }

  let db = new loki(dbFile, {
    autoload: true,
    autoloadCallback: onDbAutoload,
    autosave: true,
    autosaveInterval: 125,
    verbose: process.env.ENV === 'development'
  })

  function onDbAutoload() {
    console.log('Database loaded!')
    initProjectsCollection(db)
  }

  return db
}

const initProjectsCollection = (db) => {
  let projectsCollection = db.getCollection('projects')
  if (!projectsCollection) {
    console.log('[projects] collection did not exist, creating it now')
    projectsCollection = db.addCollection('projects')
  }
  return projectsCollection
}

export function initDatabase() {
  return init()
}
