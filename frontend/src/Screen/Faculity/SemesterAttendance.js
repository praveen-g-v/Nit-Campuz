import React, { useState, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const SemesterAttendance = () => {
  const axiosPrivate = useAxiosPrivate();
  const [courses, setCourses] = useState([]);
  const [courseYear, setCourseYear] = useState(0);
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [allTimeTable, setAllTimeTable] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [editVisible, setEditVisible] = useState(false);
  const [timetable, setTimetable] = useState([]);
  const [students, setStudents] = useState([]);
  const [internalMarks, setInternalMarks] = useState([]);
  const [editMode, setEditMode] = useState(false);

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    // Fetch subjects when the component mounts
    // fetchTimeTable();
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axiosPrivate.get("/courses/getAllCourse");
      //console.log(response.data);
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error.message);
    }
  };

  const fetchTimeTable = async () => {
    try {
      //console.log(selectedCourse);
      //console.log(semester);
      if (selectedCourse && semester && year) {
        const response = await axiosPrivate.get(
          `/academic/getSemesterExamTimeTable`,
          {
            params: {
              course: selectedCourse,
              semester: semester,
              year: year,
            },
          }
        );
        setAllTimeTable(response.data);

        //console.log(response.data);
      } else {
        alert("Please Select Necessary Options");
      }
      //   setSubjects(response.data.subData);
    } catch (error) {
      console.error("Error fetching subjects:", error.message);
      alert("Something Went wrong while fetching Timetable");
      setTimetable([]);
      setSubjects([]);
      setSemester("");
    }
  };

  useEffect(() => {
    if (selectedCourse) {
      let courseSelected = courses.filter((val) => {
        if (val.id === selectedCourse) {
          return true;
        }
        return false;
      });
      setCourseYear(courseSelected[0].duration - 0);
      //console.log(courseYear);
    }
  }, [selectedCourse, courses]);

  const getNewSubjectName = (subjectID, newsubjects) => {
    let s = newsubjects.filter((val) => {
      if (val.subjectId == subjectID) {
        return true;
      }
    });
    return s[0].subjectName;
  };
  const getTimeTable = (newTimeTable, subjects) => {
    //console.log(subjects);
    //console.log("At get Timetable");
    //console.log(newTimeTable);
    let value = newTimeTable.map((value) => {
      return {
        subjectId: value.subject,
        subjectName: getNewSubjectName(value.subject, subjects),
        attendedHours: "",
        totalHours: "",
      };
    });
    //console.log(value);
    return value;
  };
  const setDefault = () => {
    setTimetable([]);
    setYear();
    setSubjects([]);
    setSemester("");
    setSelectedCourse("");
    setEditVisible(false);
    setSubjects("");
    setTimetable([]);
    setStudents([]);
    setSelectedId("");
    setSelectedName("");
  };

  const handleEvaluation = async (index) => {
    //Getting Student academic details
    try {
      let student = await axiosPrivate.get(
        "/academic/getStudentForAttendance",
        {
          params: {
            year: allTimeTable[index].year,
            InternalExamId: allTimeTable[index].id,
            semester: allTimeTable[index].semester,
            course: selectedCourse,
          },
        }
      );
      console.log(student);
      if (student.data.length === 0) {
        alert("Assement is already assessed");
      } else {
        console.log("Zt creating stud");
        setSubjects(allTimeTable[index].subjects);
        setTimetable(allTimeTable[index].schedule);
        setSelectedId(allTimeTable[index].id);
        setSelectedName(allTimeTable[index].name);
        setEditVisible(true);
        // setValues()
        console.log("TRUE", student.data);
        let stud;
        if (student.data[0].semesterAttendanceExist) {
          console.log("TRUE");
          setEditMode(true);

          stud = await student.data.map((val) => {
            console.log(val);
            return {
              ...val,
              year: allTimeTable[index].year,
              InternalExamId: allTimeTable[index].id,
              semester: allTimeTable[index].semester,
              course: selectedCourse,
            };
          });
        } else {
          stud = await student.data.map((val) => {
            return {
              ...val,
              attendance: getTimeTable(
                allTimeTable[index].schedule,
                allTimeTable[index].subjects
              ),
              year: allTimeTable[index].year,
              InternalExamId: allTimeTable[index].id,
              semester: allTimeTable[index].semester,
              course: selectedCourse,
            };
          });
        }
        setStudents(stud);
        //console.log("/// Outside stud");
        //console.log(stud);
      }
    } catch (err) {
      alert("Unknown Error Occurred Please Try again");
    }

    //need to get user Details
  };

  const getSubjectName = (subjectID) => {
    let s = subjects.filter((val) => {
      if (val.subjectId == subjectID) {
        return true;
      }
    });
    return s[0].subjectName;
  };

  const AddTotalHours = (hrs, index) => {
    let newStudent = students.map((value) => {
      //console.log(value.attendance);
      value.attendance[index].totalHours = hrs;
      return value;
    });
    // newStudent[studentIndex].attendance[index].mark = markValue;
    setStudents([...newStudent]);
  };
  const changeInAttendance = (markValue, studentIndex, markIndex) => {
    let newStudent = students;
    newStudent[studentIndex].attendance[markIndex].attendedHours = markValue;
    //console.log(newStudent);
    setStudents([...newStudent]);
  };

  const validateAttendance = (newStudents) => {
    let check = true;
    newStudents.map((val) => {
      val.attendance.map((value) => {
        if (value.totalHours === "" || value.attendedHours < 0) {
          check = false;
        }
        if (
          value.attendedHours === "" ||
          value.attendedHours < 0 ||
          Number(value.attendedHours) > Number(value.totalHours)
        ) {
          check = false;
        }
      });
    });
    return check;
  };

  const SubmitStudentMarks = async () => {
    if (validateAttendance(students)) {
      if (
        window.confirm(
          "Are you sure you want to submit the final marks these marks cannot be modified"
        )
      ) {
        console.log(students);
        try {
          let response;
          if (editMode) {
            response = await axiosPrivate.post(
              "/academic/addStudentAttendance",
              students
            );
          } else {
            response = await axiosPrivate.post(
              "/academic/addStudentAttendance",
              students
            );
          }

          console.log(response);
          if (response.status === 200) {
            alert(response.data.message);
            setDefault();
          }
        } catch (err) {
          console.error(err);
          alert("Unable to Submit Internal Marks Please Try Again");
          // setDefault();
        }
      }
    } else {
      alert("Feilds are empty or invalid Value Entered");
    }
    //console.log(students);
  };
  const handleEditEvaluation = async (index) => {
    try {
      let student = await axiosPrivate.get(
        "/academic/getStudentDetailAssessedInternal",
        {
          params: {
            year: allTimeTable[index].year,
            InternalExamId: allTimeTable[index].id,
            semester: allTimeTable[index].semester,
            course: selectedCourse,
          },
        }
      );
      if (student.data.length === 0) {
        alert("Assement is not assessed");
      } else {
        //console.log("Student");
        //console.log(student);
        let stud = await student.data.map((val) => {
          return {
            ...val,
            attendance: getTimeTable(allTimeTable[index].schedule),
            year: allTimeTable[index].year,
            InternalExamId: allTimeTable[index].id,
            semester: allTimeTable[index].semester,
            course: selectedCourse,
          };
        });
        //console.log(stud);
        setStudents(stud);
        setSubjects(allTimeTable[index].subjects);
        setTimetable(allTimeTable[index].schedule);
        setSelectedId(allTimeTable[index].id);
        setSelectedName(allTimeTable[index].name);
        setEditVisible(true);
      }
    } catch (err) {
      //console.log(err);
      alert("Unknown Error Occurred Please Try again");
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Semester Attendance</h1>

      <div className="col-md-3">
        <label htmlFor="courseYearSelect" className="form-label">
          Select Course Year:
        </label>
        <select
          id="courseYearSelect"
          className="form-select"
          onChange={(e) => setSelectedCourse(e.target.value)}
          value={selectedCourse}
        >
          <option value="">Select Course</option>
          {courses.map((val) => {
            return <option value={val.id}>{val.courseName}</option>;
          })}
        </select>
      </div>

      <div className="col-md-3">
        <label className="form-label">Select Year:</label>
        <select
          className="form-select"
          value={year}
          onChange={(e) => {
            setYear(e.target.value);
          }}
        >
          <option value="">Select Year</option>
          {[...Array(6)].map((year, index) => (
            <option key={index} value={currentYear + 5 - index}>
              {currentYear + 5 - index}
            </option>
          ))}
          {[...Array(5)].map((year, index) => (
            <option key={index} value={currentYear - (index + 1)}>
              {currentYear - (index + 1)}
            </option>
          ))}
        </select>
      </div>

      <div className="col-md-3">
        <label htmlFor="semesterSelect" className="form-label">
          Select Semester:
        </label>
        <select
          id="semesterSelect"
          className="form-select"
          onChange={(e) => {
            setSemester(e.target.value);
          }}
          value={semester}
        >
          <option value="">Select Semester</option>
          {/* Replace with your semester options */}
          {courseYear > 0
            ? [...Array(courseYear * 2)].map((val, index) => {
                return (
                  <option value={index + 1} id={index + 1}>
                    Semester {index + 1}
                  </option>
                );
              })
            : null}
        </select>
      </div>
      <div className="mb-3">
        <button
          className="btn btn-primary"
          onClick={() => {
            fetchTimeTable();
          }}
        >
          Get Semester
        </button>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Semester Detail</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allTimeTable.map((val, _index) => {
            return (
              <tr>
                <td>{val.name}</td>
                <td>
                  <div class="row">
                    <div className=" m-1 col-md-3">
                      <button
                        type="button"
                        onClick={(e) => {
                          handleEvaluation(_index);
                        }}
                        class="btn btn-warning"
                      >
                        Attendance
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {editVisible ? (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                {editMode
                  ? students[0].attendance.map((val, index) => {
                      console.log(val);
                      return (
                        <th>
                          <th>{val.subjectName}</th>
                          <table className="table">
                            <thead></thead>
                            <tbody>
                              <tr>
                                <td>Attended Hours</td>
                                <td>
                                  Total Hours
                                  <input
                                    type="number"
                                    className="form-control"
                                    value={val.totalHours}
                                    onChange={(e) => {
                                      AddTotalHours(e.target.value, index);
                                    }}
                                  />
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </th>
                      );
                    })
                  : timetable.map((val, index) => {
                      console.log(val);
                      return (
                        <th>
                          <th>{getSubjectName(val.subject)}</th>
                          <table className="table">
                            <thead></thead>
                            <tbody>
                              <tr>
                                <td>Attended Hours</td>
                                <td>
                                  Total Hours
                                  <input
                                    type="number"
                                    className="form-control"
                                    onChange={(e) => {
                                      AddTotalHours(e.target.value, index);
                                    }}
                                  />
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </th>
                      );
                    })}
              </tr>
            </thead>
            <tbody>
              {students.map((val, _index) => {
                return (
                  <tr>
                    <td>{val.studentName}</td>
                    {val.attendance.map((value, _idx) => {
                      return (
                        <td>
                          <input
                            type="number"
                            className="form-control"
                            value={value.attendedHours}
                            onChange={(e) => {
                              changeInAttendance(e.target.value, _index, _idx);
                            }}
                          />
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="mb-3">
            {editMode ? (
              <button
                className="btn btn-success"
                onClick={() => {
                  SubmitStudentMarks();
                }}
              >
                Edit Attendance
              </button>
            ) : (
              <button
                className="btn btn-success"
                onClick={() => {
                  SubmitStudentMarks();
                }}
              >
                Add Attendance
              </button>
            )}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default SemesterAttendance;
