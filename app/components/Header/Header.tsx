import Image from "next/image";
import logo from "../../../public/assets/img/logo.svg";
import Profile from "../Profile";
import Link from "next/link";
import "./Header.css";

export default function Header() {
  return (
    <header>
      <div className="header-container">
        <Link href="/" className="header__logo">
          <Image src={logo} alt="Hop & Barley Logo" />
          <p className="logo-text">Hop & Barley</p>
        </Link>
        <nav className="header__nav">
          <ul>
            <li>
              <Link href="/">Products</Link>
            </li>
            <li>
              <Link href="/#">Guides & Recipes</Link>
            </li>
            <li>
              <Link href="#">Community</Link>
            </li>
            <li>
              <Link href="#">Resources</Link>
            </li>
            <li>
              <Link href="#">Contact</Link>
            </li>
          </ul>
        </nav>

        <Profile />
      </div>
    </header>
  );
}
