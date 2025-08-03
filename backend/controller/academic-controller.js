const HttpError = require("../models/http-error");
const User = require("../models/user-schema");
const AccessControl = require("../models/accessControl-schema");
const { default: mongoose } = require("mongoose");
const Courses = require("../models/Course/courses-schema");
const Semester = require("../models/Course/semester-schema");
const Subject = require("../models/Course/subject-schema");
const TimeTable = require("../models/Academics/timetable-schema");
const Batch = require("../models/Academics/academics-schema");
const StudentAcademic = require("../models/Academics/student-academics-schema");
const InternalMark = require("../models/Academics/internalmark-schema");

const InternalExam = require("../models/Academics/internalExamSchedule-schema");
const internalExamResultSchema = require("../models/Academics/internalExamResult-schema");
const internalExamScheduleSchema = require("../models/Academics/internalExamSchedule-schema");
const SemesterExamSchedule = require("../models/Academics/semesterExamSchedule");
const SemesterMark = require("../models/Academics/semestermark-schema");
const semesterExamResultSchema = require("../models/Academics/semesterExamResult-schema");
const SemesterAttendanceSchema = require("../models/Academics/semesterattendance-schema");
const addStudentAttendance = async (req, res, next) => {
  if (req.user.role === "admin") {
    const bodys = req.body;
    // console.log(bodys);
    let finishCount = 0;
    try {
      const session = await mongoose.startSession();
      session.startTransaction();
      if (bodys[0].semesterAttendanceExist) {
        for (let i = 0; i < bodys.length; i++) {
          // console.log(bodys[i]);
          var semesterAttendance = await SemesterAttendanceSchema.findById(
            bodys[i].semesterAttendanceId
          );
          semesterAttendance.attendance = bodys[i].attendance;
          await semesterAttendance.save({ session: session });
          finishCount++;
        }
      } else {
        for (let i = 0; i < bodys.length; i++) {
          let body = bodys[i];
          var semesterExam = await SemesterExamSchedule.findById(
            body.InternalExamId
          );
          // console.log(internalExam);
          if (semesterExam) {
            // console.log("Inside InternalExams");
            var studentAcademics = await StudentAcademic.findById(body.id);
            if (studentAcademics) {
              // console.log("Inside studentAcademics");
              // console.log(studentAcademics);
              var semesterattendance = new SemesterAttendanceSchema({
                year: body.year,
                course: body.course,
                semester: body.semester,
                semesterExamSchedule: semesterExam._id,
                studentAcademic: studentAcademics._id,
                attendance: body.attendance,
              });
              // const semesterExamResult = new semesterExamResultSchema({
              //   studentAcademic: studentAcademics._id,
              //   semesterExamSchedule: semesterExam._id,
              // });
              try {
                // console.log("session started");
                await semesterattendance.save({ session: session });

                // semesterExamResult.semesterMark = semesterMark._id;
                // await semesterExamResult.save({ session: session });
                studentAcademics.semesterAttendance.push(
                  semesterattendance._id
                );
                // console.log(studentAcademics);
                await studentAcademics.save({ session: session });
                // console.log("saved student academics Transaction");
                // semesterExam.semesterMarks.push(semesterExamResult._id);
                // console.log(internalExam);
                // await semesterExam.save({ session: session });
                finishCount++;
                // console.log("committed Transaction");
              } catch (err) {
                // console.log("Error", err);
                return res
                  .status(400)
                  .send({ message: "Unable to Add Semester Attendance" });
              }
            } else {
              return res
                .status(400)
                .send({ message: "Unable to Add Semester Attendance" });
            }
          } else {
            return res
              .status(400)
              .send({ message: "Unable to Semester Attendance" });
          }
        }
      }
      if (finishCount == bodys.length) {
        await session.commitTransaction();
        return res
          .status(200)
          .send({ message: "Semester Attendance Added SuccessFully" });
      } else {
        res.status(400).send({ message: "Unable to Add Semester Attendance" });
      }
    } catch (err) {
      // console.log("Error", err);
      return res
        .status(400)
        .send({ message: "Unable to Add Semester Attendance" });
    }

    return res
      .status(400)
      .send({ message: "Unable to Retrieve Student Detail" });
  }
  return res
    .status(401)
    .send({ message: "You are unauthorized to  perform this action" });
};
const getStudenstAttendance = async (req, res, next) => {
  if (req.user.role === "admin") {
    const params = req.query;
    // console.log("//////////////////////////////////////////////////////");
    // console.log(params);
    const semester = await Semester.findById(params.semester);
    if (semester) {
      let t = Number(semester.semester);
      t = t / 2;
      t = Math.trunc(t);
      const Students = await StudentAcademic.find({
        course: params.course,
      });
      if (Students.length > 0) {
        let data = Students.filter((val) => {
          let newYear = Number(val.year) + t;

          if (newYear == params.year) {
            return true;
          }
        });
        // console.log(data);

        if (data.length > 0) {
          for (let i = 0; i < data.length; i++) {
            let temp = data[i];
            // console.log(temp);
            if (temp.semesterAttendance.length > 0) {
              // console.log("Existed");
              for (let j = 0; j < temp.semesterAttendance.length; j++) {
                var semesterattendanceschema =
                  await SemesterAttendanceSchema.findById(
                    temp.semesterAttendance[j]
                  );
                if (semesterattendanceschema) {
                  if (
                    semesterattendanceschema.semesterExamSchedule ==
                    params.InternalExamId
                  ) {
                    data[i].semesterAttendance = semesterattendanceschema;
                    break;
                  }
                }
                // console.log(semesterattendanceschema);
              }
              // var semesterattendanceschema=await SemesterAttendanceSchema.findById({})
            }
            // console.log(data[i].semesterAttendance);

            // data = data.filter((value) => {
            //   if (value.semesterAttendance.length > 0) {
            //     let checkAlreadyEvaluated = false;
            //     value.semesterAttendance.map((val) => {
            //       // console.log(val);
            //       if (val == params.InternalExamId) {
            //         checkAlreadyEvaluated = true;
            //       }
            //     });
            //     // console.log(checkAlreadyEvaluated);
            //     return checkAlreadyEvaluated;
            //   }
            //   return true;
            // });
          }

          data = data.map((val) => {
            // console.log(val.semesterAttendance[0]);
            if (val.semesterAttendance.length > 0) {
              return {
                id: val._id,
                joiningYear: val.year,
                currentYear: params.year,
                student: val.student,
                attendance: val.semesterAttendance[0].attendance,
                semesterAttendanceId: val.semesterAttendance[0]._id,
                semesterAttendanceExist: true,
              };
            }
            return {
              id: val._id,
              joiningYear: val.year,
              currentYear: params.year,
              student: val.student,
            };
          });
          for (let i = 0; i < data.length; i++) {
            let userInfo = await User.findById(data[i].student);
            (data[i].studentName = userInfo.name),
              (data[i].regno = userInfo.uid);
          }
          // console.log("data", data);
          return res.status(200).send(data);
        } else {
          return res
            .status(404)
            .send({ message: "There are no students assigned" });
        }
      } else {
        return res
          .status(404)
          .send({ message: "There are no students assigned" });
      }
      // console.log(Students);
    } else {
    }
    return res
      .status(400)
      .send({ message: "Unable to Retrieve Student Detail" });
  }

  return res
    .status(401)
    .send({ message: "You are unauthorized to  perform this action" });
};

