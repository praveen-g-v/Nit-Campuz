const mongoose=require("mongoose");

const userDetailSchema = require("./userDetail-schema");

const Schema=mongoose.Schema;

const userSchema=new Schema({
    uid:{type:String,requires:true},
    password:{type:String,required:true},
    name:{type:String,required:true},
    cardid:{type:String,required:true,},
    ptofilePhoto:{type:String},
    role:{type:mongoose.Types.ObjectId,required:true,ref:"accesscontrol"},
    moreDetail:{type:mongoose.Types.ObjectId,required:true,ref:"userdetail"},
    status:{type:String,required:true}
})


module.exports=mongoose.model('user',userSchema);

