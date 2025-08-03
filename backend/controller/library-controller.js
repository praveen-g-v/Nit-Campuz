const HttpError = require("../models/http-error");
const User = require("../models/user-schema");
const accesscontrol = require("../models/accessControl-schema");
const { default: mongoose } = require("mongoose");
const Book = require("../models/Library/book-schema");

const validateBook = (book) => {
  if (
    book.title === "" ||
    book.title === undefined ||
    book.title === null ||
    book.title.length < 5
  ) {
    console.log("Failed at Title", book.title);
    return false;
  }
  if (
    book.author === "" ||
    book.author === undefined ||
    book.author === null ||
    book.author.length < 5
  ) {
    return false;
  }
  if (
    book.publisher === "" ||
    book.publisher === undefined ||
    book.publisher === null ||
    book.publisher.length < 4
  ) {
    return false;
  }
  if (
    book.publicationDate === "" ||
    book.publicationDate === undefined ||
    book.publicationDate === null
  ) {
    return false;
  }
  if (
    book.isbn === "" ||
    book.isbn === undefined ||
    book.isbn === null ||
    book.isbn.length < 4
  ) {
    return false;
  }
  if (
    book.edition === "" ||
    book.edition === undefined ||
    book.edition === null
  ) {
    return false;
  }
  if (
    book.language === "" ||
    book.language === undefined ||
    book.language === null
  ) {
    return false;
  }
  if (book.genre === "" || book.genre === undefined || book.genre === null) {
    return false;
  }
  return true;
};

const createBook = async (req, res, next) => {
  const bookDetails = req.body;
  console.log(validateBook(bookDetails));
  try {
    if (validateBook(bookDetails)) {
      console.log(bookDetails);
      const book = new Book({
        title: bookDetails.title,
        author: bookDetails.author,
        publisher: bookDetails.publisher,
        publicationDate: bookDetails.publicationDate,
        isbn: bookDetails.isbn,
        edition: bookDetails.edition,
        language: bookDetails.language,
        genre: bookDetails.genre,
      });
      console.log(book);
      await book.save();
      return res.status(200).send({ message: "Book Added Successfully" });
    } else {
      return res.status(400).send({ message: "Values are too Short" });
    }
  } catch (err) {
    return res.status(400).send({ message: "Unknown Error" });
  }
};

const removeBook = async (req, res, next) => {
  const reqBookId = req.query;
  console.log(req.query);
  try {
    const books = await Book.findOneAndDelete({ _id: reqBookId.id });
    return res.status(200).send({ message: "Book has removed successfully" });
  } catch (err) {
    return res.status(400).send({ message: "Unknown Error" });
  }
};

const getAllBook = async (req, res, next) => {
  try {
    const books = await Book.find({});
    // console.log(books);
    if (books) {
      let data = books.map((val) => {
        return {
          id: val._id,
          title: val.title,
          author: val.author,
          publisher: val.publisher,
          publicationDate: val.publicationDate,
          isbn: val.isbn,
          edition: val.edition,
          language: val.language,
          genre: val.genre,
        };
      });
      return res.status(200).send(data);
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send({ message: "Unknown Error" });
  }
};

exports.createBook = createBook;
exports.getAllBook = getAllBook;
exports.removeBook = removeBook;

// const createInternalExam=async(req,res,next)=>{
//     const data=req.body;
//     try{
//         const internals=new InternalExam({
//             year:data.year,
//             course:data.course,
//             semester:data.semester,
//             internalMarks:data.internalMark,
//             studentAcademic:data.studentAcademic
//         });
//         internals.save();
//         return res.status(200).send({message:"Internal Marks Added"});
//     }
//     catch(err){
//         return res.status(404).send({message:"Unable to Access the Data base"});
//     }
// }

// const createBatch=async(req,res,next)=>{
//     const query=req.body;

//     const academicSchema=new Schema({
//         year:{type:String,required:true},
//         course:{type: mongoose.Schema.Types.ObjectId, ref: 'courses' },
//         semester:{type: mongoose.Schema.Types.ObjectId, ref: 'semester' },
//         students:[{type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
//         timetable:{type:Object,required:true}
//     })

// }

// const modifyTimeTable=async(req,res,next)=>{
//     const body=req.body;
//     console.log(req.body);
//     var timetable=await TimeTable.findById(body.timetableId);
//     if(timetable){
//         timetable.timetable=body.timetable;
//         await timetable.save();
//         return res.status(200).send({message:"TimeTable has updated successfully"})

//     }
//     else{
//         return res.status(200).send({message:"There are no time table for this year"});
//     }
//     // return res.status(200).send({message:"Cannot find the user"});

// }

// const getTimeTable=async(req,res,next)=>{
//     const param=req.query;
//     console.log(req.query);
//     const timetable=await TimeTable.find({year:param.year,course:param.course})
//     console.log(timetable)
//     if(timetable.length>0){
//         const semester= await Semester.find({courseId:param.course,semester:param.semester});
//         console.log(semester)
//         if(semester.length>0){
//             const data={
//                 timetableId:timetable[0]._id,
//                 timetable:timetable[0].timetable,
//                 course:param.course
//             }
//             console.log(data);
//             return res.status(200).send(data);

//         }
//         else{
//             return res.status(200).send({message:"There are no time table for this Semester"});
//         }

//     }
//     else{
//         return res.status(200).send({message:"There are no time table for this year"});
//     }
//     return res.status(200).send({message:"Cannot find the user"});

// }

// const addTimeTable=async(req,res,next)=>{
//     console.log(req.body);
//     const semester=await Semester.find({semester:req.body.semester});
//     if(semester.length>0){
//         const checkTimeTable= await TimeTable.find({course:req.body.courseId,year:req.body.year});
//         if(checkTimeTable.length>0){
//             console.log("Adding Existing TimeTable");
//             return res.status(404).send("Time Table is already is present");
//         }
//         else{
//             console.log("Adding New TimeTable");
//             const timetable=new TimeTable({
//                 year:req.body.year,
//                 course:req.body.courseId,
//                 semester:semester[0]._id,
//                 timetable:req.body.timetable
//             })
//             timetable.save()
//             res.status(200).send("Time Table Added SuccessFully")

//         }

//     }
//     else{
//         return res.status(400).send({message:"No semester register for this course yet"});
//     }
//     // var coursename=req.body.courseName;
//     // var degree=req.body.degree;
//     // var duration=req.body.duration;

//     // const course= new Courses({
//     //     coursename:coursename,
//     //     degree:degree,
//     //     duration:duration
//     // });

//     // await course.save().then((result)=>{
//     //     return res.status(200).send({message:"Course Added Successfully"});
//     // }).catch((err)=>{
//     //     return res.status(404).send({message:"Error while saving the course"});
//     // })
// }
