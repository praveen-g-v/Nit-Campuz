const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const BookSchema=new Schema({
    title:{type:String,required:true},
    author:{type:String,required:true},
    publisher:{type:String,required:true,},
    publicationDate:{type:String,required:true,},
    isbn:{type:String,required:true},
    edition:{type:String,required:true},
    language:{type:String,required:true},
    genre:{type:String,required:true,},
})


module.exports=mongoose.model('book',BookSchema);

