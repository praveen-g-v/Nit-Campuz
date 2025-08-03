import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const StudentSemesterExamTimetable = () => {
  // Sample exam timetable data
  const axiosPrivate = useAxiosPrivate();
  const [examTimetable, setExamTimeTable] = useState([]);
  const getSemesterTimeTable = async () => {
    try {
      let resp = await axiosPrivate.get(
        "/academic/getUpcomingSemesterSchedule"
      );
      console.log(resp.data);
      setExamTimeTable(resp.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getSemesterTimeTable();
  }, []);
  //   const examTimetable = [
  //     { date: "2024-03-15", time: "09:00 AM", subject: "Mathematics" },
  //     { date: "2024-03-17", time: "10:30 AM", subject: "Physics" },
  //     { date: "2024-03-20", time: "01:00 PM", subject: "Chemistry" },
  //   ];

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

export default StudentSemesterExamTimetable;
