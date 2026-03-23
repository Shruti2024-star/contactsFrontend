import { useState, useEffect } from "react";
import { Container, Card, Table, Button, Row, Col, Toast } from "react-bootstrap";
import { getAllUsers, deleteUser, getAdminStats } from "../services/AdminService";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);
  const [toast, setToast] = useState({ show: false, msg: "", type: "success" });

  const showToast = (msg, type = "success") => setToast({ show: true, msg, type });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const usersData = await getAllUsers();
      const statsData = await getAdminStats();
      setUsers(usersData);
      setStats(statsData);
    } catch (error) {
      showToast("Error loading admin data", "danger");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    
    try {
      await deleteUser(id);
      showToast("User deleted successfully", "success");
      fetchDashboardData(); 
    } catch (error) {
      showToast("Failed to delete user", "danger");
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-center">Admin Control Panel</h2>

      
      {stats && (
        <Row className="mb-4">
          <Col md={4}>
            <Card className="text-center shadow-sm p-3 text-white" style={{ backgroundColor: '#4e73df' }}>
              <h5>Total Users</h5>
              <h3>{stats.totalUsers || 0}</h3>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="text-center shadow-sm p-3 text-white" style={{ backgroundColor: '#1cc88a' }}>
              <h5>Total Contacts</h5>
              <h3>{stats.totalContacts || 0}</h3>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="text-center shadow-sm p-3 text-white" style={{ backgroundColor: '#36b9cc' }}>
              <h5>Total Groups</h5>
              <h3>{stats.groupCount || 0}</h3>
            </Card>
          </Col>
        </Row>
      )}

      
      <Card className="shadow-sm p-4">
        <h4>Manage Users</h4>
        <Table striped bordered hover responsive className="mt-3">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.firstName}</td>
                <td>{user.email}</td>
                <td>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(user.id)}>
                    Delete User
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>

   
      <Toast
        show={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
        delay={3000}
        autohide
        bg={toast.type}
        style={{ position: "fixed", bottom: 20, right: 20, zIndex: 1000 }}
      >
        <Toast.Body className="text-white">{toast.msg}</Toast.Body>
      </Toast>
    </Container>
  );
}