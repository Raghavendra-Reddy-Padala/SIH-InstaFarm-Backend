const express =require('express')
const verifyToken=require('../middlewares/verifyzToken')
const farmcontroller = require('../controllers/farmcontroller')


const router = express.Router()

router.post('/add-farm',verifyToken,farmcontroller.addFarm)
router.get("/uploads/:imageName",(req,res)=>{
    const imageName=req.params.imageName;
    res.headersSent('content-Type','image/jpeg')
    res.sendFile(path.join(__dirname,'..','uploads',imageName));
});
router.delete('/:farmId',farmcontroller.deleteFarmById);


module.exports=router;