const addSemesterMarks = async (req, res, next) => {
  if (req.user.role === "admin") {
    const bodys = req.body;
    let finishCount = 0;
    try {
      const session = await mongoose.startSession();
      session.startTransaction();
      for (let i = 0; i < bodys.length; i++) {
        let body = bodys[i];
        var semesterExam = await SemesterExamSchedule.findById(
          body.InternalExamId
        );
        // console.log(internalExam);
        if (semesterExam) {
          console.log("Inside InternalExams");
          var studentAcademics = await StudentAcademic.findById(body.id);
          if (studentAcademics) {
            console.log("Inside studentAcademics");
            const semesterMark = new SemesterMark({
              year: body.year,
              course: body.course,
              semester: body.semester,
              studentAcademic: body.id,
              semesterMarks: body.marks,
            });
            const semesterExamResult = new semesterExamResultSchema({
              studentAcademic: studentAcademics._id,
              semesterExamSchedule: semesterExam._id,
            });
            try {
              // console.log("session started");
              await semesterMark.save({ session: session });
              semesterExamResult.semesterMark = semesterMark._id;
              await semesterExamResult.save({ session: session });
              studentAcademics.semesterExams.push(semesterExamResult._id);
              // console.log(studentAcademics);
              await studentAcademics.save({ session: session });
              // console.log("saved student academics Transaction");
              semesterExam.semesterMarks.push(semesterExamResult._id);
              // console.log(internalExam);
              await semesterExam.save({ session: session });
              finishCount++;
              // console.log("committed Transaction");
            } catch (err) {
              // console.log("Error", err);
              return res
                .status(400)
                .send({ message: "Unable to Add Internal Marks" });
            }
          } else {
            return res
              .status(400)
              .send({ message: "Unable to Add Internal Marks" });
          }
        } else {
          return res
            .status(400)
            .send({ message: "Unable to Add Internal Marks" });
        }
      }
      if (finishCount == bodys.length) {
        await session.commitTransaction();
        return res
          .status(200)
          .send({ message: "Internal Marks Added SuccessFully" });
      } else {
        res.status(400).send({ message: "Unable to Add Internal Marks" });
      }
    } catch (err) {
      console.log("Error", err);
      return res.status(400).send({ message: "Unable to Add Internal Marks" });
    }
  }
  return res
    .status(401)
    .send({ message: "You are unauthorized to  perform this action" });
};

