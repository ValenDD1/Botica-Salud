const express=require('express');
const router=express.Router();
const historyController=require('../controllers/HistoryController');

router.get('/inventario',historyController.getHistoryinventory);
router.get('/consultas',historyController.getHistoryConsultas);
router.get('/ganancias',historyController.getHistoryGanancias);

module.exports=router;