/**
 * Database adapter for FeatherSoar (SQLite wrapper)
 */

const DEFAULT_DB_NAME = 'feathersoar.db'
const DEFAULT_DB_VERSION = 1

const CREATE_TABLE_SQL = `
  CREATE TABLE IF NOT EXISTS sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    mode TEXT,
    start_time INTEGER,
    end_time INTEGER,
    duration INTEGER,
    calories REAL,
    max_speed REAL,
    avg_heart_rate REAL,
    max_heart_rate REAL,
    min_heart_rate REAL,
    strokes INTEGER,
    smashes INTEGER,
    forehand INTEGER,
    backhand INTEGER,
    notes TEXT,
    heart_rate_series TEXT,
    speed_series TEXT,
    updated_at INTEGER
  )
`

const ALTER_TABLE_HEART_RATE_SERIES = `ALTER TABLE sessions ADD COLUMN heart_rate_series TEXT`
const ALTER_TABLE_SPEED_SERIES = `ALTER TABLE sessions ADD COLUMN speed_series TEXT`
const ALTER_TABLE_UPDATED_AT = `ALTER TABLE sessions ADD COLUMN updated_at INTEGER`

const CREATE_INDEX_SQL = `CREATE INDEX IF NOT EXISTS idx_sessions_start_time ON sessions(start_time)`

const CREATE_SETTINGS_TABLE_SQL = `
  CREATE TABLE IF NOT EXISTS user_settings (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    data TEXT,
    updated_at INTEGER
  )
`

let initPromise = null

function ensureSessionColumns() {
  const hasTableSql = `SELECT name FROM sqlite_master WHERE type='table' AND name='sessions'`

  return executeSqlInternal(hasTableSql)
    .then(result => {
      if (!result || !result.rows || result.rows.length === 0) {
        return false
      }

      return executeSqlInternal('PRAGMA table_info(sessions)')
    })
    .then(info => {
      if (!info || !info.rows || info.rows.length === 0) {
        return false
      }

      const columns = info.rows.map(row => row.name)
      const tasks = []

      if (!columns.includes('heart_rate_series')) {
        tasks.push(executeSqlInternal(ALTER_TABLE_HEART_RATE_SERIES))
      }

      if (!columns.includes('speed_series')) {
        tasks.push(executeSqlInternal(ALTER_TABLE_SPEED_SERIES))
      }

      if (!columns.includes('updated_at')) {
        tasks.push(executeSqlInternal(ALTER_TABLE_UPDATED_AT))
      }

      if (!tasks.length) return true
      return Promise.all(tasks).then(() => true)
    })
    .catch(err => {
      console.error('Ensure session columns failed:', err)
      return false
    })
}

function openDatabase() {
  return new Promise((resolve, reject) => {
    if (!global.database || typeof global.database.openOrCreate !== 'function') {
      resolve(null)
      return
    }

    try {
      global.database.openOrCreate({
        name: DEFAULT_DB_NAME,
        version: DEFAULT_DB_VERSION,
        success: (data) => resolve(data),
        fail: (data, code) => reject(new Error(`open database failed: ${code}`))
      })
    } catch (e) {
      reject(e)
    }
  })
}

function executeSqlInternal(sql, args = []) {
  return new Promise((resolve, reject) => {
    if (!global.database || typeof global.database.executeSql !== 'function') {
      resolve({ rows: [], rowsAffected: 0, insertId: 0 })
      return
    }

    try {
      global.database.executeSql({
        sql,
        args,
        success: (data) => resolve(data || { rows: [], rowsAffected: 0, insertId: 0 }),
        fail: (data, code) => reject(new Error(`execute sql failed: ${code}`))
      })
    } catch (e) {
      reject(e)
    }
  })
}

function init() {
  if (initPromise) return initPromise

  initPromise = openDatabase()
    .then(() => executeSqlInternal(CREATE_TABLE_SQL))
    .then(() => executeSqlInternal(CREATE_INDEX_SQL))
    .then(() => executeSqlInternal(CREATE_SETTINGS_TABLE_SQL))
    .then(() => ensureSessionColumns())
    .then(() => true)
    .catch(err => {
      console.error('Database init failed:', err)
      return false
    })

  return initPromise
}

function executeSql({ sql, args = [] }) {
  if (!initPromise) {
    initPromise = init()
  }

  return initPromise.then(() => executeSqlInternal(sql, args))
}

export default {
  init,
  executeSql
}