const patchSemesterExamTimeTable = async (req, res, next) => {
  if (req.user.role === "admin") {
    const body = req.body;
    // console.log(body);
    try {
      var checkSemester = await SemesterExamSchedule.findById(body.id);
      // console.log(checkInternals);
      if (checkSemester) {
        checkSemester.schedule = body.timetable;
        // console.log(checkInternals);
        checkSemester.save();
        return res.status(200).send({ message: "Modified SuccessFully" });
      } else {
        return res
          .status(404)
          .send({ message: "Unable to find the internal schedule" });
      }
    } catch (err) {
      return res
        .status(404)
        .send({ message: "Unable to Access the Data base" });
    }
  }
  return res
    .status(401)
    .send({ message: "You are unauthorized to  perform this action" });
};

const getSemesterExamTimeTable = async (req, res, next) => {
  if (req.user.role === "admin") {
    const params = req.query;
    // console.log(params);
    try {
      const checkSemester = await Semester.find({
        courseId: params.course,
        semester: params.semester,
      });

      if (checkSemester.length > 0) {
        // console.log(checkSemester);
        const checkSemesterExam = await SemesterExamSchedule.find({
          year: params.year,
          semester: checkSemester[0]._id,
          course: params.course,
        });
        if (checkSemesterExam.length > 0) {
          let data = checkSemesterExam.map((val) => {
            return {
              id: val._id,
              year: val.year,
              name: val.name,
              semester: val.semester,
              subjects: val.subjects,
              schedule: val.schedule,
            };
          });
          // console.log(data);
          return res.status(200).send(data);
        } else {
          return res
            .status(404)
            .send({ message: "Unable to find the internal schedule" });
        }
      } else {
        return res.status(404).send({ message: "Unable to find the Semester" });
      }
    } catch (err) {
      return res
        .status(404)
        .send({ message: "Unable to Access the Data base" });
    }
  }
  return res
    .status(401)
    .send({ message: "You are unauthorized to  perform this action" });
};

const createSemesterExam = async (req, res, next) => {
  if (req.user.role === "admin") {
    const data = req.body;
    try {
      const checkSemester = await Semester.find({
        semester: data.semester,
        courseId: data.course,
      });

      if (checkSemester.length > 0) {
        const semester = new SemesterExamSchedule({
          year: data.year,
          name: data.name,
          course: data.course,
          semester: checkSemester[0]._id,
          subjects: data.subjects,
          schedule: data.schedule,
        });
        // console.log(semester);
        semester.save();
        return res
          .status(200)
          .send({ message: "Semester Schedule Added Successfully" });
      } else {
        // console.log(internals);
        return res.status(404).send({ message: "Unable to find the Semester" });
      }
    } catch (err) {
      return res
        .status(404)
        .send({ message: "Unable to Access the Data base" });
    }
  }
  return res
    .status(401)
    .send({ message: "You are unauthorized to  perform this action" });
};
const addInternalMarks = async (req, res, next) => {
  if (req.user.role === "admin") {
    const bodys = req.body;
    let finishCount = 0;
    try {
      const session = await mongoose.startSession();
      session.startTransaction();
      for (let i = 0; i < bodys.length; i++) {
        let body = bodys[i];
        var internalExam = await InternalExam.findById(body.InternalExamId);
        // console.log(internalExam);
        if (internalExam) {
          // console.log("Inside InternalExams");
          var studentAcademics = await StudentAcademic.findById(body.id);
          if (studentAcademics) {
            // console.log("Inside studentAcademics");
            const internalMarks = new InternalMark({
              year: body.year,
              course: body.course,
              semester: body.semester,
              studentAcademic: body.id,
              internalMarks: body.marks,
            });
            const internalExamResult = new internalExamResultSchema({
              studentAcademic: studentAcademics._id,
              internalExamSchedule: internalExam._id,
            });
            try {
              // console.log("session started");
              await internalMarks.save({ session: session });
              internalExamResult.internalMark = internalMarks._id;
              await internalExamResult.save({ session: session });
              studentAcademics.internalExams.push(internalExamResult._id);
              // console.log(studentAcademics);
              await studentAcademics.save({ session: session });
              // console.log("saved student academics Transaction");
              internalExam.internalMarks.push(internalExamResult._id);
              // console.log(internalExam);
              await internalExam.save({ session: session });
              finishCount++;
              // console.log("committed Transaction");
            } catch (err) {
              // console.log("Error", err);
              return res
                .status(400)
                .send({ message: "Unable to Add Internal Marks" });
            }
          } else {
            return res
              .status(400)
              .send({ message: "Unable to Add Internal Marks" });
          }
        } else {
          return res
            .status(400)
            .send({ message: "Unable to Add Internal Marks" });
        }
      }
      if (finishCount == bodys.length) {
        await session.commitTransaction();
        return res
          .status(200)
          .send({ message: "Internal Marks Added SuccessFully" });
      } else {
        res.status(400).send({ message: "Unable to Add Internal Marks" });
      }
    } catch (err) {
      // console.log("Error", err);
      return res.status(400).send({ message: "Unable to Add Internal Marks" });
    }
  }
  return res
    .status(401)
    .send({ message: "You are unauthorized to  perform this action" });
};

