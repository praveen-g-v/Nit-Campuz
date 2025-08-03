import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const StudentInternalExamTimetable = () => {
  // Sample exam timetable data
  const axiosPrivate = useAxiosPrivate();
  const [examTimetable, setExamTimeTable] = useState([]);
  const getInternalTimeTable = async () => {
    try {
      let resp = await axiosPrivate.get(
        "/academic/getUpcomingInternalSchedule"
      );
      console.log(resp.data);
      setExamTimeTable(resp.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getInternalTimeTable();
  }, []);

  return (
    <div className="container">
      <h1>Upcoming Exam Timetable</h1>
      {examTimetable.length < 1 ? (
        <div className="card-title">No Exam Schedule Yet</div>
      ) : (
        ""
      )}
      {examTimetable.map((exam, index) => (
        <div key={index} className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">
              {exam.subject.subjectName}- {exam.subject.subjectCode}
            </h5>
            <p className="card-text">
              <strong>Date:</strong> {exam.date}
            </p>
            <p className="card-text">
              <strong>Time:</strong> {exam.time}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StudentInternalExamTimetable;
