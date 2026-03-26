import { useEffect, useState } from "react";
import SentimentalWidget from "./components/SentimentalWidget";

function applyTheme(theme: "light" | "dark") {
  document.documentElement.setAttribute("data-theme", theme);
}

function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <main className="mx-auto p-12">
      <SentimentalWidget />
      <button
        type="button"
        className="absolute top-4 right-4 cursor-pointer text-sm"
        onClick={toggleTheme}
      >
        {theme === "light" ? "Switch to dark" : "Switch to light"}
      </button>
    </main>
  );
}

export default App;