const getAssessedStudentForEvaluation = async (req, res, next) => {
  /**'
   *
   *
   * Need to find and make changes both backend and  front end for editing the evaluation part
   * Since I am not able to focus I am moving toward other changes
   *
   */
  if (req.user.role === "admin") {
    const params = req.query;
    console.log(params);
    const examResult = await internalExamResultSchema.find({
      internalExamSchedule: params.InternalExamId,
    });
    if (examResult.length > 0) {
      console.log(examResult);
      var data = [];
      for (let i = 0; i < examResult.length; i++) {
        const studentMarks = await InternalMark.findById(
          examResult[i].internalMark
        );
        const tempStudentAcademic = await StudentAcademic.findById(
          examResult[i].studentAcademic
        );
        const tempInternalExamSchedule =
          await internalExamScheduleSchema.findById(
            examResult[i].internalExamSchedule
          );
        if (studentMarks && tempStudentAcademic && tempInternalExamSchedule) {
          // console.log(studentMarks);
        }
      }
    }
    // const semester = await Semester.findById(params.semester);
    // if (semester) {
    //   // console.log(semester);
    //   let t = Number(semester.semester);
    //   t = t / 2;
    //   t = Math.trunc(t);
    //   const Students = await StudentAcademic.find({
    //     course: params.course,
    //   });
    //   if (Students.length > 0) {
    //     let data = Students.filter((val) => {
    //       let newYear = Number(val.year) + t;
    //       if (newYear == params.year) {
    //         return true;
    //       }
    //     });
    //     if (data.length > 0) {
    //       data = data.filter((value) => {
    //         let checkAlreadyEvaluated = false;
    //         if (value.internalExams.length > 0) {
    //           value.internalExams.map((val) => {
    //             // console.log(val + "   " + params.InternalExamId);
    //             if (val == params.InternalExamId) {
    //               checkAlreadyEvaluated = true;
    //             }
    //           });
    //           return checkAlreadyEvaluated;
    //         }
    //       });
    //       // console.log(data);
    //       for (let i = 0; i < data.length; i++) {
    //         // console.log(data);
    //       }

    //       data = data.map((val) => {
    //         return {
    //           id: val._id,
    //           joiningYear: val.year,
    //           currentYear: params.year,
    //           student: val.student,
    //         };
    //       });
    //       for (let i = 0; i < data.length; i++) {
    //         let userInfo = await User.findById(data[i].student);
    //         (data[i].studentName = userInfo.name), (data[i].regno = userInfo.uid);
    //       }
    //       // console.log("data", data);
    //       return res.status(200).send(data);
    //     } else {
    //       return res
    //         .status(404)
    //         .send({ message: "There are no students assigned" });
    //     }
    //   } else {
    //     return res
    //       .status(404)
    //       .send({ message: "There are no students assigned" });
    //   }
    //   // console.log(Students);
    // } else {
    // }

    return res.status(404).send({ message: "Unable to Access the Data base" });
  }
  return res
    .status(401)
    .send({ message: "You are unauthorized to  perform this action" });
};

const getStudentsForEvaluationSemester = async (req, res, next) => {
  if (req.user.role === "admin") {
    const params = req.query;
    // console.log(params);
    const semester = await Semester.findById(params.semester);
    if (semester) {
      let t = Number(semester.semester);
      t = t / 2;
      t = Math.trunc(t);
      const Students = await StudentAcademic.find({
        course: params.course,
      });
      if (Students.length > 0) {
        let data = Students.filter((val) => {
          let newYear = Number(val.year) + t;

          if (newYear == params.year) {
            return true;
          }
        });
        // console.log(data);

        if (data.length > 0) {
          for (let i = 0; i < data.length; i++) {
            data = data.filter((value) => {
              if (value.semesterExams.length > 0) {
                let checkAlreadyEvaluated = false;
                value.semesterExams.map((val) => {
                  // console.log(val);
                  if (val == params.InternalExamId) {
                    checkAlreadyEvaluated = true;
                  }
                });
                // console.log(checkAlreadyEvaluated);
                return checkAlreadyEvaluated;
              }
              return true;
            });
            // console.log(data);

            // if (data[i].internalExams.length > 0) {
            //   let editIndex = 0;
            //   data[i].internalExams = data[i].internalExams.filter((val) => {
            //     // console.log(val);
            //     if (val == params.InternalExamId) {
            //       return false;
            //     }
            //     return true;
            //   });
          }
          // }

          data = data.map((val) => {
            return {
              id: val._id,
              joiningYear: val.year,
              currentYear: params.year,
              student: val.student,
            };
          });
          for (let i = 0; i < data.length; i++) {
            let userInfo = await User.findById(data[i].student);
            (data[i].studentName = userInfo.name),
              (data[i].regno = userInfo.uid);
          }
          // console.log("data", data);
          return res.status(200).send(data);
        } else {
          return res
            .status(404)
            .send({ message: "There are no students assigned" });
        }
      } else {
        return res
          .status(404)
          .send({ message: "There are no students assigned" });
      }
      // console.log(Students);
    } else {
    }

    return res.status(404).send({ message: "Unable to Access the Data base" });
  }
  return res
    .status(401)
    .send({ message: "You are unauthorized to  perform this action" });
};

