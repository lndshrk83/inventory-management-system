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
