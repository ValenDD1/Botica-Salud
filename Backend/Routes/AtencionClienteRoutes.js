const express=require('express');
const router=express.Router();
const atencionClienteController=require('../controllers/atencionClienteController');

router.get('/',atencionClienteController.getAtencionClientes);
router.post('/',atencionClienteController.addAtencionCliente);


module.exports=router;