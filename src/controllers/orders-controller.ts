import { knex } from '@/database/knex'
import { AppError } from '@/utils/AppError'
import { Request, Response, NextFunction } from 'express'
import { z } from 'zod'

class OrdersController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        table_session_id: z.number(),
        product_id: z.number(),
        quantity: z.number(),
      })

      const { table_session_id, product_id, quantity } = bodySchema.parse(
        req.body,
      )

      const session = await knex<TablesSessionsTable>('tables_sessions')
        .where({ id: table_session_id })
        .first()

      if (!session || session.closed_at) {
        throw new AppError('Not found an open table with this id')
      }

      const product = await knex<ProductTable>('products')
        .where({ id: product_id })
        .first()

      if (!product) {
        throw new AppError('product not found')
      }

      await knex<OrderTable>('orders').insert({
        table_session_id,
        product_id,
        quantity,
        price: product.price
      })

      res.status(201).json()
    } catch (e) {
      next(e)
    }
  }
}

export { OrdersController }
