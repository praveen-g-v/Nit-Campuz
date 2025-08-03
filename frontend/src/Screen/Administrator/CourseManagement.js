import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Badge,
  InputGroup,
  Alert,
  Card,
  Spinner,
} from "react-bootstrap";
import { FaPlus, FaTrash, FaEdit, FaSearch, FaBook } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { axiosPrivate } from "../../api/axios";

const CourseManagement = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    const results = courses.filter(
      (course) =>
        course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.department.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCourses(results);
  }, [searchTerm, courses]);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await axiosPrivate.get("/admin/courses");
      setCourses(response.data);
      setFilteredCourses(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch courses");
      console.error(err);
      setLoading(false);
    }
  };

  const handleDeleteCourse = async () => {
    try {
      await axiosPrivate.delete(`/admin/courses/${selectedCourse.id}`);
      setSuccess("Course deleted successfully");
      fetchCourses();
      setShowDeleteModal(false);
    } catch (err) {
      setError("Failed to delete course");
      console.error(err);
    }
  };

  const navigateToAddCourse = () => {
    navigate("/admin/addcourse");
  };

  const navigateToEditCourse = (courseId) => {
    navigate(`/admin/removesubject/${courseId}`);
  };

  const navigateToManageSubjects = (courseId) => {
    navigate(`/admin/managecourse/${courseId}`);
  };

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>
          <FaBook className="me-2" />
          Course Management
        </h2>
        <div>
          <Button variant="primary" onClick={navigateToAddCourse}>
            <FaPlus className="me-2" /> Add New Course
          </Button>
        </div>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Card className="shadow-sm mb-4">
        <Card.Body>
          <InputGroup className="mb-3">
            <InputGroup.Text>
              <FaSearch />
            </InputGroup.Text>
            <Form.Control
              placeholder="Search courses by name, code or department"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>

          {loading ? (
            <div className="text-center py-4">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Course Code</th>
                  <th>Course Name</th>
                  <th>Department</th>
                  <th>Credits</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCourses.length > 0 ? (
                  filteredCourses.map((course) => (
                    <tr key={course.id}>
                      <td>{course.code}</td>
                      <td>{course.name}</td>
                      <td>{course.department}</td>
                      <td>{course.credits}</td>
                      <td>
                        <Badge bg={course.active ? "success" : "secondary"}>
                          {course.active ? "Active" : "Inactive"}
                        </Badge>
                      </td>
                      <td>
                        <div className="d-flex gap-2">
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => navigateToManageSubjects(course.id)}
                          >
                            Manage
                          </Button>
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => navigateToEditCourse(course.id)}
                          >
                            <FaEdit />
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => {
                              setSelectedCourse(course);
                              setShowDeleteModal(true);
                            }}
                          >
                            <FaTrash />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4">
                      No courses found
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete {selectedCourse?.name}? This action
          cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteCourse}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CourseManagement;
