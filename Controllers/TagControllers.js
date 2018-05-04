import TagHelpers from '../data/helpers/tagDb';

const TagController = {
	getTags: (req, res) => {
		const { id } = req.params;
		TagHelpers.get(id)
			.then(tag => {
				if('tag' in tag) {
					return res.status(200).json(tag);
				}
				return res.status(404).json({error: 'Cannot find tag'});
			})
			.catch(err => res.status(404).json({error: 'Cannot find tag'}));
	},
	createTag: (req, res) => {
		const tag = req.body;
		if('tag' in tag) {
			TagHelpers.insert(tag)
				.then(id => {
					return res.status(201).json({success: `tag with the id: ${id.id} was created`});
				})
				.catch(err => res.status(500).json({error: 'could not save new tag'}));
		}
	},
	updateTag: (req, res) => {
		const { id } = req.params;
		const tag = req.body;
		if('tag' in tag) {
			TagHelpers.update(id, tag)
				.then(() => res.status(200).json({success: `updated ${tag.tag}`}))
				.catch(err => res.status(404).json({error: `could not update ${tag.tag}`}));
		} else {
			return res.status(404).json({error: 'invalue parameters'});
		}
	},
	removeTag: (req, res) => {
		const { id } = req.params;
		TagHelpers.remove(id)
			.then(() => res.status(200).json({success: `removed tag with the id of ${id}`}))
			.catch(err => res.status(500).json({error: 'something went wrong'}));
	}
}

export default TagController;