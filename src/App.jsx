import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppNavbar from "./components/Navbar";

import Login from "./pages/LoginPage";
import Signup from "./pages/SignupPage";
import DashBoard from "./pages/DashBoard";
import ProtectedRoute from "./components/ProtectedRoute";
import GroupList from "./pages/GroupList";
import CreateGroup from "./pages/CreateGroup";
import EditGroup from "./pages/EditGroup";
import GroupContacts from "./pages/GroupContacts";
import AdminDashboard from "./pages/AdminDashboard"; 
import ProtectedRoute from "./components/ProtectedRoute";

function Home() {
  return <h1>Home</h1>;
}

export default function App() {
  return (
    <BrowserRouter>
      <AppNavbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<DashBoard />} />

        <Route 
          path="/admin" 
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />  

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

                {/* Group Routes */}
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