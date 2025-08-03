import React, { useState, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const StudentAttendance = () => {
  const axiosPrivate = useAxiosPrivate();
  const [attendanceData, setAttenddance] = useState([]);
  const getAttendance = async () => {
    try {
      let resp = await axiosPrivate.get("/academic/getAllAttendance");
      console.log(resp.data);
      setAttenddance(resp.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getAttendance();
  }, []);

  return (
    <div className="container">
      <h1>Student Attendance</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Semester</th>
            <th>Subject Name</th>
            <th>Attended Hours</th>
            <th>Total Hours</th>
            <th>Percentage</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((record, index) =>
            record.attendance.map((subject, idx) => (
              <tr key={`${index}-${idx}`}>
                {idx === 0 && (
                  <td rowSpan={record.attendance.length}>{record.semester}</td>
                )}
                <td>{subject.subjectName}</td>
                <td>{subject.attendedHours}</td>
                <td>{subject.totalHours}</td>
                <td>
                  {Math.round(
                    (subject.attendedHours / subject.totalHours) * 100
                  )}
                  %
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentAttendance;
