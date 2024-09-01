const Farm = require('../models/farm')
const Farmer=require('../models/Farmer');
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // specify the directory where you want to store the images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()  + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

const addFarm = async (req, res) => {
    try {
        const { farmName, area, category } = req.body;
        const image = req.file ? req.file.filename : undefined;

        if (!image) {
            return res.status(400).json({ message: "Image is required" });
        }

        const farmer = await Farmer.findById(req.farmerId);
        if (!farmer) {
            return res.status(404).json({ message: "Farmer Not Found" });
        }

        const farm = new Farm({
            farmName,
            area,
            category,
            image,
            farmer: farmer._id
        });

       const savedFarm= await farm.save();
       farmer.farm.push(savedFarm)
       await farmer.save()
        return res.status(200).json({ message: 'Farm Added Successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json("Internal Server Error");
    }
};
const deleteFarmById=async(req,res)=>{
  try{
      const farmId=req.params.farmId;
      const deleteProduct = await Farm.findByIdAndDelete(farmId)

      if(!deleteProduct){
          return res.status(404).json({error:"No Product Found"})
      }   
  }  catch(error)
  {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = { addFarm: [upload.single('image'), addFarm],deleteFarmById };
