require("./models/DBconnect");
const express=require("express");
const UserRoute=require("./routes/UserRoutes");
const UserAutho=require("./routes/UserAutho");
const ProductRoute=require("./routes/ProductRoute");
const OrderRoute=require("./routes/orderRoute");
const app=express();
const port=process.env.PORT||7000;

app.use(express.json());


// Route Apis

app.use("/api/v1/user",UserAutho);
app.use("/api/v1/user",UserRoute);
app.use("/api/v1/product",ProductRoute);
app.use("/api/v1/order",OrderRoute);

app.all("*", (req,res)=>{
    res.status(401).json({succses:false , mesaage:" That is Not Valid Route , Provide Valid Please"}) ;
});


app.listen(port,()=>{
    console.log(`listinig ${process.env.NODE_ENV} on port : ${port} ....`);
});