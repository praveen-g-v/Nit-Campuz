const mongoose=require("mongoose");

const Schema=mongoose.Schema;

const coursesSchema=new Schema({
    coursename:{type:String,required:true},
    degree:{type:String,required:true},
    duration:{type:String,required:true},
})


module.exports=mongoose.model('courses',coursesSchema);

