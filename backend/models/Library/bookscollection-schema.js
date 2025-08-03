const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const booksCollection=new Schema({
    book:{type:mongoose.Types.ObjectId,required:true,ref:"book"},
    quantity:{type:Number,required:true}
})


module.exports=mongoose.model('bookCollection',booksCollection);

