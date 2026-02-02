import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Footer from "../components/Footer";

function ServiceStatus() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")); // 🔥 Get current user

  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    service_id: "",
    vehicle_id: "",
    service_date: ""
  });

  useEffect(() => {
    api.get("bookings/").then(res => {
      // 🔥 Filter bookings to show only current user's bookings
      const userBookings = res.data.filter(b => b.customer?.id === user.customer_id);
      setBookings(userBookings);
    });

    api.get("services/").then(res => setServices(res.data));
    api.get("vehicles/").then(res => setVehicles(res.data));
  }, [user.customer_id]);

  const startEdit = (booking) => {
    setEditingId(booking.id);
    setFormData({
      service_id: booking.service?.id || "",
      vehicle_id: booking.vehicle?.id || "",
      service_date: booking.service_date
    });
  };

  const updateBooking = async (id) => {
    try {
      await api.patch(`bookings/${id}/`, formData);
      alert("✅ Booking updated");
      setEditingId(null);

      // reload user bookings
      api.get("bookings/").then(res => {
        const userBookings = res.data.filter(b => b.customer?.id === user.customer_id);
        setBookings(userBookings);
      });
    } catch (err) {
      alert("❌ Update failed");
      console.error(err);
    }
  };

  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      {/* ================= HEADER ================= */}
      <nav className="navbar navbar-dark bg-dark px-4">
        <h4 className="text-white">Garage System</h4>
        <button className="btn btn-secondary" onClick={() => navigate("/dashboard")}>
          🏠 Home
        </button>
      </nav>

      <div className="container mt-4 flex-grow-1">
        <h3>My Service History</h3>

        <table className="table table-bordered mt-3">
          <thead className="table-dark">
            <tr>
              <th>Vehicle</th>
              <th>Service</th>
              <th>Status</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map(b => (
              <tr key={b.id}>
                <td>
                  {editingId === b.id ? (
                    <select
                      className="form-control"
                      value={formData.vehicle_id}
                      onChange={e =>
                        setFormData({ ...formData, vehicle_id: e.target.value })
                      }
                    >
                      <option value="">Select Vehicle</option>
                      {vehicles.map(v => (
                        <option key={v.id} value={v.id}>
                          {v.vehicle_type}
                        </option>
                      ))}
                    </select>
                  ) : (
                    b.vehicle?.vehicle_type
                  )}
                </td>

                <td>
                  {editingId === b.id ? (
                    <select
                      className="form-control"
                      value={formData.service_id}
                      onChange={e =>
                        setFormData({ ...formData, service_id: e.target.value })
                      }
                    >
                      <option value="">Select Service</option>
                      {services.map(s => (
                        <option key={s.id} value={s.id}>
                          {s.service_name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    b.service?.service_name
                  )}
                </td>

                <td>{b.status}</td>

                <td>
                  {editingId === b.id ? (
                    <input
                      type="date"
                      className="form-control"
                      value={formData.service_date}
                      onChange={e =>
                        setFormData({ ...formData, service_date: e.target.value })
                      }
                    />
                  ) : (
                    b.service_date
                  )}
                </td>

                <td>
                  {b.status === "Pending" ? (
                    editingId === b.id ? (
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() => updateBooking(b.id)}
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => startEdit(b)}
                      >
                        Update
                      </button>
                    )
                  ) : (
                    <span className="text-muted">Locked</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= FOOTER ================= */}
      <Footer />
    </div>
  );
}

export default ServiceStatus;
