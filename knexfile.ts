export default {
  client: 'sqlite3',
  connection: {
    filename: './src/database/database.bd',
  },
  pool: {
    afterCreate: (connection: any, done: any) => {
      connection.run('PRAGMA foreign_keys = on')
      done()
    },
  },
  useNullAsDefault: true,
  migrations: {
    extensions: 'ts',
    directory: './src/database/migrations',
  },
  seeds: {
    extensions: 'ts',
    directory: './src/database/migrations',
  },
}
