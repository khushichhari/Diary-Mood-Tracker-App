import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginRegisterToggle from "./components/LoginRegisterToggle";
import Home from "./components/Home.jsx";
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
