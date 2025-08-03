import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const StudentSemesterExamResult = () => {
  const axiosPrivate = useAxiosPrivate();
  const [semesterExamResults, setSemesterExamResults] = useState([]);
  const getSemesterResult = async () => {
    try {
      let resp = await axiosPrivate.get("/academic/getSemesterExamResult");
      console.log(resp.data);
      setSemesterExamResults(resp.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getSemesterResult();
  }, []);

  return (
    <div className="container">
      <h1>Semester Exam Results</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Semester</th>
            <th>Exam Name</th>
            <th>Subjects</th>
            <th>Mark</th>
          </tr>
        </thead>
        <tbody>
          {semesterExamResults.map((result, index) => (
            <>
              {result.subjects.map((subject, idx) => (
                <tr key={index}>
                  <td>{result.semester}</td>
                  <td>{result.examName}</td>
                  <td>{subject.subjectName}</td>
                  <td>{subject.mark}/100</td>
                </tr>
              ))}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentSemesterExamResult;
