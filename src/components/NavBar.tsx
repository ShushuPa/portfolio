import { NavLink } from "react-router";
import Moon from '../assets/moon.svg';
import Sun from '../assets/sun.svg';
import useTheme from '../hooks/useTheme';

export default function NavBar() {
 const { isDarkMode, toggleTheme } = useTheme();

 return (
       /* <nav className={isDarkMode ? "flex justify-end-safe items-center p-4 dark:bg-black" : "flex justify-end-safe items-center p-4 bg-white"}>*/
        <nav className="flex justify-end-safe items-center p-4 dark:bg-gray-800">
            <NavLink to="/" className="hover:underline">
                <img src={isDarkMode ? Sun : Moon} alt="Theme Toggle" width="32" height="32" onClick={toggleTheme} />
            </NavLink>
        </nav>
    );
};
