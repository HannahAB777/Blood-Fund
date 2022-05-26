import React from 'react';
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import css from './PublicNav.css';

export default function PublicNav() {
  return (
    <nav>
      <ul className="navbar">
            <li className="navOptions navList">
              <Link className="navList link" to="/">
              Home
               </Link>
            </li>
            <li className="navOptions navList">
            <Link className="navList link" to="/ourmission">
            Our Mission
             </Link>
          </li>
            <li className="navOptions navList">
              <Link className="navList link" to="/app/enter-result">
              Enter Results
               </Link>
            </li>
            <li className="navOptions navList">
            <Link className="navList link" to="/resources">
            Resources
             </Link>
          </li>
          <li className="navOptions navList">
          <Link className="navList link" to="/contact">
          Contact
           </Link>
        </li>
          </ul>
    </nav>
  
    )
}
