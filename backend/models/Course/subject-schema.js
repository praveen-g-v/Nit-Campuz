const mongoose=require("mongoose");

const Schema=mongoose.Schema;

const subjectSchema = new Schema({
    subjectName: {type:String,required:true},
    subjectCode:{type:String,required:true},
    semester: { type: mongoose.Schema.Types.ObjectId, ref: 'semester' },
  });


module.exports=mongoose.model('subject',subjectSchema);