const getStudentsForEvaluation = async (req, res, next) => {
  if (req.user.role === "admin") {
    const params = req.query;
    // console.log(params);
    const semester = await Semester.findById(params.semester);
    if (semester) {
      let t = Number(semester.semester);
      t = t / 2;
      t = Math.trunc(t);
      const Students = await StudentAcademic.find({
        course: params.course,
      });
      if (Students.length > 0) {
        let data = Students.filter((val) => {
          let newYear = Number(val.year) + t;

          if (newYear == params.year) {
            return true;
          }
        });
        // console.log(data);

        if (data.length > 0) {
          for (let i = 0; i < data.length; i++) {
            data = data.filter((value) => {
              if (value.internalExams.length > 0) {
                let checkAlreadyEvaluated = false;
                value.internalExams.map((val) => {
                  // console.log(val);
                  if (val == params.InternalExamId) {
                    checkAlreadyEvaluated = true;
                  }
                });
                // console.log(checkAlreadyEvaluated);
                return checkAlreadyEvaluated;
              }
              return true;
            });
            // console.log(data);

            // if (data[i].internalExams.length > 0) {
            //   let editIndex = 0;
            //   data[i].internalExams = data[i].internalExams.filter((val) => {
            //     // console.log(val);
            //     if (val == params.InternalExamId) {
            //       return false;
            //     }
            //     return true;
            //   });
          }
          // }

          data = data.map((val) => {
            return {
              id: val._id,
              joiningYear: val.year,
              currentYear: params.year,
              student: val.student,
            };
          });
          for (let i = 0; i < data.length; i++) {
            let userInfo = await User.findById(data[i].student);
            (data[i].studentName = userInfo.name),
              (data[i].regno = userInfo.uid);
          }
          // console.log("data", data);
          return res.status(200).send(data);
        } else {
          return res
            .status(404)
            .send({ message: "There are no students assigned" });
        }
      } else {
        return res
          .status(404)
          .send({ message: "There are no students assigned" });
      }
      // console.log(Students);
    } else {
    }

    return res.status(404).send({ message: "Unable to Access the Data base" });
  }
  return res
    .status(401)
    .send({ message: "You are unauthorized to  perform this action" });
};

const patchInternalExamTimeTable = async (req, res, next) => {
  if (req.user.role === "admin") {
    const body = req.body;
    // console.log(body);
    try {
      var checkInternals = await InternalExam.findById(body.id);
      // console.log(checkInternals);
      if (checkInternals) {
        checkInternals.schedule = body.timetable;
        // console.log(checkInternals);
        checkInternals.save();
        return res.status(200).send({ message: "Modified SuccessFully" });
      } else {
        return res
          .status(404)
          .send({ message: "Unable to find the internal schedule" });
      }
    } catch (err) {
      return res
        .status(404)
        .send({ message: "Unable to Access the Data base" });
    }
  }
  return res
    .status(401)
    .send({ message: "You are unauthorized to  perform this action" });
};

const getInternalExamTimeTable = async (req, res, next) => {
  if (req.user.role === "admin") {
    const params = req.query;
    // console.log(params);
    try {
      const checkSemester = await Semester.find({
        courseId: params.course,
        semester: params.semester,
      });

      if (checkSemester.length > 0) {
        const checkInternals = await InternalExam.find({
          year: params.year,
          semester: checkSemester[0]._id,
          course: params.course,
        });
        if (checkInternals.length > 0) {
          let data = checkInternals.map((val) => {
            return {
              id: val._id,
              year: val.year,
              name: val.name,
              semester: val.semester,
              subjects: val.subjects,
              schedule: val.schedule,
            };
          });
          // console.log(data);
          return res.status(200).send(data);
        } else {
          return res
            .status(404)
            .send({ message: "Unable to find the internal schedule" });
        }
      } else {
        return res.status(404).send({ message: "Unable to find the Semester" });
      }
    } catch (err) {
      return res
        .status(404)
        .send({ message: "Unable to Access the Data base" });
    }
  }
  return res
    .status(401)
    .send({ message: "You are unauthorized to  perform this action" });
};

const createInternalExam = async (req, res, next) => {
  if (req.user.role === "admin") {
    const data = req.body;
    try {
      const checkSemester = await Semester.find({
        semester: data.semester,
        courseId: data.course,
      });

      if (checkSemester.length > 0) {
        const internals = new InternalExam({
          year: data.year,
          name: data.name,
          course: data.course,
          semester: checkSemester[0]._id,
          subjects: data.subjects,
          schedule: data.schedule,
        });
        // console.log(internals);
        internals.save();
        return res.status(200).send({ message: "Internal Marks Added" });
      } else {
        // console.log(internals);
        return res.status(404).send({ message: "Unable to find the Semester" });
      }
    } catch (err) {
      return res
        .status(404)
        .send({ message: "Unable to Access the Data base" });
    }
  }
  return res
    .status(401)
    .send({ message: "You are unauthorized to  perform this action" });
};

