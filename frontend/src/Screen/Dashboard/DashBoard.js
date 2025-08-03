import React, { useState, useEffect } from "react";
import { axiosPrivate } from "../../api/axios";
import { Link } from "react-router-dom";
import useLoadingScreen from "../../hooks/useLoadingScreen";
import {
  FaBook,
  FaCalendarAlt,
  FaClipboardCheck,
  FaChartLine,
  FaGraduationCap,
  FaUserGraduate,
  FaPercentage,
} from "react-icons/fa";

function DashBoard() {
  const [isLoading, setIsLoading] = useState(true);
  const loadingScreen = useLoadingScreen(isLoading);
  const [totalAttendance, setTotalAttendance] = useState("");
  const [totalSemesterExamSchedule, setTotalSemesterExamSchedule] =
    useState("");
  const [totalInternalExamSchedule, setTotalInternalExamSchedule] =
    useState("");
  const [totalInternalExamResult, setTotalInternalExamResult] = useState("");
  const [totalSemesterExamResult, settotalSemesterExamResult] = useState("");
  const [totalBooks, settotalBooks] = useState("");
  const getTotalAttendance = async () => {
    try {
      const resp = await axiosPrivate.get("academic/getAcademicAttendance");
      if (resp.status === 200) {
        setTotalAttendance(resp.data);
      }
      setTotalAttendance(resp.data);
    } catch (err) {
      console.log(err);
    }
  };
  const getUpCommingSemsterExam = async () => {
    try {
      const resp = await axiosPrivate.get(
        "academic/getUpcomingSemesterSchedule"
      );
      if (resp.status === 200) {
        setTotalSemesterExamSchedule(resp.data.length);
      }
      setTotalSemesterExamSchedule(resp.data.length);
    } catch (err) {
      console.log(err);
      setTotalSemesterExamSchedule("0");
    }
  };
  const getUpCommingInternalExam = async () => {
    try {
      const resp = await axiosPrivate.get(
        "academic/getUpcomingInternalSchedule"
      );
      if (resp.status === 200) {
        setTotalInternalExamSchedule(resp.data.length);
      }
      setTotalInternalExamSchedule(resp.data.length);
    } catch (err) {
      console.log(err);
      setTotalInternalExamSchedule("0");
    }
  };
  const getUpCommingInternalExamResult = async () => {
    try {
      const resp = await axiosPrivate.get("academic/getInternalExamResult");
      if (resp.status === 200) {
        setTotalInternalExamResult(resp.data.length);
      }
      setTotalInternalExamResult(resp.data.length);
    } catch (err) {
      console.log(err);
      setTotalInternalExamResult("0");
    }
  };
  const getSemesterExamResult = async () => {
    try {
      const resp = await axiosPrivate.get("academic/getSemesterExamResult");
      // console.log(resp);
      if (resp.status === 200) {
        settotalSemesterExamResult(resp.data.length);
      }
      settotalSemesterExamResult(resp.data.length);
    } catch (err) {
      console.log(err);
      settotalSemesterExamResult("0");
    }
  };
  const getTotalBooks = async () => {
    try {
      const resp = await axiosPrivate.get("library/getAllBook");
      // console.log(resp);
      if (resp.status === 200) {
        settotalBooks(resp.data.length);
      }
      settotalBooks(resp.data.length);
    } catch (err) {
      console.log(err);
      settotalBooks("0");
    }
  };
  useEffect(() => {
    getTotalAttendance();
    getUpCommingSemsterExam();
    getUpCommingInternalExam();
    getUpCommingInternalExamResult();
    getSemesterExamResult();
    getTotalBooks();
    setIsLoading(false);
  }, []);
  // Function to determine card color based on attendance percentage
  const getAttendanceColor = (percentage) => {
    if (!percentage) return "primary";
    const perc = parseFloat(percentage);
    if (perc >= 75) return "success";
    if (perc >= 50) return "warning";
    return "danger";
  };

  return (
    <>
      {loadingScreen}
      <div className="container mt-3" style={{ minHeight: "10em" }}>
        <h2 className="mb-4">Dashboard</h2>
        <div className="row">
          {/* Attendance Card */}
          <div className="col-sm-6 col-lg-4 mb-4">
            <div
              className={`card text-white bg-${getAttendanceColor(
                totalAttendance.totalPercentage
              )} h-100`}
            >
              <div className="card-header d-flex align-items-center">
                <FaPercentage className="me-2" size={24} />
                <h5 className="card-title mb-0">Attendance Percentage</h5>
              </div>
              <div className="card-body text-center">
                <h1 className="display-4">
                  {totalAttendance.totalPercentage || 0}%
                </h1>
                <p className="card-text">Your current attendance percentage</p>
                <Link to="/student/attendance" className="btn btn-light">
                  View Details
                </Link>
              </div>
            </div>
          </div>

          {/* Library Card */}
          <div className="col-sm-6 col-lg-4 mb-4">
            <div className="card bg-info text-white h-100">
              <div className="card-header d-flex align-items-center">
                <FaBook className="me-2" size={24} />
                <h5 className="card-title mb-0">Library</h5>
              </div>
              <div className="card-body text-center">
                <h1 className="display-4">{totalBooks || 0}</h1>
                <p className="card-text">Books available in library</p>
                <Link to="/library/bookscatalogue" className="btn btn-light">
                  Browse Books
                </Link>
              </div>
            </div>
          </div>

          {/* Exam Schedule Card */}
          <div className="col-sm-6 col-lg-4 mb-4">
            <div className="card bg-primary text-white h-100">
              <div className="card-header d-flex align-items-center">
                <FaCalendarAlt className="me-2" size={24} />
                <h5 className="card-title mb-0">Exam Schedule</h5>
              </div>
              <div className="card-body text-center">
                <h1 className="display-4">{totalSemesterExamSchedule || 0}</h1>
                <p className="card-text">Upcoming semester exams</p>
                <Link to="/student/semestertimetable" className="btn btn-light">
                  View Schedule
                </Link>
              </div>
            </div>
          </div>

          {/* Internal Exam Card */}
          <div className="col-sm-6 col-lg-4 mb-4">
            <div className="card bg-secondary text-white h-100">
              <div className="card-header d-flex align-items-center">
                <FaClipboardCheck className="me-2" size={24} />
                <h5 className="card-title mb-0">Internal Exam</h5>
              </div>
              <div className="card-body text-center">
                <h1 className="display-4">{totalInternalExamSchedule || 0}</h1>
                <p className="card-text">Upcoming internal exams</p>
                <Link to="/student/internaltimetable" className="btn btn-light">
                  View Schedule
                </Link>
              </div>
            </div>
          </div>

          {/* Internal Exam Result Card */}
          <div className="col-sm-6 col-lg-4 mb-4">
            <div className="card bg-success text-white h-100">
              <div className="card-header d-flex align-items-center">
                <FaChartLine className="me-2" size={24} />
                <h5 className="card-title mb-0">Internal Exam Marks</h5>
              </div>
              <div className="card-body text-center">
                <h1 className="display-4">{totalInternalExamResult || 0}</h1>
                <p className="card-text">Available internal results</p>
                <Link to="/student/internalResult" className="btn btn-light">
                  View Results
                </Link>
              </div>
            </div>
          </div>

          {/* Semester Exam Result Card */}
          <div className="col-sm-6 col-lg-4 mb-4">
            <div className="card bg-warning text-dark h-100">
              <div className="card-header d-flex align-items-center">
                <FaGraduationCap className="me-2" size={24} />
                <h5 className="card-title mb-0">Semester Exam Marks</h5>
              </div>
              <div className="card-body text-center">
                <h1 className="display-4">{totalSemesterExamResult || 0}</h1>
                <p className="card-text">Available semester results</p>
                <Link to="/student/semesterResult" className="btn btn-dark">
                  View Results
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashBoard;
