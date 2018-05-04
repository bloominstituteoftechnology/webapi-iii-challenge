import express from 'express';
import TagController from '../Controllers/TagController';

const TagRouter = express.Router();
const { getTag, createTag, updateTag, removeTag } = TagController;

TagRouter.get('/:id', getTag);
TagRouter.post('/', createTag);
TagRouter.put('/:id', updateTag);
TagRouter.delete('/:id', removeTag);

export default TagRouter;
