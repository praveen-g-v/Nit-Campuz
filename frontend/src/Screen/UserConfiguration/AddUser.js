import React, { useState } from "react";
import { Card, Form, Button, Alert, Row, Col } from "react-bootstrap";
import {
  FaUserPlus,
  FaIdCard,
  FaPhone,
  FaCalendarAlt,
  FaGraduationCap,
} from "react-icons/fa";
import { axiosPrivate } from "../../api/axios";

function AddUser() {
  const [formData, setFormData] = useState({
    userType: "",
    firstName: "",
    lastName: "",
    dOB: "",
    registrationNo: "",
    mobileNo: "",
    programme: "",
    department: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const userTypes = ["Student", "Teacher", "Management"];
  const programmes = ["Under Graduate", "Post Graduate"];
  const departments = [
    "Aeronautical Engineering",
    "Civil Engineering",
    "Computer Science and Engineering",
    "Agricultural Engineering",
    "Food Technology",
    "Master of Business Administration",
    "Science and Humanities",
    "Information Technology",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const createNewUser = async () => {
    try {
      // Validation
      if (!formData.userType) {
        throw new Error("Please select User Type");
      }
      if (!formData.programme) {
        throw new Error("Please select Programme");
      }
      if (!formData.department) {
        throw new Error("Please select Department");
      }
      if (formData.firstName.trim().length < 2) {
        throw new Error("First name must be at least 2 characters");
      }
      if (formData.lastName.trim().length < 2) {
        throw new Error("Last name must be at least 2 characters");
      }
      if (!formData.registrationNo || formData.registrationNo.length < 4) {
        throw new Error("Enter a valid Registration Number");
      }
      if (!formData.mobileNo || formData.mobileNo.length < 10) {
        throw new Error("Enter a valid Mobile number");
      }

      // API call
      const response = await axiosPrivate.post("/admin/createuser", formData);

      if (response.status === 200) {
        setSuccess("User created successfully!");
        setFormData({
          userType: "",
          firstName: "",
          lastName: "",
          dOB: "",
          registrationNo: "",
          mobileNo: "",
          programme: "",
          department: "",
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <Card className="shadow-lg p-4 mx-auto" style={{ maxWidth: "800px" }}>
      <Card.Header className="bg-primary text-white">
        <h3 className="mb-0 d-flex align-items-center">
          <FaUserPlus className="me-2" /> Create New User
        </h3>
      </Card.Header>

      <Card.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}

        <Form>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="userType">
                <Form.Label className="fw-bold">
                  <FaUserPlus className="me-2" /> User Type
                </Form.Label>
                <Form.Select
                  name="userType"
                  value={formData.userType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select User Type</option>
                  {userTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="programme">
                <Form.Label className="fw-bold">
                  <FaGraduationCap className="me-2" /> Programme
                </Form.Label>
                <Form.Select
                  name="programme"
                  value={formData.programme}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Programme</option>
                  {programmes.map((prog) => (
                    <option key={prog} value={prog}>
                      {prog}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="firstName">
                <Form.Label className="fw-bold">First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter first name"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="lastName">
                <Form.Label className="fw-bold">Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter last name"
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="dOB">
                <Form.Label className="fw-bold">
                  <FaCalendarAlt className="me-2" /> Date of Birth
                </Form.Label>
                <Form.Control
                  type="date"
                  name="dOB"
                  value={formData.dOB}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="department">
                <Form.Label className="fw-bold">Department</Form.Label>
                <Form.Select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Department</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="registrationNo">
                <Form.Label className="fw-bold">
                  <FaIdCard className="me-2" /> Registration Number
                </Form.Label>
                <Form.Control
                  type="number"
                  name="registrationNo"
                  value={formData.registrationNo}
                  onChange={handleChange}
                  placeholder="Enter registration number"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="mobileNo">
                <Form.Label className="fw-bold">
                  <FaPhone className="me-2" /> Mobile Number
                </Form.Label>
                <Form.Control
                  type="tel"
                  name="mobileNo"
                  value={formData.mobileNo}
                  onChange={handleChange}
                  placeholder="Enter mobile number"
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="d-grid mt-4">
            <Button variant="primary" size="lg" onClick={createNewUser}>
              <FaUserPlus className="me-2" /> Create User
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default AddUser;
