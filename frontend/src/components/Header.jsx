import { useNavigate } from "react-router-dom";

function Header({ showLogout = false }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-dark bg-dark px-4 shadow">
      <h4 className="text-white mb-0">Garage System</h4>

      {showLogout && (
        <button className="btn btn-danger" onClick={logout}>
          Logout
        </button>
      )}
    </nav>
  );
}

export default Header;
