import { pool } from '../config/db.js';

export const getAllSuppliers = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM suppliers');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const createSupplier = async (req, res) => {
  const { name, contact_email, phone, address } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO suppliers (name, contact_email, phone, address)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [name, contact_email, phone, address]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
