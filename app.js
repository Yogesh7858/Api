require("dotenv").config();
const express= require("express");
const app =express();
const product_routes =require('./routes/products');
const connectDb =require("./db/connect");
const model=require('./models/product')

const port=process.env.port||5000;



app.get("/",(req,res) => {
    console.log("ram");
    res.send("hii i am connected")
})

app.use("/api/products",product_routes);
app.use(express.json());


app.post('/api/products', async (req, res) => {
    try {
        // Establish database connection
        let data = await connectDb(process.env.Mongodb_url);
        let userData=req.body;
        const newProduct=new model(userData);
        const result= await newProduct.save();
        
        // Send success response
        console.log("Data inserted successfully");
        res.json(result);
    } catch (error) {
        // Send error response
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.put("/api/products/:id", async(req,res)=>{
    try {
        const productId = req.params.id;
        const { name, price, rating } = req.body;

        // Find the product by ID
        let product = await model.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Update the product fields
        if (name) product.name = name;
        if (price) product.price = price;
        if (rating) product.rating = rating;

        // Save the updated product
        const updatedProduct = await product.save();

        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }

});

app.delete('/api/products/:id', async(req,res) => {
    try {
        const productId=req.params.id;
        const deletedProduct = await model.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
            
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Internal Server Error' });
        
    }
    
})


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