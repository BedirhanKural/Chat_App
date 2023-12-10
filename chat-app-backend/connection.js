const mongoose=require("mongoose")
require("dotenv/config");
//mongoose.connect("mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@cluster0.ado7kch.mongodb.net/chatuserdb?retryWrites=true&w=majority",
//()=>{console.log("connected to mongodb")});
mongoose.connect(
    process.env.MONGO_URL,
    (err) => {
     if(err) console.log(err) 
     else console.log("mongdb is connected");
    }
  );