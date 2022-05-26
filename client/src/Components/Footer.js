import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Auth from "../utils/Auth";
import css from "./Footer.css";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="footer">
      <ul className="navbar-footer">
        {
          // Check if message failed
          Auth.loggedIn() ? (
            <div>
              <button className="navList"
                onClick={(e) => {
                  Auth.logout(() => {
                    navigate("/login");
                  });
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <div>
              <Link className= "link" to="/login">Login</Link>
            </div>
          )
        }
      </ul>
    </footer>
  );
}
