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
  FaCalendarAlt,
  FaClipboardList,
  FaUniversity,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { axiosPrivate } from "../../api/axios";

const SemesterExamManagement = () => {
  const navigate = useNavigate();
  const [exams, setExams] = useState([]);
  const [filteredExams, setFilteredExams] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchExams();
  }, []);

  useEffect(() => {
    const results = exams.filter(
      (exam) =>
        exam.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exam.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exam.semester.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredExams(results);
  }, [searchTerm, exams]);

  const fetchExams = async () => {
    try {
      setLoading(true);
      const response = await axiosPrivate.get("/admin/semesterexams");
      setExams(response.data);
      setFilteredExams(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch semester exams");
      console.error(err);
      setLoading(false);
    }
  };

  const handleDeleteExam = async () => {
    try {
      await axiosPrivate.delete(`/admin/semesterexams/${selectedExam.id}`);
      setSuccess("Semester exam deleted successfully");
      fetchExams();
      setShowDeleteModal(false);
    } catch (err) {
      setError("Failed to delete semester exam");
      console.error(err);
    }
  };

  const navigateToCreateExam = () => {
    navigate("/admin/createSemesterSchedule");
  };

  const navigateToEditExam = (examId) => {
    navigate(`/admin/editSemesterSchedule/${examId}`);
  };

  const navigateToViewExam = (examId) => {
    navigate(`/admin/viewSemesterSchedule/${examId}`);
  };

  const navigateToEvaluation = (examId) => {
    navigate(`/admin/semesterExamEvaluate/${examId}`);
  };

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>
          <FaUniversity className="me-2" />
          Semester Exam Management
        </h2>
        <div>
          <Button variant="primary" onClick={navigateToCreateExam}>
            <FaPlus className="me-2" /> Create New Exam
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
              placeholder="Search exams by name, course or semester"
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
                  <th>Exam Name</th>
                  <th>Course</th>
                  <th>Semester</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredExams.length > 0 ? (
                  filteredExams.map((exam) => (
                    <tr key={exam.id}>
                      <td>{exam.name}</td>
                      <td>{exam.course}</td>
                      <td>{exam.semester}</td>
                      <td>{new Date(exam.startDate).toLocaleDateString()}</td>
                      <td>{new Date(exam.endDate).toLocaleDateString()}</td>
                      <td>
                        <Badge
                          bg={
                            new Date(exam.endDate) < new Date()
                              ? "secondary"
                              : new Date(exam.startDate) > new Date()
                              ? "warning text-dark"
                              : "success"
                          }
                        >
                          {new Date(exam.endDate) < new Date()
                            ? "Completed"
                            : new Date(exam.startDate) > new Date()
                            ? "Upcoming"
                            : "Ongoing"}
                        </Badge>
                      </td>
                      <td>
                        <div className="d-flex gap-2">
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => navigateToViewExam(exam.id)}
                          >
                            View
                          </Button>
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => navigateToEditExam(exam.id)}
                          >
                            <FaEdit />
                          </Button>
                          <Button
                            variant="outline-info"
                            size="sm"
                            onClick={() => navigateToEvaluation(exam.id)}
                          >
                            <FaClipboardList />
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => {
                              setSelectedExam(exam);
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
                    <td colSpan="7" className="text-center py-4">
                      No semester exams found
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
          Are you sure you want to delete the {selectedExam?.name} exam? This
          action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteExam}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SemesterExamManagement;
