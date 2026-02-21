import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Footer from "../components/Footer";

function AdminDashboard() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);

  const load = () => {
    api.get("bookings/").then(res => setBookings(res.data));
  };

  useEffect(load, []);

  const updateStatus = (id, status) => {
    api.patch(`bookings/${id}/`, { status }).then(load);
  };

  const remove = (id) => {
    api.delete(`bookings/${id}/`).then(load);
  };

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
     {/* HEADER */}
      <nav className="navbar navbar-dark bg-dark px-4">
        <h4 className="text-white">Garage System</h4>
        <button className="btn btn-danger" onClick={logout}>
          Logout
        </button>
      </nav>

      
      <div className="container my-5" style={{ flex: 1 }}>
        <h4 className="fw-bold text-danger mb-4">
          🧑‍💼 Admin Dashboard
        </h4>

        <div className="card shadow-sm">
          <div className="card-body table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Customer</th>
                  <th>Vehicle</th>
                  <th>Service</th>
                  <th>Status</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {bookings.map(b => (
                  <tr key={b.id}>
                    <td>{b.customer?.full_name}</td>
                    <td>{b.vehicle?.vehicle_type}</td>
                    <td>{b.service?.service_name}</td>

                    <td>
                      <span
                        className={`badge ${
                          b.status === "Pending"
                            ? "bg-warning text-dark"
                            : b.status === "Approved"
                            ? "bg-success"
                            : "bg-danger"
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>

                    <td className="text-center">
                      <button
                        className="btn btn-success btn-sm me-1"
                        onClick={() => updateStatus(b.id, "Approved")}
                      >
                        Approve
                      </button>

                      <button
                        className="btn btn-warning btn-sm me-1"
                        onClick={() => updateStatus(b.id, "Rejected")}
                      >
                        Reject
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => remove(b.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>
      </div>

      
      <Footer />
    </div>
  );
}

export default AdminDashboard;
