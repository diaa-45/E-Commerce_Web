require("./models/DBconnect");
const express=require("express");
const UserRoute=require("./routes/UserRoutes");
const UserAutho=require("./routes/UserAutho");
const ProductRoute=require("./routes/ProductRoute");
const OrderRoute=require("./routes/orderRoute");
const CartRoute=require("./routes/cartRoute");
const app=express();
const port=process.env.PORT||7000;

app.use(express.json());

// Route Apis

app.use("/user",UserRoute);
app.use("/user",UserAutho);
app.use("/product",ProductRoute);
app.use("/order",OrderRoute);
app.use("/cart",CartRoute);


app.listen(port,()=>{
    console.log(`listinig ${process.env.NODE_ENV} on port : ${port} ....`);
});