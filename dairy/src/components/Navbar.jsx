import './styles/navbar.css';
import { useNavigate } from 'react-router-dom'; 
export default function Navbar() {
    const navigate = useNavigate(); // Initialize navigate for routing

    const handleLogout = () => {
      // Perform logout logic here, like clearing session or token
      navigate('/login'); // Redirect to login page after logout
    };
  return (
  
      <div className="navbar-container">
        <div className="navbar-header">
          <h1 className="navbar-logo">Diary</h1>
          <nav>
            <ul className="nav-links">
              <li>
                <a href="/home">Home</a>
              </li>
              <li>
                <a href="/mood">Mood</a>
              </li>
              <li>
                <a href="/todo">To-Do List</a>
              </li>
            </ul>
          </nav>

          <div className="navbar-btn">
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
        </div>
  )
}
