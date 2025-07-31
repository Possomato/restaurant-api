import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('products').del()

  // Inserts seed entries
  await knex('products').insert([
    { name: 'Carbonara', price: 40 },
    { name: 'Spaghetti ao Pesto', price: 35 },
    { name: 'Risoto de Cogumelos', price: 45 },
    { name: 'Filé Mignon com Fritas', price: 55 },
    { name: 'Hambúrguer Artesanal', price: 30 },
    { name: 'Pizza Margherita', price: 38 },
    { name: 'Salada Caesar', price: 28 },
    { name: 'Lasagna Bolonhesa', price: 42 },
    { name: 'Tábua de Frios', price: 50 },
    { name: 'Frango Grelhado com Legumes', price: 37 },
    { name: 'Camarão ao Alho e Óleo', price: 60 },
    { name: 'Moqueca Baiana', price: 58 },
    { name: 'Bife à Parmegiana', price: 48 },
    { name: 'Sopa de Abóbora', price: 25 },
    { name: 'Nhoque ao Sugo', price: 34 },
    { name: 'Torta de Frango', price: 32 },
    { name: 'Panqueca de Carne', price: 33 },
    { name: 'Ceviche de Tilápia', price: 44 },
    { name: 'Escondidinho de Carne Seca', price: 39 },
    { name: 'Arroz de Polvo', price: 52 },
  ])
}
