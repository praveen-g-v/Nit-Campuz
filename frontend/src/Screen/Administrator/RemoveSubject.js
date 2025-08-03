import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import {
  FaBook,
  FaTrash,
  FaSearch,
  FaGraduationCap,
  FaLayerGroup,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { axiosPrivate } from "../../api/axios";

const RemoveSubjects = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingSubjects, setIsFetchingSubjects] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axiosPrivate.get("/courses/getAllCourse");
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error.message);
        toast.error("Failed to load courses");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCourseChange = (e) => {
    const course = courses.find((val) => val.id == e.target.value);
    setSelectedCourse(course || []);
    setSelectedSemester("");
    setSubjects([]);
  };

  const getCourseOption = () => {
    if (!selectedCourse || !selectedCourse.duration) return [];
    const semesters = [];
    for (let i = 1; i <= selectedCourse.duration * 2; i++) {
      semesters.push(i);
    }
    return semesters;
  };

  const handleSemesterChange = (e) => {
    setSelectedSemester(e.target.value);
  };

  const fetchSubjects = async () => {
    if (!selectedCourse.id || !selectedSemester) {
      toast.warning("Please select both course and semester");
      return;
    }

    setIsFetchingSubjects(true);
    try {
      const response = await axiosPrivate.get(`/courses/getSemester`, {
        params: {
          course: selectedCourse.id,
          semester: selectedSemester,
        },
      });
      setSubjects(response.data.subData || []);
      if (!response.data.subData || response.data.subData.length === 0) {
        toast.info("No subjects found for selected semester");
      }
    } catch (error) {
      console.error("Error fetching subjects:", error.message);
      toast.error("Failed to load subjects");
    } finally {
      setIsFetchingSubjects(false);
    }
  };

  const handleRemoveSubject = async (subjectId, subjectName) => {
    if (!window.confirm(`Are you sure you want to remove ${subjectName}?`)) {
      return;
    }

    try {
      await axiosPrivate.delete(`/courses/deleteSubject`, {
        params: { subjectId: subjectId },
      });

      toast.success("Subject removed successfully");
      setSubjects(subjects.filter((val) => val.subjectId != subjectId));
    } catch (error) {
      console.error("Error removing subject:", error.message);
      toast.error("Failed to remove subject");
    }
  };

  return (
    <div className="container py-4">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h2 className="mb-0">
            <FaBook className="me-2" />
            Subject Management
          </h2>
        </div>

        <div className="card-body">
          {/* Course and Semester Selection */}
          <div className="mb-5">
            <h4 className="mb-3 text-primary">
              <FaSearch className="me-2" />
              Find Subjects
            </h4>

            <div className="row g-3">
              {/* Course Selection */}
              <div className="col-md-6">
                <label className="form-label fw-bold">Select Course</label>
                <div className="input-group">
                  <span className="input-group-text">
                    <FaGraduationCap />
                  </span>
                  <select
                    className="form-select"
                    onChange={handleCourseChange}
                    disabled={isLoading}
                  >
                    <option value="">Select a Course</option>
                    {courses.map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.degree} - {course.courseName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Semester Selection */}
              <div className="col-md-4">
                <label className="form-label fw-bold">Select Semester</label>
                <div className="input-group">
                  <span className="input-group-text">
                    <FaLayerGroup />
                  </span>
                  <select
                    className="form-select"
                    onChange={handleSemesterChange}
                    value={selectedSemester}
                    disabled={!selectedCourse.id || isLoading}
                  >
                    <option value="">Select Semester</option>
                    {getCourseOption().map((val) => (
                      <option key={val} value={val}>
                        Semester {val}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* View Subjects Button */}
              <div className="col-md-2 d-flex align-items-end">
                <button
                  className="btn btn-primary w-100"
                  onClick={fetchSubjects}
                  disabled={
                    !selectedCourse.id ||
                    !selectedSemester ||
                    isFetchingSubjects
                  }
                >
                  {isFetchingSubjects ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                      ></span>
                      Loading...
                    </>
                  ) : (
                    <>
                      <FaSearch className="me-2" />
                      View
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Subjects List */}
          <div>
            <h4 className="mb-3 text-primary">
              <FaBook className="me-2" />
              {selectedCourse.courseName || "Selected Course"} - Semester{" "}
              {selectedSemester || "N/A"}
            </h4>

            {isFetchingSubjects ? (
              <div className="text-center py-4">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : subjects.length === 0 ? (
              <div className="alert alert-info">
                {selectedSemester
                  ? "No subjects found for selected semester"
                  : "Please select a course and semester to view subjects"}
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead className="table-light">
                    <tr>
                      <th width="15%">Code</th>
                      <th>Subject Name</th>
                      <th width="15%" className="text-end">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {subjects.map((subject) => (
                      <tr key={subject.subjectId}>
                        <td>
                          <strong>{subject.subjectCode}</strong>
                        </td>
                        <td>{subject.subjectName}</td>
                        <td className="text-end">
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() =>
                              handleRemoveSubject(
                                subject.subjectId,
                                subject.subjectName
                              )
                            }
                          >
                            <FaTrash className="me-1" />
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemoveSubjects;
