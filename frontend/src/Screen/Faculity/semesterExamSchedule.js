import React, { useState, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const SemesterExamSchedule = () => {
  const axiosPrivate = useAxiosPrivate();
  const [courses, setCourses] = useState([]);
  const [courseYear, setCourseYear] = useState(0);
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");
  const [subjects, setSubjects] = useState([]);
  // const [internalExamName, setInternalExamName] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  // const [selectedYear, setSelectedYear] = useState("");\
  const [timetable, setTimetable] = useState([]);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    // Fetch subjects when the component mounts
    // fetchSubjects();
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

  const fetchSubjects = async () => {
    try {
      console.log(selectedCourse);
      console.log(semester);
      const response = await axiosPrivate.get(`/courses/getSemester`, {
        params: {
          course: selectedCourse,
          semester: semester + 1,
        },
      });
      // console.log(response.data.subData);
      setSubjects(response.data.subData);
    } catch (error) {
      console.error("Error fetching subjects:", error.message);
      alert("No Subjects are present for this Semester");
      setTimetable([]);
      setSubjects([]);
      setSemester("");
    }
  };

  // const fetchSubjects = async () => {
  //   try {
  //     const response = await axiosPrivate.get("/api/subjects");
  //     setSubjects(response.data.subjects);
  //   } catch (error) {
  //     console.error("Error fetching subjects", error);
  //   }
  // };

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

  const AddNewTimeTable = () => {
    console.log(semester, year);
    if (semester && year) {
      // Update the timetable with the selected date, time, subject, and course year/semester
      setTimetable((prevTimetable) => [
        ...prevTimetable,
        {
          date: "",
          time: "",
          subject: "",
        },
      ]);

      // Clear the selected date, time, and subject
      // setSelectedDate("");
      // setSelectedTime("");
      // setSelectedSubject("");
    } else {
      // Handle the case where either the date, time, or subject is not selected
      alert("Select Necessary Option");
      console.error("Please select both a date, time, and a subject");
    }
  };

  const handleAssignDate = (value, index) => {
    let newTimetable = timetable;
    newTimetable[index].date = value;
    setTimetable([...newTimetable]);
  };

  const handleAssignTiming = (value, index) => {
    let newTimetable = timetable;
    newTimetable[index].time = value;
    setTimetable([...newTimetable]);
  };

  const handleAssignSubject = (value, index) => {
    let newTimetable = timetable;
    newTimetable[index].subject = value;
    setTimetable([...newTimetable]);
  };

  const checkValidTimeTable = (val) => {
    let temp = val.filter((value) => {
      if (value.date === "" || value.time == "" || value.subject === "") {
        return false;
      }
      return true;
    });
    return val.length === temp.length;
  };

  const handleAssignRemoval = (index) => {
    if (timetable.length == 1) {
      setTimetable([]);
    } else {
      let temp = timetable.filter((val, idx) => {
        if (index === idx) {
          return false;
        }
        return true;
      });
      setTimetable([...temp]);
    }
  };

  const handleAssignTimetable = async () => {
    // handle assign time table event
    if (checkValidTimeTable(timetable)) {
      let data = {
        year: year,
        course: selectedCourse,
        name: "Semester " + semester,
        semester: semester,
        subjects: subjects,
        schedule: timetable,
      };
      console.log(data);

      try {
        const response = await axiosPrivate.post(
          `/academic/createNewSemesterExam`,
          data
        );
        if (response.status === 200) {
          alert(response.data.message);
          // setTimetable([]);
        }
      } catch (error) {
        console.log(error);
        alert(error.response.data.message);
      }

      console.log(timetable);
    } else {
      alert("Some Feilds are empty");
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Semester Exam Timetable</h1>

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
            <option key={index} value={currentYear + 4 - index}>
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

      {/* <div className="col-md-3">
        <label className="form-label">Select Internal Exam Name:</label>
        <select
          className="form-select"
          value={internalExamName}
          onChange={(e) => {
            setInternalExamName(e.target.value);
          }}
        >
          <option value="">Select Year</option>
          {[...Array(4)].map((year, index) => (
            <option key={index} value={index + 1}>
              Internal Exam {index + 1}
            </option>
          ))}
        </select>
      </div> */}

      {/* <div className="col-md-3">
          <label htmlFor="courseYearSelect" className="form-label">
            Select Course Year:
          </label>
          <select
            id="courseYearSelect"
            className="form-select"
            onChange={(e) => setSelectedYear(e.target.value)}
            value={selectedYear}
          >
            <option value="">Select Course Year</option>
            {courseYear > 0
              ? [...Array(courseYear)].map((val, index) => {
                  return (
                    <option value={index + 1} id={index + 1}>
                      {" "}
                      Year {index + 1}
                    </option>
                  );
                })
              : null}
          </select>
        </div> */}
      <div className="col-md-3">
        <label htmlFor="semesterSelect" className="form-label">
          Select Semester:
        </label>
        <select
          id="semesterSelect"
          className="form-select"
          onChange={(e) => {
            setSemester(e.target.value);
            fetchSubjects();
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

      <div className="mb-3"></div>
      <h2 className="mb-4">Timetable</h2>
      <button type="button" onClick={AddNewTimeTable} class="btn btn-success">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-plus"
          viewBox="0 0 16 16"
        >
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"></path>
        </svg>
        Subject
      </button>
      <table className="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Subject</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {timetable.map((entry, index) => (
            <tr key={index}>
              <td>
                <label htmlFor="dateSelect" className="form-label">
                  Select Date:
                </label>
                <input
                  type="date"
                  id="dateSelect"
                  className="form-control"
                  value={entry.date}
                  onChange={(e) => handleAssignDate(e.target.value, index)}
                />
              </td>
              <td>
                <label htmlFor="timeSelect" className="form-label">
                  Select Time:
                </label>
                <input
                  type="time"
                  id="timeSelect"
                  className="form-control"
                  value={entry.time}
                  onChange={(e) => handleAssignTiming(e.target.value, index)}
                />
              </td>
              <td>
                <label htmlFor="subjectSelect" className="form-label">
                  Select Subject:
                </label>
                <select
                  id="subjectSelect"
                  className="form-select"
                  onChange={(e) => {
                    handleAssignSubject(e.target.value, index);
                  }}
                  value={entry.subject}
                >
                  <option value="">Select Subject</option>
                  {subjects.map((subject) => (
                    <option key={subject.subjectId} value={subject.subjectId}>
                      {subject.subjectCode}- {subject.subjectName}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <button
                  type="button"
                  onClick={(e) => {
                    handleAssignRemoval(index);
                  }}
                  class="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mb-3">
        <button className="btn btn-primary" onClick={handleAssignTimetable}>
          Assign TimeTable
        </button>
      </div>
    </div>
  );
};

export default SemesterExamSchedule;
