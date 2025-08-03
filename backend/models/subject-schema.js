const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const subjectSchema=new Schema({
    subCode:{type:String,required:true},
    subName:{type:String,required:true},
})


module.exports=mongoose.model('user',subjectSchema);

