const mongoose=require("mongoose");


const Schema=mongoose.Schema;

const student=new Schema({
    user:{type:mongoose.Types.ObjectId,required:true,ref:"user"},
    
    academics:{},
    achievements:{},

})


module.exports=mongoose.model('user',userSchema);

