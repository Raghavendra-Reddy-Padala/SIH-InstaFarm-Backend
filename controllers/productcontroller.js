const path = require('path');
const multer = require('multer');
const Farm = require("../models/farm");
const Product = require("../models/product");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // specify the directory where you want to store the images
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); // unique filename with extension
    }
});

const upload = multer({ storage: storage });

const addProduct = async (req, res) => {
    try {
        const { productName, price, category, description } = req.body;
        const image = req.file ? req.file.filename : undefined; // Get the filename of the uploaded image
        const farmId = req.params.farmId;

        const farm = await Farm.findById(farmId);
        if (!farm) {
            return res.status(404).json({ error: 'No Farm Found' });
        }

        if (!image) {
            return res.status(400).json({ error: "Image is required" });
        }

        const product = new Product({
            productName,
            price,
            category,
            description,
            image, 
            farm: farm._id
        });

        const savedProduct = await product.save();
        farm.product.push(savedProduct);
        await farm.save();

        res.status(200).json(savedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
const getproductByfarm = async(req,res)=>{
    try{
        const farmId = req.params.farmId;
        const farm = await Farm.findById(farmId)
        if(!farm){
            return res.status(404).json({error:"No Farm Found"});
        }
        const restaurantName=farm.farmName;
        const products=await Product.find({farm:farmId});
        res.status(200).json(restaurantName, products);
    }
    catch(error)
        {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    
}
const deleteProductById=async(req,res)=>{
    try{
        const productId=req.params.productId;
        const deleteProduct = await Product.findByIdAndDelete(productId);

        if(!deleteProduct){
            return res.status(404).json({error:"No Product Found"})
        }   
    }  catch(error)
    {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = { addProduct: [upload.single('image'), addProduct] ,getproductByfarm,deleteProductById};
