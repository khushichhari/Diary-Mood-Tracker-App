// import { useState, useEffect } from "react";
// import Calendar from "react-calendar";
// import "./styles/Calendar.css"; // Import your custom styles

// const CalendarComponent = () => {
//   const [date, setDate] = useState(new Date());
//   const [selectedEmoji, setSelectedEmoji] = useState("");
//   const [diaryText, setDiaryText] = useState("");
//   const [entries, setEntries] = useState([]);

//   // Handle date change
//   const onChange = (newDate) => {
//     setDate(newDate);
//     fetchDiaryEntry(newDate); // Fetch entry for the selected date
//   };

//   // Handle emoji selection
//   const handleEmojiClick = (emoji) => {
//     setSelectedEmoji(emoji);
//   };

//   // Handle text input
//   const handleTextChange = (e) => {
//     setDiaryText(e.target.value);
//   };

//   // Save entry to the backend
//   const saveEntry = async () => {
//     if (!selectedEmoji || !diaryText.trim()) {
//       alert("Please select an emoji and write some text!");
//       return;
//     }

//     const entry = {
//       date: date.toISOString().split("T")[0], // Format date as YYYY-MM-DD
//       emoji: selectedEmoji,
//       text: diaryText,
//     };

//     try {
//       const response = await fetch("http://localhost:5000/diary", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(entry),
//       });

//       if (response.ok) {
//         alert("Diary entry saved!");
//         fetchAllEntries(); // Refresh the list of entries
//       } else {
//         alert("Failed to save the entry.");
//       }
//     } catch (error) {
//       console.error(error);
//       alert("Error while saving the entry.");
//     }
//   };

//   // Fetch diary entry for the selected date
//   const fetchDiaryEntry = async (selectedDate) => {
//     const formattedDate = selectedDate.toISOString().split("T")[0];
//     try {
//       const response = await fetch(`http://localhost:5000/diary/${formattedDate}`);
//       if (response.ok) {
//         const entriesForDate = await response.json();
//         if (entriesForDate.length > 0) {
//           setSelectedEmoji(entriesForDate[0].emoji);
//           setDiaryText(entriesForDate[0].text);
//         } else {
//           setSelectedEmoji("");
//           setDiaryText("");
//         }
//       } else {
//         console.error("Failed to fetch diary entries for the date.");
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   // Fetch all diary entries
//   const fetchAllEntries = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/diary");
//       if (response.ok) {
//         const data = await response.json();
//         setEntries(data);
//       } else {
//         console.error("Failed to fetch diary entries.");
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   // Fetch all entries on component mount
//   useEffect(() => {
//     fetchAllEntries();
//   }, []);

//   return (
//     <>
//       <div className="calendar-text-wrapper">
//         <div className="calendar-container">
//           <h2 className="calendar-heading">My Calendar</h2>
//           <Calendar onChange={onChange} value={date} className="custom-calendar" />
//           <p className="selected-date">Selected Date: {date.toDateString()}</p>
//         </div>

//         <div className="text-container">
//           <div className="diary-text">
//             <form>
//               <textarea
//                 name="diaryEntry"
//                 id="diaryEntry"
//                 placeholder="Write here"
//                 value={diaryText}
//                 onChange={handleTextChange}
//               ></textarea>
//             </form>
//             <button type="button" className="diary-btn" onClick={saveEntry}>
//               Save
//             </button>
//           </div>

//           <div className="emoji-container">
//             {["😊", "😢", "😠", "😔", "😲", "😂", "😭"].map((emoji) => (
//               <span
//                 key={emoji}
//                 role="img"
//                 aria-label={emoji}
//                 className={`emoji ${selectedEmoji === emoji ? "selected" : ""}`}
//                 onClick={() => handleEmojiClick(emoji)}
//               >
//                 {emoji}
//               </span>
//             ))}
//           </div>
//         </div>
//       </div>

//       {entries.length > 0 && (
//         <div className="entries-list">
//           <h3>Past Diary Entries</h3>
//           <ul>
//             {entries.map((entry) => (
//               <li key={entry._id}>
//                 {entry.date}: {entry.emoji} - {entry.text}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </>
//   );
// };

// export default CalendarComponent;



// new


import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "./styles/Calendar.css"; // Import your custom styles

const CalendarComponent = () => {
  const [date, setDate] = useState(new Date());
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const [diaryText, setDiaryText] = useState("");
  const [entries, setEntries] = useState([]);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Handle date change
  const onChange = (newDate) => {
    setDate(newDate);
    fetchDiaryEntry(newDate);
  };

  // Handle emoji selection
  const handleEmojiClick = (emoji) => {
    setSelectedEmoji(emoji);
  };

  // Handle text input
  const handleTextChange = (e) => {
    setDiaryText(e.target.value);
  };

  // Save entry to the backend
  const saveEntry = async () => {
    if (!selectedEmoji || !diaryText.trim()) {
      alert("Please select an emoji and write some text!");
      return;
    }

    const entry = {
      date: date.toISOString().split("T")[0],
      emoji: selectedEmoji,
      text: diaryText,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/diary`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entry),
      });

      if (response.ok) {
        alert("Diary entry saved!");
        fetchAllEntries();
      } else {
        alert("Failed to save the entry.");
      }
    } catch (error) {
      console.error(error);
      alert("Error while saving the entry.");
    }
  };

  // Fetch diary entry for the selected date
  const fetchDiaryEntry = async (selectedDate) => {
    const formattedDate = selectedDate.toISOString().split("T")[0];
    try {
      const response = await fetch(`${API_BASE_URL}/diary/${formattedDate}`);
      if (response.ok) {
        const entriesForDate = await response.json();
        if (entriesForDate.length > 0) {
          setSelectedEmoji(entriesForDate[0].emoji);
          setDiaryText(entriesForDate[0].text);
        } else {
          setSelectedEmoji("");
          setDiaryText("");
        }
      } else {
        console.error("Failed to fetch diary entries for the date.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch all diary entries
  const fetchAllEntries = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/diary`);
      if (response.ok) {
        const data = await response.json();
        setEntries(data);
      } else {
        console.error("Failed to fetch diary entries.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch all entries on component mount
  useEffect(() => {
    fetchAllEntries();
  }, []);

  return (
    <>
      <div className="calendar-text-wrapper">
        <div className="calendar-container">
          <h2 className="calendar-heading">My Calendar</h2>
          <Calendar onChange={onChange} value={date} className="custom-calendar" />
          <p className="selected-date">Selected Date: {date.toDateString()}</p>
        </div>

        <div className="text-container">
          <div className="diary-text">
            <form>
              <textarea
                name="diaryEntry"
                id="diaryEntry"
                placeholder="Write here"
                value={diaryText}
                onChange={handleTextChange}
              ></textarea>
            </form>
            <button type="button" className="diary-btn" onClick={saveEntry}>
              Save
            </button>
          </div>

          <div className="emoji-container">
            {["😊", "😢", "😠", "😔", "😲", "😂", "😭"].map((emoji) => (
              <span
                key={emoji}
                role="img"
                aria-label={emoji}
                className={`emoji ${selectedEmoji === emoji ? "selected" : ""}`}
                onClick={() => handleEmojiClick(emoji)}
              >
                {emoji}
              </span>
            ))}
          </div>
        </div>
      </div>

      {entries.length > 0 && (
        <div className="entries-list">
          <h3>Past Diary Entries</h3>
          <ul>
            {entries.map((entry) => (
              <li key={entry._id}>
                {entry.date}: {entry.emoji} - {entry.text}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default CalendarComponent;
