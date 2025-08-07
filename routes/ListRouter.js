//importo express
const express = require('express');
//definisco il router
const router = express.Router();
//importo il controller
const listController = require('../controllers/ListController');

//index
router.get('/', listController.index)

//store
router.post('/', listController.store)

//update
router.put('/:id', listController.update)

//destroy
router.delete('/:id', listController.destroy)

//esporto il router
module.exports = router;