import React, { useState, useEffect } from "react";
import { Card, Row, Col, Alert, Spinner, Table, Badge } from "react-bootstrap";
import {
  FaChalkboardTeacher,
  FaCalendarAlt,
  FaBook,
  FaClipboardList,
  FaUserGraduate,
  FaChartLine,
  FaBell,
  FaTasks,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const FacultyDashboard = ({ userLog }) => {
  const [dashboardData, setDashboardData] = useState({
    upcomingClasses: 0,
    pendingEvaluations: 0,
    totalStudents: 0,
    recentAnnouncements: [],
  });
  const [timetable, setTimetable] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  //   const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // const [statsRes, timetableRes] = await Promise.all([
        //   axiosPrivate.get("/faculty/dashboard"),
        //   axiosPrivate.get("/faculty/timetable"),
        // ]);

        // setDashboardData(statsRes.data);
        // setTimetable(timetableRes.data);
      } catch (err) {
        setError("Failed to load dashboard data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "60vh" }}
      >
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">
      <h2 className="mb-4">
        <FaChalkboardTeacher className="me-2" />
        Faculty Dashboard
      </h2>

      {error && <Alert variant="danger">{error}</Alert>}

      {/* Stats Cards */}
      <Row className="mb-4">
        <Col md={4} sm={6} className="mb-3">
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-2">Upcoming Classes</h6>
                  <h3>{dashboardData.upcomingClasses}</h3>
                </div>
                <div className="bg-primary bg-opacity-10 p-3 rounded">
                  <FaCalendarAlt size={24} className="text-primary" />
                </div>
              </div>
              <Link to="/faculty/timetable" className="stretched-link"></Link>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} sm={6} className="mb-3">
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-2">Pending Evaluations</h6>
                  <h3>{dashboardData.pendingEvaluations}</h3>
                </div>
                <div className="bg-warning bg-opacity-10 p-3 rounded">
                  <FaClipboardList size={24} className="text-warning" />
                </div>
              </div>
              <Link to="/faculty/evaluations" className="stretched-link"></Link>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} sm={6} className="mb-3">
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-2">Total Students</h6>
                  <h3>{dashboardData.totalStudents}</h3>
                </div>
                <div className="bg-success bg-opacity-10 p-3 rounded">
                  <FaUserGraduate size={24} className="text-success" />
                </div>
              </div>
              <Link to="/faculty/students" className="stretched-link"></Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Today's Schedule and Announcements */}
      <Row className="mb-4">
        <Col md={6}>
          <Card className="h-100 shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h5 className="mb-0">Today's Schedule</h5>
            </Card.Header>
            <Card.Body>
              {timetable.length > 0 ? (
                <Table striped hover responsive>
                  <thead>
                    <tr>
                      <th>Time</th>
                      <th>Course</th>
                      <th>Room</th>
                    </tr>
                  </thead>
                  <tbody>
                    {timetable.map((item, index) => (
                      <tr key={index}>
                        <td>{item.time}</td>
                        <td>{item.course}</td>
                        <td>{item.room}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <p className="text-muted">No classes scheduled for today</p>
              )}
              <Link
                to="/faculty/timetable"
                className="btn btn-outline-primary mt-2"
              >
                View Full Timetable
              </Link>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="h-100 shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h5 className="mb-0">Recent Announcements</h5>
            </Card.Header>
            <Card.Body>
              {dashboardData.recentAnnouncements.length > 0 ? (
                <div className="announcement-list">
                  {dashboardData.recentAnnouncements.map(
                    (announcement, index) => (
                      <div key={index} className="mb-3 pb-2 border-bottom">
                        <div className="d-flex justify-content-between">
                          <h6 className="mb-1">
                            <FaBell className="me-2 text-warning" />
                            {announcement.title}
                          </h6>
                          <small className="text-muted">
                            {announcement.date}
                          </small>
                        </div>
                        <p className="mb-0 small">{announcement.message}</p>
                      </div>
                    )
                  )}
                </div>
              ) : (
                <p className="text-muted">No recent announcements</p>
              )}
              <Link
                to="/faculty/announcements"
                className="btn btn-outline-secondary mt-2"
              >
                View All Announcements
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Quick Actions */}
      <Card className="shadow-sm mb-4">
        <Card.Header className="bg-primary text-white">
          <h5 className="mb-0">Quick Actions</h5>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={3} className="mb-3">
              <Link
                to="/faculty/attendance"
                className="btn btn-outline-primary w-100"
              >
                <FaClipboardList className="me-2" />
                Take Attendance
              </Link>
            </Col>
            <Col md={3} className="mb-3">
              <Link
                to="/faculty/evaluations"
                className="btn btn-outline-success w-100"
              >
                <FaTasks className="me-2" />
                Submit Grades
              </Link>
            </Col>
            <Col md={3} className="mb-3">
              <Link
                to="/faculty/internalexam"
                className="btn btn-outline-info w-100"
              >
                <FaCalendarAlt className="me-2" />
                Schedule Exam
              </Link>
            </Col>
            <Col md={3} className="mb-3">
              <Link
                to="/faculty/materials"
                className="btn btn-outline-secondary w-100"
              >
                <FaBook className="me-2" />
                Upload Materials
              </Link>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Performance Overview */}
      <Card className="shadow-sm">
        <Card.Header className="bg-primary text-white">
          <h5 className="mb-0">Performance Overview</h5>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <h6>
                <FaChartLine className="me-2 text-primary" /> Course Completion
              </h6>
              <div className="progress mb-3">
                <div
                  className="progress-bar bg-success"
                  role="progressbar"
                  style={{ width: "75%" }}
                  aria-valuenow="75"
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  75%
                </div>
              </div>
            </Col>
            <Col md={6}>
              <h6>
                <FaChartLine className="me-2 text-primary" /> Student
                Performance
              </h6>
              <div>
                <Badge bg="success" className="me-2">
                  Excellent: 25%
                </Badge>
                <Badge bg="info" className="me-2">
                  Good: 45%
                </Badge>
                <Badge bg="warning" className="me-2">
                  Average: 20%
                </Badge>
                <Badge bg="danger">Needs Improvement: 10%</Badge>
              </div>
            </Col>
          </Row>
          <Link
            to="/faculty/analytics"
            className="btn btn-outline-primary mt-3"
          >
            View Detailed Analytics
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default FacultyDashboard;
