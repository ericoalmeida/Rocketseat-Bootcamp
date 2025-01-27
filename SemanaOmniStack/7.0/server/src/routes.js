const express = require('express');
const multer = require('multer');

const uploadsConfig = require('./config/upload');
const PostController = require('./controllers/PostController');
const LikeController = require('./controllers/LikeController');

const routes = new express.Router();
const upload = multer(uploadsConfig);

routes.get('/', (req, res) => {
  return res.json({ok: true})
})

routes.get('/posts', PostController.index);
routes.post('/posts', upload.single('image'), PostController.store);
routes.post('/posts/:id/like', LikeController.store);


module.exports = routes
