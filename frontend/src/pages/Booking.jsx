import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Footer from "../components/Footer";

function Booking() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [vehicles, setVehicles] = useState([]);
  const [services, setServices] = useState([]);

  const [formData, setFormData] = useState({
    customer_id: user.customer_id,
    vehicle_id: "",
    service_id: "",
    service_date: ""
  });

  useEffect(() => {
    api.get("vehicles/").then(res => setVehicles(res.data));
    api.get("services/").then(res => setServices(res.data));
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post("bookings/", formData);
      alert("✅ Booking successful");
      navigate("/dashboard");  // 🔥 Home redirect
    } catch (err) {
      alert("❌ Booking failed");
      console.error(err.response?.data || err);
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
        <h3>Book Service</h3>

        <form onSubmit={submit} className="card p-4 shadow mt-3">
          <select
            className="form-control mb-3"
            required
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

          <select
            className="form-control mb-3"
            required
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

          <input
            type="date"
            className="form-control mb-3"
            required
            onChange={e =>
              setFormData({ ...formData, service_date: e.target.value })
            }
          />

          <button className="btn btn-success w-100">
            Submit Booking
          </button>
        </form>
      </div>

      {/* ================= FOOTER ================= */}
      <Footer />
    </div>
  );
}

export default Booking;
