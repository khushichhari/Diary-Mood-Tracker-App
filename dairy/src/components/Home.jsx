import { useNavigate } from 'react-router-dom'; // Importing useNavigate
import Calendar from './Calendar.jsx';
import './styles/Home.css';

export default function Home() {

  const navigate = useNavigate(); // Defining the navigate hook

  const handleLogout = () => {
    // Add any logout logic here, such as clearing session data
    localStorage.removeItem('user'); // Example of clearing user session
    navigate('/'); // Redirecting to the login/register page
  };

  return (
    <>
      <div className="home-container">
        <div className="home-header">
          <h1 className="home-logo">Diary</h1>
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

          <div className="home-btn">
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>

        <br />
        <div className="cal">
          <Calendar />
        </div>
      </div>
    </>
  );
}


