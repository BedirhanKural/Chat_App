const router=require("express").Router();
const User=require("../models/User.js");
//creating user
router.post("/",async(req,res)=>{
    try{
        const {name,email,password,picture}=req.body;
        console.log(req.body);
        const user=await User.create({name,email,password,picture});
        res.status(201).json(user);//http status code 201:unauthorized(yetkisiz)
    }catch (e){
        let msg;
        if(e.code==11000){
            msg="User already exists"//if duplicate records(aynı kayıtlarda 11000 hata kodu)
        }
        else{
        msg=e.message;
        }
        console.log(e);
        res.status(400).json(msg);
    }
})
router.post("/login",async(req,res)=>{
    try {
        const {email,password}=req.body;
        const user=await User.findByCredentials(email,password);
        user.status="online";// if login status switched online.
        await user.save();
        res.status(200).json(user);//http status codes 2xx success(başarılı)
    }
     catch (e) {
        res.status(400).json(e.message);//http status codes 4xx error
        
    }
})
module.exports=router;