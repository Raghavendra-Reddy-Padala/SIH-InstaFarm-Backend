const mongoose = require('mongoose');

const productschema = new mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    category:{
        type:[
            {
                type:String,
                enum:['Staple Farm','Dairy Farm','Organic Farm','Poultry Farm','Flower Farm']
            }
        ]
    },
    image:{
        type:String
    },
    description:{
        type:String
    },
    farm:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Farm'
      }]
});

const Product = mongoose.model('Product',productschema)
module.exports=Product