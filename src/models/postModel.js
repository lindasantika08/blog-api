import pool from '../config/db.js';

export const getAllPosts = async (term = '') => {
  const [rows] = await pool.query(
    `SELECT * FROM posts 
     WHERE title LIKE ? OR content LIKE ? OR category LIKE ? 
     ORDER BY createdAt DESC`,
    [`%${term}%`, `%${term}%`, `%${term}%`]
  );
  return rows;
};

export const getPostById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM posts WHERE id = ?', [id]);
  return rows[0];
};

export const createPost = async ({ title, content, category, tags }) => {
  const [result] = await pool.query(
    `INSERT INTO posts (title, content, category, tags, createdAt, updatedAt)
     VALUES (?, ?, ?, ?, NOW(), NOW())`,
    [title, content, category, JSON.stringify(tags)]
  );
  return getPostById(result.insertId);
};

export const updatePost = async (id, { title, content, category, tags }) => {
  await pool.query(
    `UPDATE posts 
     SET title=?, content=?, category=?, tags=?, updatedAt=NOW()
     WHERE id=?`,
    [title, content, category, JSON.stringify(tags), id]
  );
  return getPostById(id);
};

export const deletePost = async (id) => {
  const [result] = await pool.query('DELETE FROM posts WHERE id = ?', [id]);
  return result.affectedRows > 0;
};
