import React, { useState } from "react";
import {
  Form,
  Button,
  Toast,
  Card,
  Row,
  Col,
  FloatingLabel,
} from "react-bootstrap";
import {
  FaUserPlus,
  FaIdCard,
  FaImage,
  FaVenusMars,
  FaCalendarAlt,
  FaUserTag,
  FaKey,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { encryptData } from "../Encryption/Cryptography";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { axiosPrivate } from "../../api/axios";

function AddUsers() {
  const [formData, setFormData] = useState({
    cardid: "",
    profilePhoto: "",
    role: "",
    uid: "",
    firstName: "",
    lastName: "",
    gender: "",
    dob: "",
    email: "",
    mobileNo: "",
    address: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [submissionMessage, setSubmissionMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      cardid: "",
      profilePhoto: "",
      role: "",
      uid: "",
      firstName: "",
      lastName: "",
      gender: "",
      dob: "",
      email: "",
      mobileNo: "",
      address: "",
      password: "",
    });
    setErrors({});
  };

  const showToast = (message, variant) => {
    setSubmissionMessage(message);
    setSubmissionStatus(variant);
    setTimeout(() => {
      setSubmissionMessage("");
      setSubmissionStatus(null);
    }, 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validation (same as original)
    if (!formData.cardid) newErrors.cardid = "Please enter Card ID.";
    if (!formData.profilePhoto)
      newErrors.profilePhoto = "Please enter Profile Photo URL.";
    if (!formData.role) newErrors.role = "Please select Role.";
    if (!formData.uid) newErrors.uid = "Please enter User ID.";
    if (!formData.firstName) newErrors.firstName = "Please enter First Name.";
    if (!formData.lastName) newErrors.lastName = "Please enter Last Name.";
    if (!formData.gender) newErrors.gender = "Please select Gender.";
    if (!formData.dob) newErrors.dob = "Please enter Date of Birth.";
    if (!formData.email) newErrors.email = "Please enter Email.";
    if (!formData.mobileNo) newErrors.mobileNo = "Please enter Mobile Number.";
    if (!formData.address) newErrors.address = "Please enter Address.";
    if (!formData.password) newErrors.password = "Please enter Password.";

    if (Object.values(newErrors).some((error) => error !== "")) {
      setErrors(newErrors);
      return;
    }

    try {
      const body = { ...formData };

      const response = await axiosPrivate.post("/logon/", body);
      if (response.status === 200) {
        showToast("User created successfully!", "success");
        resetForm();
      } else {
        showToast("Error while submitting the data", "danger");
      }
    } catch (error) {
      showToast(error.message, "danger");
    }
  };

  return (
    <div className="container py-4">
      <Card className="shadow-lg">
        <Card.Header className="bg-primary text-white">
          <h3 className="mb-0 d-flex align-items-center">
            <FaUserPlus className="me-2" /> User Account Creation
          </h3>
        </Card.Header>

        <Card.Body>
          <Toast
            className={`bg-${submissionStatus} text-white`}
            show={!!submissionStatus}
            onClose={() => setSubmissionStatus(null)}
            style={{
              position: "fixed",
              top: "20px",
              right: "20px",
              zIndex: 9999,
            }}
            delay={5000}
            autohide
          >
            <Toast.Body>
              <strong>{submissionStatus === "success" ? "✓ " : "⚠ "}</strong>
              {submissionMessage}
            </Toast.Body>
          </Toast>

          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col md={6}>
                <FloatingLabel
                  controlId="formFirstName"
                  label="First Name"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    isInvalid={!!errors.firstName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.firstName}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>

              <Col md={6}>
                <FloatingLabel
                  controlId="formLastName"
                  label="Last Name"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    isInvalid={!!errors.lastName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.lastName}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <FloatingLabel
                  controlId="formGender"
                  label={
                    <>
                      <FaVenusMars className="me-2" /> Gender
                    </>
                  }
                >
                  <Form.Select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    isInvalid={!!errors.gender}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.gender}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>

              <Col md={6}>
                <FloatingLabel
                  controlId="formDob"
                  label={
                    <>
                      <FaCalendarAlt className="me-2" /> Date of Birth
                    </>
                  }
                >
                  <Form.Control
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    isInvalid={!!errors.dob}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.dob}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <FloatingLabel
                  controlId="formRole"
                  label={
                    <>
                      <FaUserTag className="me-2" /> Role
                    </>
                  }
                >
                  <Form.Select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    isInvalid={!!errors.role}
                  >
                    <option value="">Select Role</option>
                    <option value="student">Student</option>
                    <option value="faculty">Faculty</option>
                    <option value="admin">Admin</option>
                    <option value="administration">Administration</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.role}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>

              <Col md={6}>
                <FloatingLabel
                  controlId="formUid"
                  label="User ID"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="User ID"
                    name="uid"
                    value={formData.uid}
                    onChange={handleChange}
                    isInvalid={!!errors.uid}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.uid}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <FloatingLabel
                  controlId="formPassword"
                  label={
                    <>
                      <FaKey className="me-2" /> Password
                    </>
                  }
                >
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    isInvalid={!!errors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>

              <Col md={6}>
                <FloatingLabel
                  controlId="formEmail"
                  label={
                    <>
                      <FaEnvelope className="me-2" /> Email
                    </>
                  }
                >
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <FloatingLabel
                  controlId="formMobileNo"
                  label={
                    <>
                      <FaPhone className="me-2" /> Mobile Number
                    </>
                  }
                >
                  <Form.Control
                    type="tel"
                    placeholder="Mobile Number"
                    name="mobileNo"
                    value={formData.mobileNo}
                    onChange={handleChange}
                    isInvalid={!!errors.mobileNo}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.mobileNo}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>

              <Col md={6}>
                <FloatingLabel
                  controlId="formCardId"
                  label={
                    <>
                      <FaIdCard className="me-2" /> Card ID
                    </>
                  }
                >
                  <Form.Control
                    type="text"
                    placeholder="Card ID"
                    name="cardid"
                    value={formData.cardid}
                    onChange={handleChange}
                    isInvalid={!!errors.cardid}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.cardid}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
            </Row>

            <FloatingLabel
              controlId="formAddress"
              label={
                <>
                  <FaMapMarkerAlt className="me-2" /> Address
                </>
              }
              className="mb-3"
            >
              <Form.Control
                as="textarea"
                style={{ height: "100px" }}
                placeholder="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                isInvalid={!!errors.address}
              />
              <Form.Control.Feedback type="invalid">
                {errors.address}
              </Form.Control.Feedback>
            </FloatingLabel>

            <FloatingLabel
              controlId="formProfilePhoto"
              label={
                <>
                  <FaImage className="me-2" /> Profile Photo URL
                </>
              }
              className="mb-4"
            >
              <Form.Control
                type="text"
                placeholder="Profile Photo URL"
                name="profilePhoto"
                value={formData.profilePhoto}
                onChange={handleChange}
                isInvalid={!!errors.profilePhoto}
              />
              <Form.Control.Feedback type="invalid">
                {errors.profilePhoto}
              </Form.Control.Feedback>
            </FloatingLabel>

            <div className="d-grid">
              <Button variant="primary" size="lg" type="submit">
                <FaUserPlus className="me-2" /> Create User
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default AddUsers;
