const express = require('express');
const router = express.Router();

const productController = require('../controllers/productcontroller');

router.post('/add-product/:farmId', productController.addProduct);
router.get('./:farmId/products',productController.getproductByfarm);
router.get("/uploads/:imageName",(req,res)=>{
    const imageName=req.params.imageName;
    res.headersSent('content-Type','image/jpeg')
    res.sendFile(path.join(__dirname,'..','uploads',imageName));
})
router.delete('/:productId',productController.deleteProductById);
module.exports = router;  