import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import Booking from "./pages/Booking";
import ServiceStatus from "./pages/ServiceStatus";

function App() {
  return (
    <Router>
      <Routes>
        {/* Default */}
        <Route path="/" element={<Login />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* User pages */}
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/status" element={<ServiceStatus />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
