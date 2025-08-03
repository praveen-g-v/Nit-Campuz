const mongoose=require("mongoose");

const Schema=mongoose.Schema;

const accessControlSchema=new Schema({
    rolename:{type:String,required:true},
    user:{type:mongoose.Types.ObjectId,ref:"user"},
    academic:{type:mongoose.Types.ObjectId}

})


module.exports=mongoose.model('accesscontrol',accessControlSchema);

