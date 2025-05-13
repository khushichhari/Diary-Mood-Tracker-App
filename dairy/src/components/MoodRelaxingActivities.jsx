import { useState } from "react";
import './styles/MoodRelaxingActivities.css';

const moodActivities = {
  happy: ["Watch a comedy show", "Go for a walk", "Listen to upbeat music"],
  sad: ["Take a relaxing bath", "Meditate", "Watch a feel-good movie"],
  angry: ["Do a workout", "Go for a run", "Write your thoughts down"],
  upset: ["Talk to a friend", "Practice deep breathing", "Listen to calming music"],
  surprised: ["Try something new", "Plan a fun activity", "Explore nature"],
  laughing: ["Share jokes with friends", "Watch a funny video", "Try a fun challenge"],
  cry: ["Write in your journal", "Talk to someone you trust", "Have a self-care day"],
};

export default function Activities() {
  const [selectedMood, setSelectedMood] = useState("");

  const handleEmojiClick = (mood) => {
    setSelectedMood(mood);
  };

  return (
    <>
    
    <div className="mood-activities-container">
      <h2>Relaxing Activities for Your Mood</h2>
      <div className="emoji-selection">
        <span role="img" aria-label="happy" onClick={() => handleEmojiClick("happy")}>😊</span>
        <span role="img" aria-label="sad" onClick={() => handleEmojiClick("sad")}>😢</span>
        <span role="img" aria-label="angry" onClick={() => handleEmojiClick("angry")}>😠</span>
        <span role="img" aria-label="upset" onClick={() => handleEmojiClick("upset")}>😔</span>
        <span role="img" aria-label="surprised" onClick={() => handleEmojiClick("surprised")}>😲</span>
        <span role="img" aria-label="laughing" onClick={() => handleEmojiClick("laughing")}>😂</span>
        <span role="img" aria-label="cry" onClick={() => handleEmojiClick("cry")}>😭</span>
      </div>

      {!selectedMood && <p>Select an emoji to see activities for your mood.</p>}

      {selectedMood && (
        <div className="activities">
          <h3>Relaxing Activities for {selectedMood} mood:</h3>
          <ul>
            {moodActivities[selectedMood].map((activity, index) => (
              <li key={index}>{activity}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
    </>
  );
}



