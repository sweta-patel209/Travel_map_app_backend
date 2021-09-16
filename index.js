const express = require("express");
const mongoose = require("mongoose");

const dotenv = require("dotenv")
const app = express();
const pinRoute = require("./routes/pins");
const userRoute = require("./routes/user");

dotenv.config();

app.use(express.json())

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true
})
.then(()=>{
    console.log("MONGODB connected.....")
})
.catch((err)=>console.log(err))

app.use("/api/pins",pinRoute)
app.use("/api/users",userRoute)

app.listen(8000,()=>{
    console.log("Backend server is running!!");
})