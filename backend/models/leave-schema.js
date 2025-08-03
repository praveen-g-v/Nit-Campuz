const mongoose=require("mongoose");


const Schema=mongoose.Schema;

const leaveSChema=new Schema({
    user:{type:mongoose.Types.ObjectId,required:true,ref:"user"},
    leave:{},
    library:{},
    academics:{},
    achievements:{},
    
})


module.exports=mongoose.model('leave',leaveSChema);

