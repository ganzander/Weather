import React from "react";

export default function Navbar() {
  return (
    <header className="sticky-top py-3">
      <div className="container d-flex align-items-center">
        <div className="logo me-auto">
          <img
            src="/gif3.gif"
            alt="Logo"
            className="img-fluid"
            style={{ height: "100px" }}
          />
        </div>
        <nav>
          <ul className="navbar-nav ms-auto d-flex flex-row">
            <li className="nav-item me-3">
              <a href="/" className="nav-link text-white">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a href="/about" className="nav-link text-white">
                About
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
