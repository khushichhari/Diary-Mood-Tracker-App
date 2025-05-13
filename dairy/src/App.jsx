// Original
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginRegisterToggle from "./components/LoginRegisterToggle"; // Import the LoginRegisterToggle component
import Home from "./components/Home.jsx"; // Import the Home component
import Mood from "./components/Mood.jsx";
import MoodRelaxingActivities from "./components/MoodRelaxingActivities.jsx";
import Todo from './components/Todo.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginRegisterToggle />} />
        <Route path="/home" element={<Home />} />
        <Route path="/mood" element={<Mood />} />
        <Route path="/activities" element={<MoodRelaxingActivities />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </Router>
  );
}

export default App;
