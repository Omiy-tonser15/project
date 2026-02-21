import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    full_name: "",
    phone: "",
  });

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("register/", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        full_name: formData.full_name || formData.username,
        phone: formData.phone || "",
      });

      alert(res.data.message);

      // Save user info (optional)
      localStorage.setItem("user", JSON.stringify(res.data));

      
      navigate("/dashboard");

    } catch (err) {
      console.error(err.response ? err.response.data : err);
      alert(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <form onSubmit={handleRegister} className="card p-4 mt-5 shadow">
            <h3 className="text-center mb-3">Register</h3>

            <input
              type="text"
              className="form-control mb-3"
              placeholder="Username"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              required
            />

            <input
              type="email"
              className="form-control mb-3"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />

            <input
              type="password"
              className="form-control mb-3"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />

            <input
              type="text"
              className="form-control mb-3"
              placeholder="Full Name"
              value={formData.full_name}
              onChange={(e) =>
                setFormData({ ...formData, full_name: e.target.value })
              }
            />

            <input
              type="text"
              className="form-control mb-3"
              placeholder="Phone (optional)"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />

            <button className="btn btn-primary w-100">Register</button>

            <p className="text-center mt-3">
              Already have an account?{" "}
              <span
                style={{ color: "blue", cursor: "pointer" }}
                onClick={() => navigate("/login")}
              >
                Login
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
