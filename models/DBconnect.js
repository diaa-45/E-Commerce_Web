const mongoose=require("mongoose");
require("dotenv").config();


mongoose.connect(process.env.MONGO_URI)
        .then(()=>console.log("Connected succsfully...."))
        .catch((err)=>console.log(err));
