import express from 'express';
import { relationshipController } from '../controllers/relationship.js';

const router = express.Router();

router.get('/', relationshipController.getRelationships);
router.post('/', relationshipController.addRelationship);
router.delete('/', relationshipController.deleteRelationship);

export default router;
