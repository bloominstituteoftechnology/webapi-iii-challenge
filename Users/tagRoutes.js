import express from 'express';
import TagController from '../Controllers/TagControllers';

const TagRouter = express.Router();
const { getTags, createTag, updateTag, removeTag } = TagController; 

TagRouter.get('/:id', getTags);
TagRouter.post('/', createTag);
TagRouter.put('/:id', updateTag);
TagRouter.delete('/:id', removeTag);

export default TagRouter;