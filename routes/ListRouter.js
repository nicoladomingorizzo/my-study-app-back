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
//esporto il router
module.exports = router;