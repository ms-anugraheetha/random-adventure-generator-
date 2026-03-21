import { useState } from "react";
import "./index.css";

function App() {
  // --- persistent mood ---
  const [userMood, setUserMood] = useState(
    localStorage.getItem("userMood") || "neutral"
  );

  // --- app state ---
  const [category, setCategory] = useState("indoor");
  const [darkMode, setDarkMode] = useState(false);
  const [adventure, setAdventure] = useState("");

  function updateMood(mood) {
    setUserMood(mood);
    localStorage.setItem("userMood", mood);
  }

  // --- adventure generator ---
  function generateAdventure() {
    const time = darkMode ? "night" : "day";

    const adventures = {
      indoor: {
        day: [
          "Make a fun drink and romanticize your life for 10 minutes.",
          "Clean just one thing while playing your current favorite song.",
          "Rearrange your room slightly and see if it feels different."
        ],
        night: [
          "Watch a comfort show you’ve already seen 100 times.",
          "Light a lamp, put on music, and do absolutely nothing for a bit.",
          "Organize your phone photos - stop when you get bored."
        ]
      },
      outdoor: {
        day: [
          "Go outside and walk with no destination.",
          "Get a coffee or snack just because you felt like it.",
          "Take photos of random things that look nice."
        ],
        night: [
          "Go for a quiet night walk and look at the lights.",
          "Stand outside for a minute and breathe - that’s it.",
          "Walk without headphones and notice what’s around you."
        ]
      },
      chill: {
        day: [
          "Stretch your body a little and see how it feels.",
          "Listen to one song without touching your phone.",
          "Write one random thought in your notes app."
        ],
        night: [
          "Shower like it’s a main character moment.",
          "Lie down with music and don’t scroll for a bit.",
          "Think about one thing that didn’t completely suck today."
        ]
      }
    };

   

    const list = adventures[category][time];
    const choice = list[Math.floor(Math.random() * list.length)];

    setAdventure(choice);
  }

  return (
    <div className={`page ${darkMode ? "dark" : ""}`}>
      <div className="card animate-in">
        <div className="top-bar">
          <h1>Random Adventure</h1>
          <button
            className="dark-toggle"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>

        <p className="subtitle">
          {darkMode
            ? "Night-time adventures."
            : "Daytime adventures."}
        </p>

        {/* --- mood selector --- */}
        <div className="moods">
          <button
            className={userMood === "calm" ? "active" : ""}
            onClick={() => updateMood("calm")}
            title="Calm"
          >
            😌
          </button>
          <button
            className={userMood === "tired" ? "active" : ""}
            onClick={() => updateMood("tired")}
            title="Tired"
          >
            😴
          </button>
          <button
            className={userMood === "neutral" ? "active" : ""}
            onClick={() => updateMood("neutral")}
            title="Neutral"
          >
            😐
          </button>
          <button
            className={userMood === "overwhelmed" ? "active" : ""}
            onClick={() => updateMood("overwhelmed")}
            title="Overwhelmed"
          >
            🤯
          </button>
        </div>

        {/* --- categories --- */}
        <div className="categories">
          <button
            className={category === "indoor" ? "active" : ""}
            onClick={() => setCategory("indoor")}
          >
            Indoor
          </button>
          <button
            className={category === "outdoor" ? "active" : ""}
            onClick={() => setCategory("outdoor")}
          >
            Outdoor
          </button>
          <button
            className={category === "chill" ? "active" : ""}
            onClick={() => setCategory("chill")}
          >
            Chill
          </button>
        </div>

        <button className="main-btn" onClick={generateAdventure}>
          Generate Adventure
        </button>

        {adventure && (
          <div className="result fade-in">
            {adventure}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
