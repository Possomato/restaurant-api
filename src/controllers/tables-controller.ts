import { knex } from '@/database/knex'
import { Request, Response, NextFunction } from 'express'
import { z } from 'zod'

export class TablesController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { table_number } = req.body

      await knex('tables').insert({ table_number })
      res.status(201).json()
    } catch (e) {
      next(e)
    }
  }

  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const tables = await knex<TablesTable>('tables')
        .select()
        .orderBy('table_number')
      res.json(tables)
    } catch (e) {
      next(e)
    }
  }

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params

      await knex('tables').delete().where({ id })
      res.json()
    } catch (e) {
      next(e)
    }
  }
}
