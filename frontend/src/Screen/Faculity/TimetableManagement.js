import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import {
  FaCalendarAlt,
  FaClock,
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaUniversity,
  FaChalkboardTeacher,
  FaUsers,
  FaBook,
  FaLayerGroup,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TimetableManagement = () => {
  const axiosPrivate = useAxiosPrivate();
  const [timetables, setTimetables] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState({
    course: "",
    semester: "",
    day: "",
  });
  const [formData, setFormData] = useState({
    courseId: "",
    semester: "",
    day: "",
    period: "",
    subjectId: "",
    teacherId: "",
    room: "",
  });
  const [courses, setCourses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesRes, teachersRes, timetablesRes] = await Promise.all([
          axiosPrivate.get("/courses/getAllCourse"),
          axiosPrivate.get("/teachers/getAllTeachers"),
          axiosPrivate.get("/timetable/getAll"),
        ]);

        setCourses(coursesRes.data);
        setTeachers(teachersRes.data);
        setTimetables(timetablesRes.data);
      } catch (error) {
        toast.error("Failed to load initial data");
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fetch subjects when course changes
  useEffect(() => {
    if (formData.courseId) {
      const fetchSubjects = async () => {
        try {
          const response = await axiosPrivate.get(
            `/courses/getSemester?course=${formData.courseId}&semester=${formData.semester}`
          );
          setSubjects(response.data.subData || []);
        } catch (error) {
          toast.error("Failed to load subjects");
          console.error("Error:", error);
        }
      };

      fetchSubjects();
    }
  }, [formData.courseId, formData.semester]);

  const handleFilterChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosPrivate.post("/timetable/create", formData);
      toast.success("Timetable entry added successfully");
      setTimetables([...timetables, response.data]);
      setIsFormOpen(false);
      resetForm();
    } catch (error) {
      toast.error("Failed to add timetable entry");
      console.error("Error:", error);
    }
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm("Are you sure you want to delete this timetable entry?")
    )
      return;

    try {
      await axiosPrivate.delete(`/timetable/delete`, { params: { id } });
      toast.success("Timetable entry deleted successfully");
      setTimetables(timetables.filter((item) => item._id !== id));
    } catch (error) {
      toast.error("Failed to delete timetable entry");
      console.error("Error:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      courseId: "",
      semester: "",
      day: "",
      period: "",
      subjectId: "",
      teacherId: "",
      room: "",
    });
  };

  const filteredTimetables = timetables.filter((item) => {
    return (
      (filter.course === "" || item.course._id === filter.course) &&
      (filter.semester === "" ||
        item.semester.toString() === filter.semester) &&
      (filter.day === "" ||
        item.day.toLowerCase().includes(filter.day.toLowerCase()))
    );
  });

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const periods = Array.from({ length: 8 }, (_, i) => i + 1); // 1-8 periods

  return (
    <div className="container-fluid py-4">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="mb-0">
              <FaCalendarAlt className="me-2" />
              Timetable Management
            </h2>
            <button
              className="btn btn-light"
              onClick={() => setIsFormOpen(!isFormOpen)}
            >
              <FaPlus className="me-2" />
              {isFormOpen ? "Cancel" : "Add New Entry"}
            </button>
          </div>
        </div>

        <div className="card-body">
          {/* Add/Edit Form */}
          {isFormOpen && (
            <div className="card mb-4 border-primary">
              <div className="card-header bg-light">
                <h5 className="mb-0">Add Timetable Entry</h5>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-4">
                      <label className="form-label fw-bold">Course</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <FaUniversity />
                        </span>
                        <select
                          className="form-select"
                          name="courseId"
                          value={formData.courseId}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Select Course</option>
                          {courses.map((course) => (
                            <option key={course._id} value={course._id}>
                              {course.degree} - {course.courseName}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="col-md-2">
                      <label className="form-label fw-bold">Semester</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <FaLayerGroup />
                        </span>
                        <select
                          className="form-select"
                          name="semester"
                          value={formData.semester}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Select</option>
                          {formData.courseId &&
                            courses.find((c) => c._id === formData.courseId)
                              ?.duration &&
                            Array.from(
                              {
                                length:
                                  courses.find(
                                    (c) => c._id === formData.courseId
                                  ).duration * 2,
                              },
                              (_, i) => (
                                <option key={i + 1} value={i + 1}>
                                  {i + 1}
                                </option>
                              )
                            )}
                        </select>
                      </div>
                    </div>

                    <div className="col-md-2">
                      <label className="form-label fw-bold">Day</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <FaCalendarAlt />
                        </span>
                        <select
                          className="form-select"
                          name="day"
                          value={formData.day}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Select Day</option>
                          {daysOfWeek.map((day) => (
                            <option key={day} value={day}>
                              {day}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="col-md-2">
                      <label className="form-label fw-bold">Period</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <FaClock />
                        </span>
                        <select
                          className="form-select"
                          name="period"
                          value={formData.period}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Select</option>
                          {periods.map((p) => (
                            <option key={p} value={p}>
                              {p}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="col-md-4">
                      <label className="form-label fw-bold">Subject</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <FaBook />
                        </span>
                        <select
                          className="form-select"
                          name="subjectId"
                          value={formData.subjectId}
                          onChange={handleInputChange}
                          required
                          disabled={!formData.semester}
                        >
                          <option value="">Select Subject</option>
                          {subjects.map((subject) => (
                            <option key={subject._id} value={subject._id}>
                              {subject.subjectCode} - {subject.subjectName}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="col-md-4">
                      <label className="form-label fw-bold">Teacher</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <FaChalkboardTeacher />
                        </span>
                        <select
                          className="form-select"
                          name="teacherId"
                          value={formData.teacherId}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Select Teacher</option>
                          {teachers.map((teacher) => (
                            <option key={teacher._id} value={teacher._id}>
                              {teacher.name} ({teacher.employeeId})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="col-md-2">
                      <label className="form-label fw-bold">Room</label>
                      <input
                        type="text"
                        className="form-control"
                        name="room"
                        value={formData.room}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="col-12 mt-3">
                      <button type="submit" className="btn btn-primary me-2">
                        <FaPlus className="me-2" />
                        Add Entry
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => {
                          setIsFormOpen(false);
                          resetForm();
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Filter Section */}
          <div className="card mb-4">
            <div className="card-header bg-light">
              <h5 className="mb-0">
                <FaSearch className="me-2" />
                Filter Timetable
              </h5>
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-4">
                  <label className="form-label">Course</label>
                  <select
                    className="form-select"
                    name="course"
                    value={filter.course}
                    onChange={handleFilterChange}
                  >
                    <option value="">All Courses</option>
                    {courses.map((course) => (
                      <option key={course._id} value={course._id}>
                        {course.degree} - {course.courseName}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-3">
                  <label className="form-label">Semester</label>
                  <select
                    className="form-select"
                    name="semester"
                    value={filter.semester}
                    onChange={handleFilterChange}
                  >
                    <option value="">All Semesters</option>
                    {filter.course &&
                      courses.find((c) => c._id === filter.course)?.duration &&
                      Array.from(
                        {
                          length:
                            courses.find((c) => c._id === filter.course)
                              .duration * 2,
                        },
                        (_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1}
                          </option>
                        )
                      )}
                  </select>
                </div>

                <div className="col-md-3">
                  <label className="form-label">Day</label>
                  <select
                    className="form-select"
                    name="day"
                    value={filter.day}
                    onChange={handleFilterChange}
                  >
                    <option value="">All Days</option>
                    {daysOfWeek.map((day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-2 d-flex align-items-end">
                  <button
                    className="btn btn-outline-secondary w-100"
                    onClick={() =>
                      setFilter({ course: "", semester: "", day: "" })
                    }
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Timetable Display */}
          {isLoading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : filteredTimetables.length === 0 ? (
            <div className="alert alert-info">
              {Object.values(filter).some((v) => v !== "")
                ? "No timetable entries match your filters"
                : "No timetable entries found. Please add some entries."}
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead className="table-light">
                  <tr>
                    <th>Course</th>
                    <th>Semester</th>
                    <th>Day</th>
                    <th>Period</th>
                    <th>Subject</th>
                    <th>Teacher</th>
                    <th>Room</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTimetables.map((entry) => (
                    <tr key={entry._id}>
                      <td>
                        <strong>{entry.course.degree}</strong> -{" "}
                        {entry.course.courseName}
                      </td>
                      <td>{entry.semester}</td>
                      <td>{entry.day}</td>
                      <td>{entry.period}</td>
                      <td>
                        {entry.subject?.subjectCode && (
                          <>{entry.subject.subjectCode} - </>
                        )}
                        {entry.subject?.subjectName || "N/A"}
                      </td>
                      <td>
                        {entry.teacher?.name || "N/A"}
                        {entry.teacher?.employeeId && (
                          <span className="text-muted ms-2">
                            ({entry.teacher.employeeId})
                          </span>
                        )}
                      </td>
                      <td>{entry.room}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(entry._id)}
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
  );
};

export default TimetableManagement;
