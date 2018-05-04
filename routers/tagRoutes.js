import express from 'express';
import TagController from '../controllers/TagController';

const tagRoutes = express.Router();
const { getTags, getTag, getPostTags, createTag, updateTag, deleteTag } = TagController;
// 

tagRoutes.get('/', getTags);
tagRoutes.get('/:id', getTag);
tagRoutes.post('/', createTag);
tagRoutes.put('/:id', updateTag);
tagRoutes.delete('/:id', deleteTag);

export default tagRoutes;