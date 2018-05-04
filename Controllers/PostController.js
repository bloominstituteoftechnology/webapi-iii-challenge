import PostHelpers from '../data/helpers/postDb';

const PostController = {
	getpost: (req, res) => {
		const { id } = req.params;
		PostHelpers.get(id)
			.then(post => {
				if ('postedBy' in post) {
					return res.status(200).json(post);
				}
				return res.status(404).json({ error: 'Cannot find post' });
			})
			.catch(err => res.status(500).json({ error: 'Cannot find post' }));
	},
	getPostTags: (req, res) => {
		const { id } = req.params;
		PostHelpers.get(id).then(posts => {
			if ('postedBy' in post) {
				PostHelpers.getPostTags(id)
					.then(tags => {
						return res.status(200).json(tags);
					})
					.catch(err =>
						res.status(500).json({ error: 'Something went wrong' }),
					);
			} else {
				return res.staus(404).json({ error: 'Cannot find post' });
			}
		});
	},
	createPost: (req, res) => {
		const post = req.body;
		if ('text' in post && 'postedBy' in post) {
			PostHelpers.insert(post)
				.then(id => {
					return res
						.status(201)
						.json({ success: `post with the id: ${id.id} was created` });
				})
				.catch(err =>
					res.status(500).json({ error: 'could not save new post' }),
				);
		} else {
			res.status(500).json({ error: 'missing params' });
		}
	},
	updatePost: (req, res) => {
		const { id } = req.params;
		const post = req.body;
		if ('text' in post && 'postedBy' in post) {
			PostHelpers.update(id, post)
				.then(() => res.status(200).json({ success: `updated ${id}` }))
				.catch(err =>
					res.status(404).json({ error: `could not update ${id}` }),
				);
		} else {
			return res.status(404).json({ error: 'invalue parameters' });
		}
	},
	removePost: (req, res) => {
		const { id } = req.params;
		PostHelpers.remove(id)
			.then(() =>
				res.status(200).json({ success: `removed post with the id of ${id}` }),
			)
			.catch(err => res.status(500).json({ error: 'something went wrong' }));
	},
};

export default PostController;
