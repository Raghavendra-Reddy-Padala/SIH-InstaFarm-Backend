// farmerController.js
const bcrypt = require("bcryptjs");
const dotEnv = require("dotenv");
const jwt = require('jsonwebtoken')
const Farmer = require("../models/Farmer");

dotEnv.config()

const secretKey = process.env.JKEY;


// Farmer registration controller
const farmerRegister = async (req, res) => {
  const { username, email, phoneNumber, password } = req.body;

  try {
    const existingFarmerByEmail = await Farmer.findOne({ email });
    if (existingFarmerByEmail) {
      return res.status(400).json("Email already taken");
    }

    const existingFarmerByPhoneNumber = await Farmer.findOne({ phoneNumber });
    if (existingFarmerByPhoneNumber) {
      return res.status(400).json("Phone number already taken");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newFarmer = new Farmer({
      username,
      email,
      phoneNumber, // Include phoneNumber in the new Farmer object
      password: hashedPassword,
    });

    await newFarmer.save();

    res.status(201).json({ message: "Farmer registered successfully" });
    console.log("Farmer registered");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const farmerLogin = async (req, res) => {
    const { phoneNumberOrEmail, password } = req.body;

    try {
        // Find farmer by phone number or email
        const farmer = await Farmer.findOne({
            $or: [{ phoneNumber: phoneNumberOrEmail }, { email: phoneNumberOrEmail }]
        });

        if (!farmer || !(await bcrypt.compare(password, farmer.password))) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign({ farmerId: farmer._id ,username:farmer.username}, secretKey, { expiresIn: "1h" });
        res.status(200).json({ success: "Login Successful", token });
        console.log(`${farmer.email} logged in. Token: ${token}`);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}
const getAllFarmers= async(req,res)=>{
  try{
    const farmers=await Farmer.find().populate('farm');
    res.json({farmers})
  }catch(error){
    console.log(error);
    res.status(500).json({error:"Internal Server Error"});

  }
}

const getfarmerbyId = async(req,res)=>{
  const farmerId = req.params.id;
  try{
const farmer = await Farmer.findById(farmerId).populate('farm');
if(!farmer){
  return res.status(404).json({error:"Farmer Not Found"})
}
res.status(200).json({farmer})
  }catch(error){
    console.log(error)
    res.status(500).json({error:"Internal Server Error"})
  }
}
module.exports = { farmerRegister,farmerLogin ,getAllFarmers,getfarmerbyId};
