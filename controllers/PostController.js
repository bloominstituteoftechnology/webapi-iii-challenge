import PostHelpers from '../data/helpers/postDb';
import postsdb from '../data/seeds/03-posts';
import posttagsdb from '../data/seeds/04-posttags';

const PostController = {
  getPosts: (req, res) => {
    postsdb
      PostHelpers.get()
      .then(posts => {
        res.json(posts);
      })
      .catch(err => {
        res.status(500).json({ error: err });
      });
  },

  getPost: (req, res) => {
    postsdb
      PostHelpers.get(req.params.id)
      .then(post => {
        res.json(post);
      })
      .catch(err => {
        res.status(500).json({ error: err });
      });
  },

  getPostTags: (req, res) => {
    posttagsdb
      PostHelpers.getPostTags(req.params.id)
      .then(postTags => {
        res.json(postTags);
      })
      .catch(err => {
        res.status(500).json({ error: err });
      });
  },

  createPost: (req, res) => {
    postsdb
      PostHelpers.insert(req.body)
      .then(newPost => {
        res.json(newPost);
      })
      .catch(err => {
        res.status(500).json({ error: err });
      });

  },

  updatePost: (req, res) => {
    postsdb
      PostHelpers.update(req.params.id, req.body)
      .then(post => {
        res.json(post);
      })
      .catch(err => {
        res.status(500).json({ error: err });
      });
  },

  deletePost: (req, res) => {
    postsdb
      PostHelpers.remove(req.params.id)
      .then(post => {
        res.json({ msg: 'Post deleted.' })
      })
      .catch(err => {
        res.status(500).json({ error: err });
      });
  }
}

export default PostController;