const changeInternalExam = async (req, res, next) => {
  const data = req.body;
  try {
    const checkSemester = await Semester.find({
      semester: data.semester,
      courseId: data.course,
      year: data.year,
    });

    if (checkSemester.length > 0) {
      var internals = await InternalExam.findById(data.internalExamId);
      internals.schedule = data.schedule;
      // console.log(internals);
      internals.save();
      return res.status(200).send({ message: "Internal Marks Edited" });
    } else {
      // console.log(internals);
      return res.status(404).send({ message: "Unable to find the Semester" });
    }
  } catch (err) {
    return res.status(404).send({ message: "Unable to Access the Data base" });
  }
  return res
    .status(401)
    .send({ message: "You are unauthorized to  perform this action" });
};

const createBatch = async (req, res, next) => {
  const query = req.body;
  const academicSchema = new Schema({
    year: { type: String, required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "courses" },
    semester: { type: mongoose.Schema.Types.ObjectId, ref: "semester" },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    timetable: { type: Object, required: true },
  });
};

const modifyTimeTable = async (req, res, next) => {
  if (req.user.role === "admin") {
    const body = req.body;
    // console.log(req.body);
    var timetable = await TimeTable.findById(body.timetableId);
    if (timetable) {
      timetable.timetable = body.timetable;
      await timetable.save();
      return res
        .status(200)
        .send({ message: "TimeTable has updated successfully" });
    } else {
      return res
        .status(200)
        .send({ message: "There are no time table for this year" });
    }
  }
  return res
    .status(401)
    .send({ message: "You are unauthorized to  perform this action" });
  // return res.status(200).send({message:"Cannot find the user"});
};

const getTimeTable = async (req, res, next) => {
  if (req.user.role === "admin") {
    const param = req.query;
    // console.log(req.query);
    const timetable = await TimeTable.find({
      year: param.year,
      course: param.course,
    });
    // console.log(timetable);
    if (timetable.length > 0) {
      const semester = await Semester.find({
        courseId: param.course,
        semester: param.semester,
      });
      // console.log(semester);
      if (semester.length > 0) {
        const data = {
          timetableId: timetable[0]._id,
          timetable: timetable[0].timetable,
          course: param.course,
        };
        // console.log(data);
        return res.status(200).send(data);
      } else {
        return res
          .status(200)
          .send({ message: "There are no time table for this Semester" });
      }
    } else {
      return res
        .status(200)
        .send({ message: "There are no time table for this year" });
    }
    return res.status(200).send({ message: "Cannot find the user" });
  }
  return res
    .status(401)
    .send({ message: "You are unauthorized to  perform this action" });
};
const getStudentTotalAttendance = async (req, res, next) => {
  if (req.user.role === "admin") {
    // console.log(req.user);
    let StudentAcademicSchema = await StudentAcademic.find({
      student: req.user.id,
    });
    StudentAcademicSchema = StudentAcademicSchema[0];
    if (StudentAcademicSchema) {
      if (StudentAcademicSchema.semesterAttendance.length > 0) {
        let semesterAttendance = await SemesterAttendanceSchema.findById(
          StudentAcademicSchema.semesterAttendance[
            StudentAcademicSchema.semesterAttendance.length - 1
          ]
        );
        let totalAttendance = 0;
        let userAttendance = 0;
        let attendance = semesterAttendance.attendance;
        for (let i = 0; i < attendance.length; i++) {
          userAttendance =
            userAttendance +
            Number(attendance[i].attendedHours) /
              Number(attendance[i].totalHours);
          totalAttendance = totalAttendance + 1;
          // console.log(+attendance[i].attendedHours, +attendance[i].totalHours);
          // console.log(userAttendance, totalAttendance);
        }
        // console.log(semesterAttendance);
        let totalPercentage = Math.round(
          (userAttendance / totalAttendance) * 100
        );
        if (totalPercentage) {
          return res.status(200).send({ totalPercentage: totalPercentage });
        }
      }
    }
    return res
      .status(400)
      .send({ message: "No semester register for this course yet" });
  }
  return res
    .status(401)
    .send({ message: "You are unauthorized to  perform this action" });
};
const getStudentAllAttendance = async (req, res, next) => {
  if (req.user.role === "admin") {
    let StudentAcademicSchema = await StudentAcademic.find({
      student: req.user.id,
    });
    StudentAcademicSchema = StudentAcademicSchema[0];
    if (StudentAcademicSchema) {
      if (StudentAcademicSchema.semesterAttendance.length > 0) {
        let respData = [];
        for (
          let i = 0;
          i < StudentAcademicSchema.semesterAttendance.length;
          i++
        ) {
          let semesterAttendance = await SemesterAttendanceSchema.findById(
            StudentAcademicSchema.semesterAttendance[i]
          );
          if (semesterAttendance) {
            let course = await Courses.findById(semesterAttendance.course);
            let semester = await Semester.findById(semesterAttendance.semester);
            let attendanceData = {
              year: semesterAttendance.year,
              course: course.coursename,
              degree: course.degree,
              duration: course.duration,
              attendance: semesterAttendance.attendance,
              semester: semester.semester,
            };
            respData = [...respData, attendanceData];
          }
        }

        if (respData.length > 0) {
          return res.status(200).send(respData);
        }
      }
    }
    return res
      .status(400)
      .send({ message: "No semester register for this course yet" });
  }

  return res
    .status(401)
    .send({ message: "You are unauthorized to  perform this action" });
};
const addTimeTable = async (req, res, next) => {
  if (req.user.role === "admin") {
    // console.log(req.body);
    const semester = await Semester.find({ semester: req.body.semester });
    if (semester.length > 0) {
      const checkTimeTable = await TimeTable.find({
        course: req.body.courseId,
        year: req.body.year,
      });
      if (checkTimeTable.length > 0) {
        // console.log("Adding Existing TimeTable");
        return res.status(404).send("Time Table is already is present");
      } else {
        // console.log("Adding New TimeTable");
        const timetable = new TimeTable({
          year: req.body.year,
          course: req.body.courseId,
          semester: semester[0]._id,
          timetable: req.body.timetable,
        });
        timetable.save();
        res.status(200).send("Time Table Added SuccessFully");
      }
    } else {
      return res
        .status(400)
        .send({ message: "No semester register for this course yet" });
    }
  }
  return res
    .status(401)
    .send({ message: "You are unauthorized to  perform this action" });
  // var coursename=req.body.courseName;
  // var degree=req.body.degree;
  // var duration=req.body.duration;

  // const course= new Courses({
  //     coursename:coursename,
  //     degree:degree,
  //     duration:duration
  // });

  // await course.save().then((result)=>{
  //     return res.status(200).send({message:"Course Added Successfully"});
  // }).catch((err)=>{
  //     return res.status(404).send({message:"Error while saving the course"});
  // })
};

