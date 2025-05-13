import { Line } from 'react-chartjs-2';
import './styles/Mood.css';
import Navbar from './Navbar.jsx';
import './styles/Navbar.css'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement, // Needed for the pie chart
} from 'chart.js';
import { Pie } from 'react-chartjs-2'; // Import Pie chart from react-chartjs-2
import MoodRelaxingActivities from './MoodRelaxingActivities.jsx';

// Register required components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement // Register ArcElement for Pie Chart
);

export default function Mood() {
  // Sample data for the mood line chart
  const lineData = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
      {
        label: 'Mood Levels',
        data: [3, 4, 2, 5, 4, 6, 7],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  // Line chart options
  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Mood Chart (Weekly)',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Mood Level',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Days of the Week',
        },
      },
    },
  };

  // Sample data for the mood pie chart
  const pieData = {
    labels: ['Happy', 'Sad', 'Neutral'],
    datasets: [
      {
        label: 'Mood Distribution',
        data: [60, 20, 20], // Percentages for each mood
        backgroundColor: ['#4caf50', '#f44336', '#ffeb3b'], // Colors for the slices
        borderColor: ['#388e3c', '#d32f2f', '#fbc02d'],
        borderWidth: 1,
      },
    ],
  };

  // Pie chart options
  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Mood Distribution',
      },
    },
  };

  return (
    <>
    <div className = "mood-wrapper">
      <Navbar/>
    <div className="mood-container">
      <div className="charts-row">
        <div className="chart">
          <Line data={lineData} options={lineOptions} />
        </div>
        <div className="pie-chart">
          <Pie data={pieData} options={pieOptions} />
        </div>
      </div>
    </div>
    <br/>
    <div className = "act">
      <MoodRelaxingActivities />
      </div>
      </div>

    </>
  );
}




