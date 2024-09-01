const mongoose = require('mongoose')
const Farmer = require('./Farmer')

const farmSchema= new mongoose.Schema({
    farmName:{
        type : String,
        required : true,
        unique: true
    },
    area:{
        type:String,
        required:true,
    },
    category:{
        type:[
            {
                type:String,
                enum:['Staple Farm','Dairy Farm','Organic Farm','Poultry Farm','Flower Farm']
            }
        ]
    },
    // offer:{
    //     type:String,
    // },
    image:{
        type:String,
    },
    Farmer:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Farmer'
        }
    ],
    product:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
      }]
})
const Farm=mongoose.model('Farm',farmSchema);
module.exports=Farm