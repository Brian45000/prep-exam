import React from "react";
import "../styles/Navbar.css"; // Importez le fichier CSS pour styliser la navbar

export function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/">MonLogo</a>
      </div>
      <ul className="navbar-links">
        <li>
          <a href="/">Accueil</a>
        </li>
        <li>
          <a href="/about">À propos</a>
        </li>
        <li>
          <a href="/services">Services</a>
        </li>
        <li>
          <a href="/contact">Contact</a>
        </li>
      </ul>
    </nav>
  );
}
