import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import SentimentalWidget from "./components/SentimentalWidget";

const THEME_STORAGE_KEY = "theme";

function applyTheme(theme: "light" | "dark") {
  document.documentElement.setAttribute("data-theme", theme);
}

function getInitialTheme(): "light" | "dark" {
  const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);

  if (storedTheme === "light" || storedTheme === "dark") {
    return storedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function App() {
  const queryClient = new QueryClient();
  const [theme, setTheme] = useState<"light" | "dark">(getInitialTheme);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <main className="mx-auto p-12">
      <QueryClientProvider client={queryClient}>
        <SentimentalWidget />
        <button
          type="button"
          className="absolute top-4 right-4 cursor-pointer text-sm"
          onClick={toggleTheme}
        >
          {theme === "light" ? "Switch to dark" : "Switch to light"}
        </button>
      </QueryClientProvider>
    </main>
  );
}

export default App;