const getUpcomingSemesterExam = async (req, res) => {
  // console.log(req.user);
  let StudentAcademicSchema = await StudentAcademic.find({
    student: req.user.id,
  });
  StudentAcademicSchema = StudentAcademicSchema[0];
  const currentDate = new Date();
  // const currentYear = 2024;
  // const currentMonth = 6;

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const calculateSemester = (studentYear) => {
    let completionYear = currentYear - studentYear;
    if (completionYear > 3 && currentMonth > 4) {
      return -1;
    }
    if (currentMonth < 6) {
      return completionYear * 2;
    } else {
      return completionYear * 2 + 1;
    }
  };
  const getSubjectName = async (subjectID) => {
    const subjectschema = await Subject.findById(subjectID);
    if (subjectschema) {
      return {
        subjectName: subjectschema.subjectName,
        subjectCode: subjectschema.subjectCode,
      };
    }
  };
  if (StudentAcademicSchema) {
    // Get the current semester
    let currentSemester = calculateSemester(Number(StudentAcademicSchema.year));
    if (currentSemester < 0) {
      return res.status(304).send({
        message:
          "No semester scheduled/associate is graduated register for this course yet",
      });
    }
    currentSemester = currentSemester + 1;
    let search = "Semester " + currentSemester;
    let SemesterExamScheduleSchema = await SemesterExamSchedule.find({
      name: search,
    });
    if (SemesterExamScheduleSchema.length > 0) {
      let respData = [];
      // SemesterExamScheduleSchema[0].schedule.
      for (
        let index = 0;
        index < SemesterExamScheduleSchema[0].schedule.length;
        index++
      ) {
        let data = SemesterExamScheduleSchema[0].schedule[index];
        let getSubject = await getSubjectName(data.subject);
        if (getSubject) {
          data.subject = getSubject;
          respData = [...respData, data];
        }
      }

      return res.status(200).send(respData);
    }
  }
  return res.status(302).send({ message: "No semester schedule yet" });
  // return res
  //   .status(401)
  //   .send({ message: "You are unauthorized to  perform this action" });
};

const getUpcomingInternalExam = async (req, res) => {
  // console.log(req.user);
  // console.log("/////////////////////////////////");
  let StudentAcademicSchema = await StudentAcademic.find({
    student: req.user.id,
  });
  StudentAcademicSchema = StudentAcademicSchema[0];
  // console.log(StudentAcademicSchema);
  const currentDate = new Date();
  // const currentYear = 2024;
  // const currentMonth = 6;

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const calculateSemester = (studentYear) => {
    let completionYear = currentYear - studentYear;
    if (completionYear > 3 && currentMonth > 4) {
      return -1;
    }
    if (currentMonth < 6) {
      return completionYear * 3;
    } else {
      return completionYear * 3 + 1;
    }
  };
  const getSubjectName = async (subjectID) => {
    const subjectschema = await Subject.findById(subjectID);
    if (subjectschema) {
      return {
        subjectName: subjectschema.subjectName,
        subjectCode: subjectschema.subjectCode,
      };
    }
  };

  // Get the current semester
  if (StudentAcademicSchema) {
    let currentInternal = calculateSemester(Number(StudentAcademicSchema.year));
    if (currentInternal < 0) {
      return res.status(304).send({
        message:
          "No semester scheduled/associate is graduated register for this course yet",
      });
    }
    currentInternal = currentInternal + 1;
    let search = "Internal Exam " + currentInternal;
    let InternalExamExamSchedule = await internalExamScheduleSchema.find({
      name: search,
    });
    // console.log(InternalExamExamSchedule);
    if (InternalExamExamSchedule.length > 0) {
      let respData = [];
      // SemesterExamScheduleSchema[0].schedule.
      for (
        let index = 0;
        index < InternalExamExamSchedule[0].schedule.length;
        index++
      ) {
        let data = InternalExamExamSchedule[0].schedule[index];
        let getSubject = await getSubjectName(data.subject);
        if (getSubject) {
          data.subject = getSubject;
          respData = [...respData, data];
        }
      }
      // console.log(respData);

      return res.status(200).send(respData);
    }
  }
  // console.log(InternalExamExamSchedule);
  return res.status(302).send({ message: "No semester schedule yet" });
  return res
    .status(401)
    .send({ message: "You are unauthorized to  perform this action" });
};

