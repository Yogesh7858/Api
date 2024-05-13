const mongoose =require ("mongoose");

const connectDb = (uri) => {
    console.log("in the database");
    return mongoose.connect(uri);
};
module.exports=connectDb;