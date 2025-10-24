import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from '../models/postModel.js';

export const getPosts = async (req, res) => {
  try {
    const term = req.query.term || '';
    const posts = await getAllPosts(term);
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getPost = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await getPostById(id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createNewPost = async (req, res) => {
  try {
    console.log('=== CREATE POST DEBUG ===');
    console.log('req.body:', req.body);
    console.log('Content-Type:', req.get('Content-Type'));
    
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ 
        message: 'Request body is empty',
        received: req.body 
      });
    }
    
    let { title, content, category, tags } = req.body;
    
    // Handle tags: bisa string (dari form-data) atau array (dari JSON)
    if (typeof tags === 'string') {
      // Jika string, split by comma atau parse JSON
      try {
        tags = JSON.parse(tags);
      } catch {
        tags = tags.split(',').map(t => t.trim());
      }
    }
    
    if (!title || !content) {
      return res.status(400).json({ 
        message: 'Title and content are required',
        received: { title, content, category, tags }
      });
    }

    const post = await createPost({ title, content, category, tags });
    res.status(201).json(post);
  } catch (err) {
    console.error('Error creating post:', err);
    res.status(500).json({ error: err.message });
  }
};

export const updateExistingPost = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await getPostById(id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    let { title, content, category, tags } = req.body;
    
    // Handle tags seperti di createNewPost
    if (typeof tags === 'string') {
      try {
        tags = JSON.parse(tags);
      } catch {
        tags = tags.split(',').map(t => t.trim());
      }
    }
    
    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    const updated = await updatePost(id, { title, content, category, tags });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteExistingPost = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await deletePost(id);
    if (!deleted) return res.status(404).json({ message: 'Post not found' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};