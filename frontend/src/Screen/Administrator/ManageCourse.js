import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaPlus,
  FaTrash,
  FaBook,
  FaGraduationCap,
  FaClock,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { axiosPrivate } from "../../api/axios";

const ManageCourse = () => {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({
    degree: "",
    courseName: "",
    duration: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
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
    fetchCourses();
  }, []);

  const handleInputChange = (e) => {
    setNewCourse({ ...newCourse, [e.target.name]: e.target.value });
  };

  const handleCreateCourse = async () => {
    if (!newCourse.degree || !newCourse.courseName || !newCourse.duration) {
      toast.warning("Please fill all fields");
      return;
    }

    try {
      const response = await axiosPrivate.post("/courses/addCourse", newCourse);
      toast.success(response.data.message);
      setNewCourse({ degree: "", courseName: "", duration: "" });

      // Fetch updated courses
      const updatedCourses = await axiosPrivate.get("/courses/getAllCourse");
      setCourses(updatedCourses.data);
    } catch (error) {
      toast.error(`Error creating course: ${error.message}`);
    }
  };

  const handleDeleteCourse = async (id, coursename) => {
    if (!window.confirm(`Are you sure you want to remove ${coursename}?`)) {
      return;
    }

    try {
      const response = await axiosPrivate.delete(`/courses/deleteCourse`, {
        params: { id },
      });
      toast.success(response.data.message);

      // Fetch updated courses
      const updatedCourses = await axiosPrivate.get("/courses/getAllCourse");
      setCourses(updatedCourses.data);
    } catch (error) {
      toast.error(`Error deleting course: ${error.message}`);
    }
  };

  return (
    <div className="container py-4">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="card shadow mb-4">
        <div className="card-header bg-primary text-white">
          <h3 className="mb-0">
            <FaBook className="me-2" />
            Course Management
          </h3>
        </div>

        <div className="card-body">
          {/* Create Course Section */}
          <div className="mb-5">
            <h4 className="mb-3 text-primary d-flex align-items-center">
              <FaPlus className="me-2" />
              Add New Course
            </h4>

            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label fw-bold">Degree</label>
                <div className="input-group">
                  <span className="input-group-text">
                    <FaGraduationCap />
                  </span>
                  <input
                    type="text"
                    value={newCourse.degree}
                    name="degree"
                    className="form-control"
                    onChange={handleInputChange}
                    placeholder="e.g., B.Tech, M.Sc"
                  />
                </div>
              </div>

              <div className="col-md-4">
                <label className="form-label fw-bold">Course Name</label>
                <div className="input-group">
                  <span className="input-group-text">
                    <FaBook />
                  </span>
                  <input
                    type="text"
                    name="courseName"
                    value={newCourse.courseName}
                    className="form-control"
                    onChange={handleInputChange}
                    placeholder="e.g., Computer Science"
                  />
                </div>
              </div>

              <div className="col-md-2">
                <label className="form-label fw-bold">Duration</label>
                <div className="input-group">
                  <span className="input-group-text">
                    <FaClock />
                  </span>
                  <input
                    type="number"
                    name="duration"
                    value={newCourse.duration}
                    className="form-control"
                    onChange={handleInputChange}
                    placeholder="Years"
                  />
                </div>
              </div>

              <div className="col-md-2 d-flex align-items-end">
                <button
                  className="btn btn-primary w-100"
                  onClick={handleCreateCourse}
                >
                  <FaPlus className="me-2" />
                  Add Course
                </button>
              </div>
            </div>
          </div>

          <hr className="my-4" />

          {/* Courses List Section */}
          <div>
            <h4 className="mb-3 text-primary">
              <FaBook className="me-2" />
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
                No courses found. Please add some courses.
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead className="table-light">
                    <tr>
                      <th scope="col">Course Name</th>
                      <th scope="col">Degree</th>
                      <th scope="col">Duration (Years)</th>
                      <th scope="col" className="text-end">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map((course) => (
                      <tr key={course.id}>
                        <td>
                          <strong>{course.courseName}</strong>
                        </td>
                        <td>{course.degree}</td>
                        <td>{course.duration}</td>
                        <td className="text-end">
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() =>
                              handleDeleteCourse(course.id, course.courseName)
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

export default ManageCourse;
