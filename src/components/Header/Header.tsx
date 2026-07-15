import { useLocation } from "react-router-dom";
import logo_dark from "../../assets/images/logo-for-dark.png";
import logo_light from "../../assets/images/logo-for-light.png";
import "./Header.css";

function Header() {
  const location = useLocation();
  const theme = location.pathname === "/" ? "dark" : "light";

  return (
    <header className={`header ${theme}`}>
      <img src={theme === "dark" ? logo_dark : logo_light} alt="logo" />
      <ul className="header__list">
        <li className="header__list-item">Mobile App</li>
        <li className="header__list-item">FAQs</li>
        <li className="header__list-item">Contact</li>
        <li className="header__list-item">Sign Up</li>
      </ul>
    </header>
  );
}

export default Header;
