import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

function UserDashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column"
      }}
    >
      {/* ============ NAVBAR ============ */}
      <nav className="navbar navbar-dark bg-dark px-4">
        <h4 className="text-white mb-0">Garage System</h4>
        <button className="btn btn-danger" onClick={logout}>
          Logout
        </button>
      </nav>

      {/* ============ CONTENT ============ */}
      <div className="container mt-4" style={{ flex: 1 }}>
        <h3 className="mb-4 fw-bold">Welcome to Your Dashboard</h3>

        <div className="row">
          <div className="col-md-6 mb-4">
            <div className="card shadow text-center h-100">
              <div className="card-body">
                <h5 className="card-title">🚗 Book Vehicle Service</h5>
                <p className="card-text">
                  Request a service for your vehicle
                </p>
                <Link to="/booking" className="btn btn-primary">
                  Book Service
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div className="card shadow text-center h-100">
              <div className="card-body">
                <h5 className="card-title">📋 Service Status</h5>
                <p className="card-text">
                  View service progress & history
                </p>
                <Link to="/status" className="btn btn-success">
                  View Status
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============ FOOTER ============ */}
      <Footer />
    </div>
  );
}

export default UserDashboard;
