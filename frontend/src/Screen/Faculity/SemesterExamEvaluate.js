import React, { useState, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const SemesterExamEvaluation = () => {
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

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    // Fetch subjects when the component mounts
    // fetchTimeTable();
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axiosPrivate.get("/courses/getAllCourse");
      console.log(response.data);
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error.message);
    }
  };

  const fetchTimeTable = async () => {
    try {
      console.log(selectedCourse);
      console.log(semester);
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

        console.log(response.data);
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
      console.log(courseYear);
    }
  }, [selectedCourse, courses]);
  const getTimeTable = () => {
    let value = timetable.map((value) => {
      return {
        subjectId: value.subject,
        subjectName: getSubjectName(value.subject),
        mark: "",
      };
    });
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
        "/academic/getStudentDetailSemester",
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
        alert("Assement is already assessed");
      } else {
        let stud = await student.data.map((val) => {
          return {
            ...val,
            marks: getTimeTable(),
            year: allTimeTable[index].year,
            InternalExamId: allTimeTable[index].id,
            semester: allTimeTable[index].semester,
            course: selectedCourse,
          };
        });
        console.log(stud);
        setStudents(stud);
        setSubjects(allTimeTable[index].subjects);
        setTimetable(allTimeTable[index].schedule);
        setSelectedId(allTimeTable[index].id);
        setSelectedName(allTimeTable[index].name);
        setEditVisible(true);
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

  const changeInMark = (markValue, studentIndex, markIndex) => {
    let newStudent = students;
    newStudent[studentIndex].marks[markIndex].mark = markValue;
    setStudents([...newStudent]);
  };

  const validateMark = (newStudents) => {
    let check = true;
    newStudents.map((val) => {
      val.marks.map((value) => {
        if (value.mark === "" || value.mark < 0 || value.mark > 100) {
          check = false;
        }
      });
    });
    return check;
  };

  const SubmitStudentMarks = async () => {
    if (validateMark(students)) {
      if (
        window.confirm(
          "Are you sure you want to submit the final marks these marks cannot be modified"
        )
      ) {
        console.log(students);
        try {
          let response = await axiosPrivate.post(
            "/academic/addSemesterMarks",
            students
          );
          console.log(response);
          if (response.status === 200) {
            alert(response.data.message);
            setDefault();
          }
        } catch (err) {
          console.error(err);
          alert("Unable to Submit Internal Marks Please Try Again");
          setDefault();
        }
      }
    } else {
      alert("Feilds are empty or invalid Marks Entered");
    }
    console.log(students);
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
        console.log("Student");
        console.log(student);
        let stud = await student.data.map((val) => {
          return {
            ...val,
            marks: getTimeTable(),
            year: allTimeTable[index].year,
            InternalExamId: allTimeTable[index].id,
            semester: allTimeTable[index].semester,
            course: selectedCourse,
          };
        });
        console.log(stud);
        setStudents(stud);
        setSubjects(allTimeTable[index].subjects);
        setTimetable(allTimeTable[index].schedule);
        setSelectedId(allTimeTable[index].id);
        setSelectedName(allTimeTable[index].name);
        setEditVisible(true);
      }
    } catch (err) {
      alert("Unknown Error Occurred Please Try again");
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Internal Exam Timetable</h1>

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
          View TimeTable
        </button>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Internal Exam</th>
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
                        Start Evaluation
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
                {timetable.map((val) => {
                  return <th>{getSubjectName(val.subject)}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {students.map((val, _index) => {
                return (
                  <tr>
                    <td>{val.studentName}</td>
                    {val.marks.map((value, _idx) => {
                      return (
                        <td>
                          <input
                            type="number"
                            className="form-control"
                            value={value.mark}
                            onChange={(e) => {
                              changeInMark(e.target.value, _index, _idx);
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
            <button
              className="btn btn-success"
              onClick={() => {
                SubmitStudentMarks();
              }}
            >
              Submit Marks
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default SemesterExamEvaluation;
