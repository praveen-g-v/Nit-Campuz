import React, { useState, useEffect } from "react";
import { Card, Row, Col, Alert, Spinner, Table } from "react-bootstrap";
import {
  FaUsers,
  FaBook,
  FaChalkboardTeacher,
  FaCalendarAlt,
  FaChartLine,
  FaUniversity,
  FaUserGraduate,
  FaPlus,
  FaTrash,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const AdminDashboard = ({ userLog }) => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeStudents: 0,
    facultyCount: 0,
    upcomingEvents: 0,
  });
  const [recentUsers, setRecentUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  //   const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // const [statsRes, usersRes] = await Promise.all([
        //   axiosPrivate.get("/admin/dashboard/stats"),
        //   axiosPrivate.get("/admin/users/recent"),
        // ]);

        // setStats(statsRes.data);
        // setRecentUsers(usersRes.data);
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
        <FaUniversity className="me-2" />
        Admin Dashboard
      </h2>

      {error && <Alert variant="danger">{error}</Alert>}

      {/* Stats Cards */}
      <Row className="mb-4">
        <Col md={3} sm={6} className="mb-3">
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-2">Total Users</h6>
                  <h3>{stats.totalUsers}</h3>
                </div>
                <div className="bg-primary bg-opacity-10 p-3 rounded">
                  <FaUsers size={24} className="text-primary" />
                </div>
              </div>
              <Link to="/admin/removeuser" className="stretched-link"></Link>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3} sm={6} className="mb-3">
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-2">Active Students</h6>
                  <h3>{stats.activeStudents}</h3>
                </div>
                <div className="bg-success bg-opacity-10 p-3 rounded">
                  <FaUserGraduate size={24} className="text-success" />
                </div>
              </div>
              <Link to="/admin/removeuser" className="stretched-link"></Link>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3} sm={6} className="mb-3">
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-2">Faculty Members</h6>
                  <h3>{stats.facultyCount}</h3>
                </div>
                <div className="bg-warning bg-opacity-10 p-3 rounded">
                  <FaChalkboardTeacher size={24} className="text-warning" />
                </div>
              </div>
              <Link to="/admin/assignuser" className="stretched-link"></Link>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3} sm={6} className="mb-3">
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-2">Upcoming Events</h6>
                  <h3>{stats.upcomingEvents}</h3>
                </div>
                <div className="bg-info bg-opacity-10 p-3 rounded">
                  <FaCalendarAlt size={24} className="text-info" />
                </div>
              </div>
              <Link
                to="/admin/academiccalendar"
                className="stretched-link"
              ></Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Quick Actions */}
      <Row className="mb-4">
        <Col md={6}>
          <Card className="h-100 shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h5 className="mb-0">Quick Actions</h5>
            </Card.Header>
            <Card.Body>
              <div className="d-grid gap-2">
                <Link
                  to="/admin/createuser"
                  className="btn btn-outline-primary text-start"
                >
                  <FaPlus className="me-2" /> Add New User
                </Link>
                <Link
                  to="/admin/removeuser"
                  className="btn btn-outline-danger text-start"
                >
                  <FaTrash className="me-2" /> Manage Users
                </Link>
                <Link
                  to="/admin/createtimetable"
                  className="btn btn-outline-secondary text-start"
                >
                  <FaCalendarAlt className="me-2" /> Create Timetable
                </Link>
                <Link
                  to="/admin/createInternalSchedule"
                  className="btn btn-outline-info text-start"
                >
                  <FaCalendarAlt className="me-2" /> Schedule Internal Exam
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="h-100 shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h5 className="mb-0">Recent Users</h5>
            </Card.Header>
            <Card.Body>
              {recentUsers.length > 0 ? (
                <Table striped hover responsive>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentUsers.map((user) => (
                      <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                          <span
                            className={`badge ${
                              user.role === "admin"
                                ? "bg-danger"
                                : user.role === "teacher"
                                ? "bg-warning text-dark"
                                : "bg-primary"
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <p className="text-muted">No recent users found</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* System Overview */}
      <Card className="shadow-sm mb-4">
        <Card.Header className="bg-primary text-white">
          <h5 className="mb-0">System Overview</h5>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={4} className="mb-3">
              <div className="d-flex align-items-center">
                <div className="bg-primary bg-opacity-10 p-3 rounded me-3">
                  <FaChartLine size={24} className="text-primary" />
                </div>
                <div>
                  <h6 className="mb-0">Courses</h6>
                  <Link to="/admin/managecourse">Manage Courses</Link>
                </div>
              </div>
            </Col>
            <Col md={4} className="mb-3">
              <div className="d-flex align-items-center">
                <div className="bg-success bg-opacity-10 p-3 rounded me-3">
                  <FaBook size={24} className="text-success" />
                </div>
                <div>
                  <h6 className="mb-0">Subjects</h6>
                  <Link to="/admin/addsubject">Manage Subjects</Link>
                </div>
              </div>
            </Col>
            <Col md={4} className="mb-3">
              <div className="d-flex align-items-center">
                <div className="bg-info bg-opacity-10 p-3 rounded me-3">
                  <FaCalendarAlt size={24} className="text-info" />
                </div>
                <div>
                  <h6 className="mb-0">Academic Calendar</h6>
                  <Link to="/admin/academiccalendar">View Calendar</Link>
                </div>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AdminDashboard;
