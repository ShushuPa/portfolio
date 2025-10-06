import { NavLink } from "react-router";
import Moon from '../assets/moon.svg';

export default function NavBar() {
 return (
        <nav className="flex justify-end-safe items-center p-4 bg-white">
            <NavLink to="/" className="hover:underline">
                <img src={Moon} alt="Moon" width="32" height="32" />
            </NavLink>
        </nav>
    );
};
