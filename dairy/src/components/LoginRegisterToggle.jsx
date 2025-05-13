import { useState } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate for routing
import "./styles/LogReg.css";  // Import your CSS file for styling

export default function LoginRegisterToggle() {
  const [isLogin, setIsLogin] = useState(true); // Toggle state: true for Login, false for Register
  const navigate = useNavigate(); // Hook for navigation

  const handleLogin = (event) => {
    event.preventDefault(); // Prevent form from reloading the page
    navigate("/home"); // Redirect to Home.jsx
  };

  const handleRegister = (event) => {
    event.preventDefault(); // Prevent form from reloading the page
    navigate("/home"); // Redirect to Home.jsx
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-toggle">
          <button
            className={`toggle-btn ${isLogin ? "active" : ""}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`toggle-btn ${!isLogin ? "active" : ""}`}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>

        {/* Render Login or Register form based on state */}
        {isLogin ? (
          <div className="form-container">
            <h1 className="form-title">Login</h1>
            <form className="form">
              <label className="form-label">Email:</label>
              <input
                type="email"
                className="form-input"
                placeholder="Enter your email"
              />
              <label className="form-label">Password:</label>
              <input
                type="password"
                className="form-input"
                placeholder="Enter your password"
              />
              <button onClick={handleLogin} type="submit" className="form-button">
                Login
              </button>
            </form>
          </div>
        ) : (
          <div className="form-container">
            <h1 className="form-title">Register</h1>
            <form className="form">
              <label className="form-label">Username:</label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter your username"
                required
              />
              <label className="form-label">Password:</label>
              <input
                type="password"
                className="form-input"
                placeholder="Enter your password"
                required
              />
              <label className="form-label">Confirm Password:</label>
              <input
                type="password"
                className="form-input"
                placeholder="Confirm your password"
                required
              />
              <button onClick={handleRegister} type="submit" className="form-button">
                Register
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
