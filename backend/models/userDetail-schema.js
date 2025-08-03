
const mongoose=require("mongoose");

const Schema=mongoose.Schema;

const userDetailSchema=new Schema({
    userID:{type:String,required:true,},
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    gender:{type:String,required:true,},
    dob:{type:String,required:true,},
    cardid:{type:String,required:true,},
    ptofilePhoto:{type:String},
    email:{type:String,required:true},
    mobileNo:{type:Number,required:true},
    address:{type:String,required:true,},
})


module.exports=mongoose.model('userdetail',userDetailSchema);

