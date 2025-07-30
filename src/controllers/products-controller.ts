import { NextFunction, Request, Response } from 'express'
import { knex } from '@/database/knex'
import { z } from 'zod'

export class ProductsController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        name: z.string().trim().min(3),
        price: z.number().gt(0),
      })

      const { name, price } = bodySchema.parse(req.body)
      await knex<ProductTable>('products').insert({ name, price })
      res.status(201).json({ name, price })
    } catch (e) {
      next(e)
    }
  }

  async index(req: Request, res: Response, next: NextFunction) {
    try {
      return res.json({ message: 'ok' })
    } catch (e) {
      next(e)
    }
  }
}