const getInternalExamResult = async (req, res) => {
  let StudentAcademicSchema = await StudentAcademic.find({
    student: req.user.id,
  });
  StudentAcademicSchema = StudentAcademicSchema[0];
  let respData = [];
  if (StudentAcademicSchema) {
    for (let i = 0; i < StudentAcademicSchema.internalExams.length; i++) {
      let tempInternal = StudentAcademicSchema.internalExams[i];
      let internalExamResult = await internalExamResultSchema.findById(
        tempInternal
      );
      if (internalExamResult) {
        let internalResult = await InternalMark.findById(
          internalExamResult.internalMark
        );
        let internalExamSchedule = await internalExamScheduleSchema.findById(
          internalExamResult.internalExamSchedule
        );
        if (internalResult && internalExamSchedule) {
          let semester = await Semester.findById(internalExamSchedule.semester);
          respData = [
            ...respData,
            {
              semester: "Semester " + semester.semester,
              examName: internalExamSchedule.name,
              subjects: internalResult.internalMarks,
            },
          ];
        }
      }
    }
  }
  if (respData.length > 0) {
    return res.status(200).send(respData);
  }
  return res.status(400).send({ message: "cannot find the internalExam" });
  return res
    .status(401)
    .send({ message: "You are unauthorized to  perform this action" });
};

const getSemesterExamResult = async (req, res) => {
  console.log(req.user);
  let StudentAcademicSchema = await StudentAcademic.find({
    student: req.user.id,
  });
  StudentAcademicSchema = StudentAcademicSchema[0];
  console.log(StudentAcademicSchema);
  let respData = [];
  if (StudentAcademicSchema) {
    for (let i = 0; i < StudentAcademicSchema.semesterExams.length; i++) {
      let tempInternal = StudentAcademicSchema.semesterExams[i];
      console.log(tempInternal);
      let semesterExamResult = await semesterExamResultSchema.findById(
        tempInternal
      );
      console.log(semesterExamResult);
      if (semesterExamResult) {
        let semesterResult = await SemesterMark.findById(
          semesterExamResult.semesterMark
        );
        console.log(semesterResult);
        let semesterExamSchedules = await SemesterExamSchedule.findById(
          semesterExamResult.semesterExamSchedule
        );

        console.log(semesterExamSchedules);
        if (semesterResult && semesterExamSchedules) {
          let semester = await Semester.findById(
            semesterExamSchedules.semester
          );
          respData = [
            ...respData,
            {
              semester: "Semester " + semester.semester,
              examName: semesterExamSchedules.name,
              subjects: semesterResult.semesterMarks,
            },
          ];
        }
      }
    }
  }
  if (respData.length > 0) {
    return res.status(200).send(respData);
  }
  return res.status(400).send({ message: "cannot find the internalExam" });
  return res
    .status(401)
    .send({ message: "You are unauthorized to  perform this action" });
};

exports.addTimeTable = addTimeTable;
exports.getTimeTable = getTimeTable;
exports.modifyTimeTable = modifyTimeTable;
exports.createInternalExam = createInternalExam;
exports.getInternalExamTimeTable = getInternalExamTimeTable;
exports.changeInternalExam = changeInternalExam;
exports.patchInternalExamTimeTable = patchInternalExamTimeTable;
exports.getStudentsForEvaluation = getStudentsForEvaluation;
exports.addInternalMarks = addInternalMarks;
exports.getAssessedStudentForEvaluation = getAssessedStudentForEvaluation;
exports.createSemesterExam = createSemesterExam;
exports.getSemesterExamTimeTable = getSemesterExamTimeTable;
exports.patchSemesterExamTimeTable = patchSemesterExamTimeTable;
exports.addSemesterMarks = addSemesterMarks;
exports.getStudentsForEvaluationSemester = getStudentsForEvaluationSemester;
exports.getStudenstAttendance = getStudenstAttendance;
exports.addStudentAttendance = addStudentAttendance;
exports.getStudentTotalAttendance = getStudentTotalAttendance;
exports.getStudentAllAttendance = getStudentAllAttendance;
exports.getUpcomingSemesterExam = getUpcomingSemesterExam;
exports.getUpcomingInternalExam = getUpcomingInternalExam;
exports.getInternalExamResult = getInternalExamResult;
exports.getSemesterExamResult = getSemesterExamResult;
