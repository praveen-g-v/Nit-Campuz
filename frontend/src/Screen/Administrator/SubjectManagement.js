import React, { useState, useEffect } from "react";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";
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
import {
  FaPlus,
  FaTrash,
  FaEdit,
  FaSearch,
  FaBookOpen,
  FaMinus,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { axiosPrivate } from "../../api/axios";

const SubjectManagement = () => {
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchSubjects();
  }, []);

  useEffect(() => {
    const results = subjects.filter(
      (subject) =>
        subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subject.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subject.course.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSubjects(results);
  }, [searchTerm, subjects]);

  const fetchSubjects = async () => {
    try {
      setLoading(true);
      const response = await axiosPrivate.get("/admin/subjects");
      setSubjects(response.data);
      setFilteredSubjects(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch subjects");
      console.error(err);
      setLoading(false);
    }
  };

  const handleDeleteSubject = async () => {
    try {
      await axiosPrivate.delete(`/admin/subjects/${selectedSubject.id}`);
      setSuccess("Subject deleted successfully");
      fetchSubjects();
      setShowDeleteModal(false);
    } catch (err) {
      setError("Failed to delete subject");
      console.error(err);
    }
  };

  const navigateToAddSubject = () => {
    navigate("/admin/addsubject");
  };
  const navigateToDeleteSubject = () => {
    navigate("/admin/removesubject");
  };

  const navigateToEditSubject = (subjectId) => {
    navigate(`/admin/removesubject/${subjectId}`);
  };

  const navigateToManageSubject = (subjectId) => {
    navigate(`/admin/managesubject/${subjectId}`);
  };

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>
          <FaBookOpen className="me-2" />
          Subject Management
        </h2>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <Button variant="primary" onClick={navigateToAddSubject}>
              <FaPlus className="me-2" /> Add New Subject
            </Button>
          </div>
          <div>
            <Button variant="danger" onClick={navigateToDeleteSubject}>
              <FaMinus className="me-2" /> Delete Subject
            </Button>
          </div>
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
              placeholder="Search subjects by name, code or course"
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
                  <th>Subject Code</th>
                  <th>Subject Name</th>
                  <th>Course</th>
                  <th>Semester</th>
                  <th>Credits</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSubjects.length > 0 ? (
                  filteredSubjects.map((subject) => (
                    <tr key={subject.id}>
                      <td>{subject.code}</td>
                      <td>{subject.name}</td>
                      <td>{subject.course}</td>
                      <td>{subject.semester}</td>
                      <td>{subject.credits}</td>
                      <td>
                        <Badge bg={subject.active ? "success" : "secondary"}>
                          {subject.active ? "Active" : "Inactive"}
                        </Badge>
                      </td>
                      {/* <td>
                        <div className="d-flex gap-2">
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => navigateToManageSubject(subject.id)}
                          >
                            Manage
                          </Button>
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => navigateToEditSubject(subject.id)}
                          >
                            <FaEdit />
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => {
                              setSelectedSubject(subject);
                              setShowDeleteModal(true);
                            }}
                          >
                            <FaTrash />
                          </Button>
                        </div>
                      </td> */}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      No subjects found
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
          Are you sure you want to delete {selectedSubject?.name}? This action
          cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteSubject}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SubjectManagement;
