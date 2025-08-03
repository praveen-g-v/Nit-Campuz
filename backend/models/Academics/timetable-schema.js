const mongoose=require("mongoose");

const Schema=mongoose.Schema;

const timeTableSchema=new Schema({
    year:{type:String,required:true},
    course:{type: mongoose.Schema.Types.ObjectId, ref: 'courses' },
    semester:{type: mongoose.Schema.Types.ObjectId, ref: 'semester' },
    timetable:{type:Object,required:true}
})

module.exports=mongoose.model('timetable',timeTableSchema);
