const mongoose=require("mongoose");

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:[true,"price is mandatory"],
    },
    rating:{
        type:Number,
        required:true,
    },
    name:{
        type:String,
        required:true,
    }
});

module.exports=mongoose.model('Product',productSchema)