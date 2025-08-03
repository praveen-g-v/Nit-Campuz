import React, { useState, useEffect } from "react";
import {
  Card,
  Table,
  Button,
  Spinner,
  Alert,
  Form,
  Badge,
} from "react-bootstrap";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import "bootstrap/dist/css/bootstrap.min.css";

const RemoveUser = ({ userLog, userBasicData }) => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const axiosPrivate = useAxiosPrivate();

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosPrivate.get("/manageusers/getAllUser");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users", error);
      setError("Failed to fetch users. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleStatusChange = async (id, userId, status) => {
    try {
      setLoading(true);
      await axiosPrivate.patch(`/manageusers/updateStatus`, {
        data: {
          id: id,
          uid: userId,
          status: status,
        },
        params: {
          token: userLog.token,
        },
      });
      await fetchUsers();
      setSuccessMessage(
        `User ${status === "Active" ? "activated" : "deactivated"} successfully`
      );
    } catch (error) {
      console.error("Error updating user status", error);
      setError("Failed to update user status. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId, id, userName) => {
    if (
      !window.confirm(
        `Are you sure you want to permanently delete "${userName}"?`
      )
    ) {
      return;
    }

    try {
      setLoading(true);
      const body = {
        id: userId,
        uid: userId,
        params: {
          token: userLog.token,
        },
      };
      const response = await axiosPrivate.patch(
        `/manageusers/removeuser`,
        body
      );
      setSuccessMessage(response.data.message || "User deleted successfully");
      await fetchUsers();
    } catch (error) {
      console.error("Error deleting user", error);
      setError(
        error.response?.data?.message ||
          "Failed to delete user. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.regNo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card className="shadow-sm">
      <Card.Header className="bg-primary text-white">
        <div className="d-flex justify-content-between align-items-center">
          <h4 className="mb-0">User Management</h4>
          <Form.Control
            type="search"
            placeholder="Search users..."
            className="w-25"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </Card.Header>

      <Card.Body>
        {error && (
          <Alert variant="danger" onClose={() => setError(null)} dismissible>
            {error}
          </Alert>
        )}
        {successMessage && (
          <Alert
            variant="success"
            onClose={() => setSuccessMessage(null)}
            dismissible
          >
            {successMessage}
          </Alert>
        )}

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <p className="mt-2">Loading users...</p>
          </div>
        ) : (
          <div className="table-responsive">
            <Table striped bordered hover className="mb-0">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td>{user.uid}</td>
                      <td>{user.name}</td>
                      <td>
                        <Badge
                          bg={
                            user.status === "Active" ? "success" : "secondary"
                          }
                        >
                          {user.status}
                        </Badge>
                      </td>
                      <td>
                        <div className="d-flex gap-2">
                          <Button
                            variant={
                              user.status === "Active"
                                ? "outline-danger"
                                : "outline-success"
                            }
                            size="sm"
                            onClick={() =>
                              handleStatusChange(
                                user.id,
                                user.uid,
                                user.status === "Active" ? "InActive" : "Active"
                              )
                            }
                            disabled={loading}
                          >
                            {user.status === "Active"
                              ? "Deactivate"
                              : "Activate"}
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() =>
                              handleDeleteUser(user.id, user.uid, user.name)
                            }
                            disabled={loading}
                          >
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-4">
                      {searchQuery
                        ? "No matching users found"
                        : "No users available"}
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        )}
      </Card.Body>

      <Card.Footer className="text-muted">
        Showing {filteredUsers.length} of {users.length} users
      </Card.Footer>
    </Card>
  );
};

export default RemoveUser;
