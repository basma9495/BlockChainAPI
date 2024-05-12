const express = require('express');
const blockController = require('/controllers/blockController');

const router = express.Router();


router.post('/', blockController.createBlock);
router.get('/', blockController.getAllBlocks);
router.get('/:blockId', blockController.getBlockById);

module.exports = router;
