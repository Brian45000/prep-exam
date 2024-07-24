// src/components/Footer.js

import React from "react";
import "../styles/Footer.css"; // Importez le fichier CSS pour styliser le footer

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} MonSite. Tous droits réservés.</p>
        <ul className="footer-links">
          <li>
            <a href="/privacy">Politique de confidentialité</a>
          </li>
          <li>
            <a href="/terms">Conditions d'utilisation</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
