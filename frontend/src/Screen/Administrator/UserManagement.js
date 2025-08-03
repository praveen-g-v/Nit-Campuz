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
  FaUserPlus,
  FaTrash,
  FaUserSlash,
  FaSearch,
  FaEdit,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { axiosPrivate } from "../../api/axios";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const results = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(results);
  }, [searchTerm, users]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axiosPrivate.get("/manageusers/getAllUser");
      console.log(response.data);
      setUsers(response.data);
      setFilteredUsers(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch users");
      console.error(err);
      setLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    try {
      await axiosPrivate.delete(`/admin/users/${selectedUser.id}`);
      setSuccess("User deleted successfully");
      fetchUsers();
      setShowDeleteModal(false);
    } catch (err) {
      setError("Failed to delete user");
      console.error(err);
    }
  };

  const handleDeactivateUser = async () => {
    try {
      await axiosPrivate.patch(`/admin/users/${selectedUser.id}/deactivate`);
      setSuccess("User deactivated successfully");
      fetchUsers();
      setShowDeactivateModal(false);
    } catch (err) {
      setError("Failed to deactivate user");
      console.error(err);
    }
  };

  const handleActivateUser = async (userId) => {
    try {
      await axiosPrivate.patch(`/admin/users/${userId}/activate`);
      setSuccess("User activated successfully");
      fetchUsers();
    } catch (err) {
      setError("Failed to activate user");
      console.error(err);
    }
  };

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>User Management</h2>
        <div>
          <Link to="/admin/createuser" className="btn btn-primary me-2">
            <FaUserPlus className="me-2" /> Add New User
          </Link>
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
              placeholder="Search users by name, email or role"
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
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <Badge
                          bg={
                            user.role === "admin"
                              ? "danger"
                              : user.role === "teacher"
                              ? "warning text-dark"
                              : "primary"
                          }
                        >
                          {user.role}
                        </Badge>
                      </td>
                      <td>
                        <Badge bg={user.active ? "success" : "secondary"}>
                          {user.active ? "Active" : "Inactive"}
                        </Badge>
                      </td>
                      <td>
                        <div className="d-flex gap-2">
                          {user.active ? (
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => {
                                setSelectedUser(user);
                                setShowDeactivateModal(true);
                              }}
                            >
                              <FaUserSlash />
                            </Button>
                          ) : (
                            <Button
                              variant="outline-success"
                              size="sm"
                              onClick={() => handleActivateUser(user.id)}
                            >
                              Activate
                            </Button>
                          )}
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => {
                              setSelectedUser(user);
                              setShowDeleteModal(true);
                            }}
                          >
                            <FaTrash />
                          </Button>
                          <Link
                            to={`/admin/edituser/${user.id}`}
                            className="btn btn-outline-primary btn-sm"
                          >
                            <FaEdit />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4">
                      No users found
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
          Are you sure you want to delete user {selectedUser?.name}? This action
          cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteUser}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Deactivate Confirmation Modal */}
      <Modal
        show={showDeactivateModal}
        onHide={() => setShowDeactivateModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deactivation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to deactivate user {selectedUser?.name}? They
          will lose access to the system.
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowDeactivateModal(false)}
          >
            Cancel
          </Button>
          <Button variant="warning" onClick={handleDeactivateUser}>
            Deactivate
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserManagement;
