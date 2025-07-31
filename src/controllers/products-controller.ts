import { NextFunction, Request, Response } from 'express'
import { knex } from '@/database/knex'
import { z } from 'zod'
import { AppError } from '@/utils/AppError'

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
      const { name } = req.query
      const products = await knex<ProductTable>('products')
        .select()
        .whereLike('name', `%${name ?? ''}%`)
        .orderBy('price')
      return res.json(products)
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

      const bodySchema = z.object({
        name: z.string().trim().min(3),
        price: z.number().gt(0),
      })

      const { name, price } = bodySchema.parse(req.body)

      await knex<ProductTable>('products').update({ name, price }).where({ id })

      res.json()
    } catch (e) {
      next(e)
    }
  }

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const id = z
        .string()
        .transform((value) => Number(value))
        .refine((value) => !isNaN(value), { message: 'id must be a number' })
        .parse(req.params.id)

      const product = await knex<ProductTable>('products')
        .select()
        .where({ id })
        .first()

      if(!product){
        throw new AppError('Product not found')
      }

      await knex<ProductTable>('products').delete().where({ id })
      res.json()
    } catch (e) {
      next(e)
    }
  }
}
