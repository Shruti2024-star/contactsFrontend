import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppNavbar from "./components/Navbar";
import { Container, Button } from "react-bootstrap";
import Login from "./pages/LoginPage";
import Signup from "./pages/SignupPage";
import DashBoard from "./pages/DashBoard";
import AdminDashboard from "./pages/AdminDashboard"; 
import ProtectedRoute from "./components/ProtectedRoute";

import GroupList from "./pages/GroupList";
import CreateGroup from "./pages/CreateGroup";
import EditGroup from "./pages/EditGroup";
import GroupContacts from "./pages/GroupContacts";

import ContactList from "./pages/ContactList";
import ViewContact from "./pages/ViewContact";
import CreateContact from "./pages/CreateContact"; 
import EditContact from "./pages/EditContact";
function Home() {
  return (
    <Container className="text-center mt-5">
      <h1 className="display-4 fw-bold">Welcome to Contact Manager</h1>
      <p className="lead mt-3 text-muted">
        Your secure, centralized hub for managing personal and business relationships.
      </p>
      
      <div className="mt-4">
        {/* The Link tag handles the React Router navigation perfectly */}
        <Link to="/dashboard">
          <Button variant="primary" size="lg" className="shadow-sm">
            Go to Dashboard &rarr;
          </Button>
        </Link>
      </div>
    </Container>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppNavbar />

      <Routes>
       
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

      
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute allowedRoles={["USER", "ADMIN"]}>
              <DashBoard />
            </ProtectedRoute>
          } 
        />

        
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />  

      
        <Route
          path="/contacts"
          element={
            <ProtectedRoute allowedRoles={["USER", "ADMIN"]}>
              <ContactList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-contact"
          element={
            <ProtectedRoute allowedRoles={["USER", "ADMIN"]}>
              <CreateContact />
            </ProtectedRoute>
          }
        />
        <Route
          path="/view-contact"
          element={
            <ProtectedRoute allowedRoles={["USER", "ADMIN"]}>
              <ViewContact />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-contact"
          element={
            <ProtectedRoute allowedRoles={["USER", "ADMIN"]}>
              <EditContact />
            </ProtectedRoute>
          }
        />

        
        <Route
          path="/groups"
          element={
            <ProtectedRoute allowedRoles={["USER", "ADMIN"]}>
              <GroupList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-group"
          element={
            <ProtectedRoute allowedRoles={["USER", "ADMIN"]}>
              <CreateGroup />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-group/:id"
          element={
            <ProtectedRoute allowedRoles={["USER", "ADMIN"]}>
              <EditGroup />
            </ProtectedRoute>
          }
        />
        <Route
          path="/groups/:id/contacts"
          element={
            <ProtectedRoute allowedRoles={["USER", "ADMIN"]}>
              <GroupContacts />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}