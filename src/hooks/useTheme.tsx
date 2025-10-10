import { useState, useEffect } from "react";

export default function useTheme() {
 const [isDarkMode, setIsDarkMode] = useState(false);

 useEffect(() => {
   const savedTheme = localStorage.getItem("theme");
   if (savedTheme) {
     setIsDarkMode(savedTheme === "dark");
   }
 }, []);

 const toggleTheme = () => {
   setIsDarkMode((prev) => !prev);
   localStorage.setItem("theme", isDarkMode ? "light" : "dark");
 };

 return { isDarkMode, toggleTheme };
}