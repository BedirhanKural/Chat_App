const mongoose=require("mongoose");//for db
const {isEmail}= require("validator");
const bcrypt=require("bcrypt");//for cryption
const UserSchema=new mongoose.Schema({//create mongo schema
    name: {
        type:String,
        required:[true,"Can't be blank"]
    },
    email:{
        type:String,
        lowercase:true,//record by lowercase
        unique:true,
        required:[true,"Can't be blank"],
        index: true,
        validate:[isEmail,"invalid email"]
    },
    password:{
        type:String,
        required:[true,"Can't be blank"]
    },
    picture:{
        type:String,// pictures recording as string.   
    },
    newMessages:{
        type:Object,
        default:{}
    },
    status:{
        type:String,
        default:"online"
    }
},{minimize:false});//prevent to empty records.

//hashing password using bcrypt package.
UserSchema.pre('save', function(next){
    const user = this;
    if(!user.isModified('password')) return next();
  
    bcrypt.genSalt(10, function(err, salt){
      if(err) return next(err);
  
      bcrypt.hash(user.password, salt, function(err, hash){
        if(err) return next(err);
  
        user.password = hash
        next();
      })
  
    })
  
  })

UserSchema.methods.toJSON = function(){
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;//exclude password
    return userObject;
  }
UserSchema.statics.findByCredentials = async function(email, password) {
    const user = await User.findOne({email});
    if(!user) throw new Error('invalid email or password');
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) throw new Error('invalid email or password')
    return user
  }

const User=mongoose.model("User",UserSchema);
module.exports=User
