import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./JwtToken";

export default function Navbar() {
  const { token } = useAuth();
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          MyApp
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {token == null ? (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    to="/createUser"
                    // target="_blank"
                  >
                    Create User
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    to="/userlogin"
                    // target="_blank"
                  >
                    Login
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    to="/retrieveGroups"
                    // target="_blank"
                  >
                    Groups
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    to="/logout"
                    // target="_blank"
                  >
                    Logout
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
