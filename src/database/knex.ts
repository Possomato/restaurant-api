import pkg from 'knex'
import config from '../../knexfile'

export const knex = pkg(config)