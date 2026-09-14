import Image from "next/image";
import logo from "../../../public/assets/img/background/image-footer.svg";
import Link from "next/link";
import "./Footer.css";

export default function Footer() {
  return (
    <footer>
      <Image
        src={logo}
        alt="Hop & Barley Hops Logo"
        className="footer__hops-logo"
      />
      <nav className="footer__nav">
        <ul>
          <li>
            <Link href="#">Contact</Link>
          </li>
          <li>
            <Link href="#">FAQ</Link>
          </li>
          <li>
            <Link href="#">Community</Link>
          </li>
          <li>
            <Link href="#">Resources</Link>
          </li>
          <li>
            <Link href="#">License</Link>
          </li>
        </ul>
      </nav>
      <p className="footer__copyright">
        © Hop & Barley 2025. All rights reserved
      </p>
    </footer>
  );
}
