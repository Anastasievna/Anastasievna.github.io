import { useLocation } from "react-router-dom";
import logo from "../../assets/images/logo-for-dark.png";
import "./Footer.css";

const LINKS = {
  About: ["How it works", "Featured", "Partnership", "Bussiness Relation"],
  Community: ["Events", "Blog", "Podcast", "Invite a friend"],
  Socials: ["Discord", "Instagram", "Twitter", "Facebook"],
};

function Footer() {
  const location = useLocation();

  return (
    <footer className="footer">
      {["/booking", "/review"].some((path) => location.pathname === path) && (
        <div className="footer__container">
          <div className="footer__block">
            <img src={logo} alt="logo" className="footer__logo" />
            <div className="footer__links">
              {Object.entries(LINKS).map((arr) => (
                <ul key={arr[0]} className="footer__list">
                  <li className="footer__list-item">{arr[0]}</li>
                  {arr[1].map((link, i) => (
                    <li key={arr[0] + i} className="footer__list-item">
                      {link}
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>

          <div className="footer__date">
            <p>©2025 RailWay. All rights reserved</p>
          </div>
        </div>
      )}
    </footer>
  );
}

export default Footer;
