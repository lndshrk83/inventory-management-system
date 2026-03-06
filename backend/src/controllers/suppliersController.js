import { pool } from '../config/db.js';

export const getAllSuppliers = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM suppliers');
    res.json(result.rows);
  } catch (error) {
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
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateSupplier = async (req, res) => {
  const { id } = req.params;
  const { name, contact_email, phone, address } = req.body;

  try {
    const result = await pool.query(
      `UPDATE suppliers
       SET name = $1, contact_email = $2, phone = $3, address = $4
       WHERE id = $5
       RETURNING *`,
      [name, contact_email, phone, address, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Supplier not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const deleteSupplier = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `DELETE FROM suppliers WHERE id = $1 RETURNING *`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Supplier not found' });
    }

    res.json({ message: 'Supplier deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
