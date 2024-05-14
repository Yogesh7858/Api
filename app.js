require("dotenv").config();
const express= require("express");
const app =express();
const product_routes =require('./routes/products');
const connectDb =require("./db/connect");
const actualData=require("./products.json")

const port=process.env.port||5000;



app.get("/",(req,res) => {
    console.log("ram");
    res.send("hii i am connected")
})

app.use("/api/products",product_routes);
app.use(express.json());


app.post('/api/products', async(req, res) => {
    let data= await connectDb();
    let userData = req.body; // Access the request body
    let result=await data.insert(userData);
    res.send(result);
});


const start=async ()=> {
    try{
        await connectDb(process.env.Mongodb_url);
        app.listen(port,()=>{
            console.log(`i am connected to ${port}`)
        })
        
    }
    catch (error) {
        console.log(error)
    }
}
start()