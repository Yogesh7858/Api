require("dotenv").config();
const express= require("express");
const app =express();
const product_routes =require('./routes/products');
const connectDb =require("./db/connect");

const port=process.env.port||5000;



app.get("/",(req,res) => {
    res.send("hii i am connected")
})

app.use("/api/products",product_routes);


app.post('/api/products', (req, res) => {
    const data = req.body; // Access the request body
    // Process the data as needed
    // console.log(data);
    // console.log('Received data:', data);
    // Send a response
    res.send('POST request received',data);
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