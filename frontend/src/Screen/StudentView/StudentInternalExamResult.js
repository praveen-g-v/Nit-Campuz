import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const StudentInternalExamResult = () => {
  const axiosPrivate = useAxiosPrivate();
  const [internalExamResults, setInternalExamResults] = useState([]);
  const getInternalResult = async () => {
    try {
      let resp = await axiosPrivate.get("/academic/getInternalExamResult");
      console.log(resp.data);
      setInternalExamResults(resp.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getInternalResult();
  }, []);

  return (
    <div className="container">
      <h1>Internal Exam Results</h1>
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
          {internalExamResults.map((result, index) => (
            <>
              {result.subjects.map((subject, idx) => (
                <tr key={index}>
                  <td>{result.semester}</td>
                  <td>{result.examName}</td>
                  <td>{subject.subjectName}</td>
                  <td>{subject.mark}/30</td>
                </tr>
              ))}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentInternalExamResult;
