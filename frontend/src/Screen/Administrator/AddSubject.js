import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import {
  FaBook,
  FaPlus,
  FaGraduationCap,
  FaHashtag,
  FaListOl,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddSubject = () => {
  const axiosPrivate = useAxiosPrivate();
  const [courses, setCourses] = useState([]);
  const [newSubjectCode, setNewSubjectCode] = useState("");
  const [newSubjectName, setNewSubjectName] = useState("");
  const [newSemester, setNewSemester] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
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

  const handleAssignSubjects = async () => {
    if (!selectedCourse || !newSubjectCode || !newSubjectName || !newSemester) {
      toast.warning("Please fill all fields");
      return;
    }

    try {
      const response = await axiosPrivate.post(`/courses/assigncourse`, {
        course: selectedCourse,
        code: newSubjectCode,
        name: newSubjectName,
        semester: newSemester,
      });

      toast.success(response.data.message);
      setNewSubjectCode("");
      setNewSubjectName("");
      setSelectedCourse("");
      setNewSemester("");

      // Refresh course list
      const updatedCourses = await axiosPrivate.get("/courses/getAllCourse");
      setCourses(updatedCourses.data);
    } catch (error) {
      toast.error(`Error assigning subject: ${error.message}`);
      console.error("Error assigning subjects:", error.message);
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
          <div className="mb-4">
            <h4 className="mb-3 text-primary">
              <FaPlus className="me-2" />
              Add New Subject
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
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
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

              {/* Subject Code */}
              <div className="col-md-6">
                <label className="form-label fw-bold">Subject Code</label>
                <div className="input-group">
                  <span className="input-group-text">
                    <FaHashtag />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    value={newSubjectCode}
                    onChange={(e) => setNewSubjectCode(e.target.value)}
                    placeholder="e.g., CS101"
                  />
                </div>
              </div>

              {/* Subject Name */}
              <div className="col-md-8">
                <label className="form-label fw-bold">Subject Name</label>
                <div className="input-group">
                  <span className="input-group-text">
                    <FaBook />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    value={newSubjectName}
                    onChange={(e) => setNewSubjectName(e.target.value)}
                    placeholder="e.g., Introduction to Programming"
                  />
                </div>
              </div>

              {/* Semester */}
              <div className="col-md-4">
                <label className="form-label fw-bold">Semester</label>
                <div className="input-group">
                  <span className="input-group-text">
                    <FaListOl />
                  </span>
                  <input
                    type="number"
                    className="form-control"
                    value={newSemester}
                    onChange={(e) => setNewSemester(e.target.value)}
                    placeholder="e.g., 1"
                    min="1"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="col-12">
                <button
                  className="btn btn-primary px-4"
                  onClick={handleAssignSubjects}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Adding...
                    </>
                  ) : (
                    <>
                      <FaPlus className="me-2" />
                      Add Subject
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Course List Section */}
          <div className="mt-5">
            <h4 className="mb-3 text-primary">
              <FaGraduationCap className="me-2" />
              Available Courses
            </h4>

            {isLoading ? (
              <div className="text-center py-4">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : courses.length === 0 ? (
              <div className="alert alert-info">
                No courses found. Please add some courses first.
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead className="table-light">
                    <tr>
                      <th>Degree</th>
                      <th>Course Name</th>
                      <th>Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map((course) => (
                      <tr key={course.id}>
                        <td>{course.degree}</td>
                        <td>{course.courseName}</td>
                        <td>{course.duration} years</td>
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

export default AddSubject;
