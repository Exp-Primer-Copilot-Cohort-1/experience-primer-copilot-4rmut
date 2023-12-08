// Create web server using express
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {randomBytes} = require('crypto');

const app = express();
// Use body parser to parse json data
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

// Get all comments for a post
app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});
// Create a new comment for a post
app.post('/posts/:id/comments', (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  // Get the body of the request
  const {content} = req.body;
  // Get the comments for this post
  const comments = commentsByPostId[req.params.id] || [];
  // Add the new comment to the list
  comments.push({id: commentId, content});
  // Save the comments for this post
  commentsByPostId[req.params.id] = comments;
  // Send the comment to the client
  res.status(201).send(comments);
});

app.listen(4001, () => {
  console.log('Listening on 4001');
});