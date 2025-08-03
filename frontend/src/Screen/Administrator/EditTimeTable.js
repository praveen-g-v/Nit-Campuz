import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const EditTimeTable = () => {
  const [courses, setCourses] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const [selectedCourse, setSelectedCourse] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [year, setYear] = useState();
  const [timetableId, setTimeTableId] = useState();
  const currentYear = new Date().getFullYear();
  const [timetables, setTimetables] = useState({
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
  });
  const initialTimetables = {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
  };
  useEffect(() => {
    // Fetch initial data when the component mounts
    fetchCourses();
  }, []);

  const setDefaultValues = () => {
    setTimetables(initialTimetable);
    setSelectedCourse([]);
    setSelectedSemester("");
    setYear("");
  };

  const fetchCourses = async () => {
    try {
      const response = await axiosPrivate.get("/courses/getAllCourse");
      console.log(response.data);
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error.message);
    }
  };

  const handleCourseChange = (e) => {
    courses.forEach((val) => {
      if (val.id == e.target.value) {
        setSelectedCourse(val);
      }
    });
    setSelectedSemester("");
    //   setCourses([]); // Reset selected semester when changing the course
    setSubjects([]); // Reset subjects when changing the course
  };
  const getCourseOption = () => {
    console.log(selectedCourse);
    let r = [],
      i;
    for (i = 1; i <= selectedCourse.duration * 2; i++) {
      r.push(i);
    }
    // console.log(r)
    return r;
  };

  const handleSemesterChange = (e) => {
    setSelectedSemester(e.target.value);
    //   fetchSubjects(); // Fetch subjects when changing the semester
  };

  const fetchSubjects = async () => {
    try {
      const response = await axiosPrivate.get(`/courses/getSemester`, {
        params: {
          course: selectedCourse.id,
          semester: selectedSemester,
        },
      });
      console.log(response.data.subData);
      setSubjects(response.data.subData);
    } catch (error) {
      console.error("Error fetching subjects:", error.message);
    }
    try {
      const response = await axiosPrivate.get(`/academic/getTimeTable`, {
        params: {
          course: selectedCourse.id,
          semester: selectedSemester,
          year: year,
        },
      });
      console.log(response.data);
      setTimetables(response.data.timetable);
      setTimeTableId(response.data.timetableId);
      // setSubjects(response.data.subData);
    } catch (error) {
      console.error("Error fetching subjects:", error.message);
    }
  };
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const initialTimetable = daysOfWeek.map(() =>
    Array(6).fill({ subjectCode: "", subjectName: "" })
  );

  const [timetable, setTimetable] = useState(initialTimetable);

  const handleInputChange = (dayIndex, hourIndex, field, value) => {
    console.log("dayIndex", dayIndex);
    console.log("hourIndex", hourIndex);
    console.log("feild", field);
    console.log("value", value);
    let table = timetables;
    switch (dayIndex) {
      case 0:
        table.monday[hourIndex] = value;
        break;
      case 1:
        table.tuesday[hourIndex] = value;
        break;
      case 2:
        table.wednesday[hourIndex] = value;
        break;
      case 3:
        table.thursday[hourIndex] = value;
        break;
      case 4:
        table.friday[hourIndex] = value;
        break;
      case 5:
        table.saturday[hourIndex] = value;
        break;
      default:
    }
    console.log(table);
    setTimetables(table);
    // setTimetables
    // const updatedTimetable = [...timetable];
    // updatedTimetable[dayIndex][hourIndex][field] = value;
    // console.log(updatedTimetable)
    // setTimetable(updatedTimetable);
  };
  const checkTimetable = () => {
    if (
      timetables.monday.length < 7 ||
      timetables.tuesday.length < 7 ||
      timetables.wednesday.length < 7 ||
      timetables.thursday.length < 7 ||
      timetables.friday.length < 7 ||
      timetables.saturday.length < 7
    ) {
      return true;
    } else {
      timetables.monday.forEach((val) => {
        if (val === undefined) {
          return true;
        }
      });
      timetables.tuesday.forEach((val) => {
        if (val === undefined) {
          return true;
        }
      });
      timetables.wednesday.forEach((val) => {
        if (val === undefined) {
          return true;
        }
      });
      timetables.thursday.forEach((val) => {
        if (val === undefined) {
          return true;
        }
      });
      timetables.friday.forEach((val) => {
        if (val === undefined) {
          return true;
        }
      });
      timetables.saturday.forEach((val) => {
        if (val === undefined) {
          return true;
        }
      });
    }
  };

  const handleSubmit = async () => {
    // You can send the timetable data to the server or perform any other action
    // In this example, we'll display an alert with the formatted timetable
    console.log("courses", selectedCourse);
    console.log("selectedSemester", selectedSemester);
    if (checkTimetable()) {
      alert("All table values are not filled");
      return;
    }
    const sample = {
      timetableId: timetableId,
      timetable: timetables,
    };
    try {
      const response = await axiosPrivate.patch(
        `/academic/modifyTimeTable`,
        sample
      );
      if (response.status == 200) {
        setDefaultValues();

        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
      alert(error.data.message);
    }

    console.log(sample);

    const formattedTimetable = timetable.map((day, dayIndex) =>
      day.map(({ subjectCode, subjectName }, hourIndex) => ({
        day: daysOfWeek[dayIndex],
        hour: `${hourIndex + 1}:00 - ${hourIndex + 2}:00`,
        subjectCode,
        subjectName,
      }))
    );
    console.log(formattedTimetable);

    alert(JSON.stringify(formattedTimetable, null, 2));
  };

  const setTableValue = () => {
    //#root > div > div > table > tbody > tr:nth-child(1) > td:nth-child(2)

    ///document.querySelector("#root > div > div > table > tbody > tr:nth-child(2) > td:nth-child(2) > select")
    var t;
  };

  return (
    <div className="container mt-4">
      <h1>Weekly Timetable</h1>
      <div className="mb-4">
        <div className="mb-3">
          <label className="form-label">Select Course:</label>
          <select className="form-select" onChange={handleCourseChange}>
            <option value="">Select a Course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.courseName}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Select Semester:</label>
          <select className="form-select" onChange={handleSemesterChange}>
            <option value="">Select Semester</option>
            {selectedCourse != null
              ? getCourseOption().map((val) => (
                  <option key={val} value={val}>
                    {val}
                  </option>
                ))
              : null}
          </select>
        </div>
        <div className="mb-3">
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
        <button className="btn btn-primary" onClick={fetchSubjects}>
          Change Table
        </button>
      </div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Day/Time</th>
            {[...Array(6)].map((_, index) => (
              <th key={index}>{daysOfWeek[index]}</th>
            ))}
          </tr>
        </thead>
        <tbody key="subjectTable">
          {[...Array(6)].map((_, hourIndex) => (
            <tr key={hourIndex}>
              {/* {`${hourIndex + 1}:00 - ${hourIndex + 2}:00`} */}
              <td>{`Hour- ${hourIndex + 1}`}</td>
              {daysOfWeek.map((_, dayIndex) => {
                let r = timetables.monday;
                if (hourIndex === 0) {
                  r = timetables.monday;
                }
                if (hourIndex === 1) {
                  r = timetables.tuesday;
                }
                if (hourIndex === 2) {
                  r = timetables.wednesday;
                }
                if (hourIndex === 3) {
                  r = timetables.thursday;
                }
                if (hourIndex === 4) {
                  r = timetables.friday;
                }
                if (hourIndex === 5) {
                  r = timetables.saturday;
                }
                return (
                  <td key={dayIndex}>
                    {/* <div className="mb-2"> */}
                    <select
                      className="form-select"
                      onChange={(e) =>
                        handleInputChange(
                          dayIndex,
                          hourIndex,
                          e.target,
                          e.target.value
                        )
                      }
                    >
                      <option value="">Select a Course</option>
                      {subjects.map((course) => {
                        if (course.subjectId == r[dayIndex]) {
                          return (
                            <option
                              key={course.subjectId}
                              selected
                              value={course.subjectId}
                            >
                              {course.subjectCode}-{course.subjectName}
                            </option>
                          );
                        }
                        console.log(hourIndex, dayIndex);
                        return (
                          <option
                            key={course.subjectId}
                            value={course.subjectId}
                          >
                            {course.subjectCode}-{course.subjectName}
                          </option>
                        );
                      })}
                    </select>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-center">
        <button className="btn btn-primary" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default EditTimeTable;
