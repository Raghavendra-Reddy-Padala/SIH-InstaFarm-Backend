const farmer=require('../models/Farmer');
const jwt=require('jsonwebtoken');
const dotEnv=require('dotenv');
const Farmer = require('../models/Farmer');

dotEnv.config()
const secretKey=process.env.JKEY


const verifyToken = async (req, res, next) => {
    const token = req.headers.token;
    if (!token) {
        return res.status(401).json({ error: "Token is required" });
    }
    try {
        const decoded = jwt.verify(token, secretKey); 
        const farmer = await Farmer.findById(decoded.farmerId);
        if (!farmer) {
            return res.status(404).json({
                error: "Farmer Not Found"
            });
        }
        req.farmerId = farmer._id;
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Invalid Token" });  // Updated error message
    }
};


module.exports=verifyToken