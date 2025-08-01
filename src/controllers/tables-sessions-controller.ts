import { knex } from '@/database/knex'
import { AppError } from '@/utils/AppError'
import { Response, Request, NextFunction } from 'express'
import { z } from 'zod'

export class TablesSessionsController {
  async create(req: Request, res: Response, next: NextFunction) {
    const bodySchema = z.object({
      table_id: z.number(),
    })

    const { table_id } = bodySchema.parse(req.body)

    await knex('tables_sessions').insert({
      table_id,
    })

    res.status(201).json()
  }

  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const sessions = await knex<TablesSessionsTable>(
        'tables_sessions',
      ).orderBy('closed_at')

      return res.json(sessions)
    } catch (e) {
      next(e)
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = z
        .string()
        .transform((value) => Number(value))
        .refine((value) => !isNaN(value), { message: 'id must be a number' })
        .parse(req.params.id)

      const session = await knex<TablesSessionsTable>('tables_sessions')
        .where({ id })
        .first()

      if (!session) {
        throw new AppError('session table not found')
      }

      if (session.closed_at) {
        throw new AppError('this session table is already closed')
      }

      await knex<TablesSessionsTable>('tables_sessions')
        .update({ closed_at: knex.fn.now() })
        .where({ id })

      return res.json()
    } catch (e) {
      next(e)
    }
  }
}
