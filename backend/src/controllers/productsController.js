import { pool } from '../config/db.js';

export const getAllProducts = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const createProduct = async (req, res) => {
  const { name, description, price, supplier_id, category_id } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO products (name, description, price, supplier_id, category_id)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [name, description, price, supplier_id, category_id]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
