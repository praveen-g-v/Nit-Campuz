const HttpError = require("../models/http-error");
const User = require("../models/user-schema");
const accesscontrol = require("../models/accessControl-schema");
const { default: mongoose } = require("mongoose");
const Courses = require("../models/Course/courses-schema");
const Semester = require("../models/Course/semester-schema");
const Subject = require("../models/Course/subject-schema");

const deleteSubject = async (req, res, next) => {
  if (req.user.role === "admin") {
    const data = req.query;
    console.log(req.query);
    const semId = await Subject.findById(data.subjectId);

    if (semId) {
      console.log(semId);
      let semester = await Semester.findById(semId.semester);
      semester.subjectIds.filter((val) => {
        if (val != data.subjectId) {
          return true;
        }
      });
      await semester.save();
      await Subject.findByIdAndDelete(data.subjectId);
      return res.status(200).send({ message: "Subject Deleted Success Fully" });
    } else {
      return res.status(404).send({ message: "Subject is not available" });
    }
  }
  return res
    .status(401)
    .send({ message: "You are unauthorized to  perform this action" });
};

const getSubject = async (req, res, next) => {
  if (req.user.role === "admin") {
    const param = req.query;
    let sucess = false;
    console.log(req.query);
    await Semester.find({
      courseId: req.query.course,
      semester: req.query.semester,
    })
      .then(async (resultData) => {
        console.log(resultData);
        if (resultData === undefined) {
          sucess = true;
          //  break ;
          /**
           *
           *
           * check not working
           */
        } else {
          console.log(resultData[0]);
          let subData = await Subject.find({ semester: resultData[0]._id });
          console.log(subData);
          subData = subData.map((val) => {
            return {
              subjectId: val._id,
              subjectName: val.subjectName,
              subjectCode: val.subjectCode,
            };
          });
          return res.status(200).send({ subData });
        }
        if (sucess) {
          return res.status(404).send({ message: "There is no data" });
        }
      })
      .catch((err) => {
        return res
          .status(400)
          .send({ message: "There are no semester assigned in the course" });
      });
  }
  // return res
  //   .status(401)
  //   .send({ message: "You are unauthorized to  perform this action" });
};

const addSubject = async (req, res, next) => {
  if (req.user.role === "admin") {
    const data = req.body;
    console.log(data);
    var sem = await Semester.find({
      courseId: data.course,
      semester: data.semester,
    });

    if (sem.length > 0 && sem[0].semester == data.semester) {
      console.log("Adding in existing sem");
      const subject = new Subject({
        subjectName: data.name,
        subjectCode: data.code,
        semester: sem[0]._id,
      });
      try {
        console.log("Trying to start the session");
        const session = await mongoose.startSession();
        session.startTransaction();
        console.log("created session", subject);
        await subject.save({ session: session });
        console.log("Saved Subjects");
        console.log("adding subject to Semester");
        sem[0].subjectIds.push(subject._id);
        console.log("saved sem session");
        await sem[0].save({ session: session });
        console.log("Saved semester");
        await session.commitTransaction();
        console.log("Addeded Successfully");
        return res.status(200).send({ message: "Subject Saved Successfully" });
      } catch {
        return res.status(404).send({ message: "Unexpected Error try again" });
      }
    } else {
      var semester = new Semester({
        semester: data.semester,
        courseId: data.course,
      });

      var subject = new Subject({
        subjectName: data.name,
        subjectCode: data.code,
      });
      try {
        console.log("Trying to start the session");
        const session = await mongoose.startSession();
        session.startTransaction();
        console.log("created session");
        await subject.save({ session: session });
        semester.subjectIds.push(subject._id);
        console.log("saved sem session");
        await semester.save({ session: session });
        subject.semester = semester._id;
        console.log("saved subject session");
        await subject.save({ session: session });
        await session.commitTransaction();
        return res.status(200).send({ message: "Subject Saved Successfully" });
      } catch (err) {
        return res.status(404).send({ message: "Unexpected Error try again" });
      }
    }
  }
  return res
    .status(401)
    .send({ message: "You are unauthorized to  perform this action" });
};

const addCourse = async (req, res, next) => {
  if (req.user.role === "admin") {
    console.log(req.body);
    var coursename = req.body.courseName;
    var degree = req.body.degree;
    var duration = req.body.duration;

    const course = new Courses({
      coursename: coursename,
      degree: degree,
      duration: duration,
    });

    await course
      .save()
      .then((result) => {
        return res.status(200).send({ message: "Course Added Successfully" });
      })
      .catch((err) => {
        return res
          .status(404)
          .send({ message: "Error while saving the course" });
      });
  }
  return res
    .status(401)
    .send({ message: "You are unauthorized to  perform this action" });
};

const deleteCourse = async (req, res, next) => {
  if (req.user.role === "admin") {
    console.log("Dlete Params");
    // console.log(req)
    const courseId = req.query.id;
    await Courses.findByIdAndDelete(courseId)
      .then((result) => {
        return res.status(200).send({ message: "Course Deleted Successfully" });
      })
      .catch((err) => {
        return res
          .status(404)
          .send({ message: "Error while Deleting the course" });
      });
  }
  return res
    .status(401)
    .send({ message: "You are unauthorized to  perform this action" });
};

const getAllCourse = async (req, res, next) => {
  const data = await Courses.find({});

  if (data) {
    let courseData = data.map((val) => {
      return {
        id: val._id,
        courseName: val.coursename,
        degree: val.degree,
        duration: val.duration,
      };
    });
    return res.status(200).send(courseData);
  }
  return res.status(404).send({ message: "There is no data in course" });
};

exports.addCourse = addCourse;
exports.deleteCourse = deleteCourse;
exports.getAllCourse = getAllCourse;
exports.addSubject = addSubject;
exports.getSubject = getSubject;
exports.deleteSubject = deleteSubject;
