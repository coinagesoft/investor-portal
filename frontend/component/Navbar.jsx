"use client";

import { useEffect, useState } from "react";

export default function Navbar() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const toggleMobileMenu = () => {
    document.documentElement.classList.toggle("layout-menu-expanded");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/auth";
  };

  return (
    <nav
      className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
      id="layout-navbar"
    >
      <div className="layout-menu-toggle navbar-nav align-items-xl-center me-4 me-xl-0 d-xl-none">
        <button
          type="button"
          className="nav-item nav-link px-0 me-xl-6 btn btn-link"
          aria-label="Toggle menu"
          onClick={toggleMobileMenu}
        >
          <i className="ri-menu-fill ri-22px"></i>
        </button>
      </div>

      <div
        className="navbar-nav-right d-flex align-items-center"
        id="navbar-collapse"
      >

        {/* Search */}
        <div className="navbar-nav align-items-center">
          <div className="nav-item navbar-search-wrapper mb-0">
            <a
              className="nav-item nav-link search-toggler fw-normal px-0"
              href="#"
            >
              <i className="ri-search-line ri-22px scaleX-n1-rtl me-3"></i>

              <span className="d-none d-md-inline-block text-muted">
                Search (Ctrl+/)
              </span>
            </a>
          </div>
        </div>

        <ul className="navbar-nav flex-row align-items-center ms-auto">

          {/* Theme Switcher */}
          <li className="nav-item dropdown-style-switcher dropdown me-1 me-xl-0">
            <a
              className="nav-link btn btn-text-secondary rounded-pill btn-icon dropdown-toggle hide-arrow"
              href="#"
              data-bs-toggle="dropdown"
            >
              <i className="ri-22px"></i>
            </a>

            <ul className="dropdown-menu dropdown-menu-end dropdown-styles">
              <li>
                <a
                  className="dropdown-item"
                  href="#"
                  data-theme="light"
                >
                  <span className="align-middle">
                    <i className="ri-sun-line ri-22px me-3"></i>
                    Light
                  </span>
                </a>
              </li>

              <li>
                <a
                  className="dropdown-item"
                  href="#"
                  data-theme="dark"
                >
                  <span className="align-middle">
                    <i className="ri-moon-clear-line ri-22px me-3"></i>
                    Dark
                  </span>
                </a>
              </li>

              <li>
                <a
                  className="dropdown-item"
                  href="#"
                  data-theme="system"
                >
                  <span className="align-middle">
                    <i className="ri-computer-line ri-22px me-3"></i>
                    System
                  </span>
                </a>
              </li>
            </ul>
          </li>

          {/* User Dropdown */}
          <li className="nav-item navbar-dropdown dropdown-user dropdown">
            <a
              className="nav-link dropdown-toggle hide-arrow"
              href="#"
              data-bs-toggle="dropdown"
            >
              <div className="avatar avatar-online">
                <img
                  src="./assets/img/avatars/1.png"
                  alt="Avatar"
                  className="rounded-circle"
                />
              </div>
            </a>

            <ul className="dropdown-menu dropdown-menu-end">

              {/* User Info */}
              <li>
                <a
                  className="dropdown-item"
                  href="#"
                >
                  <div className="d-flex">
                    <div className="flex-shrink-0 me-2">
                      <div className="avatar avatar-online">
                        <img
                          src="./assets/img/avatars/1.png"
                          alt="Avatar"
                          className="rounded-circle"
                        />
                      </div>
                    </div>

                    <div className="flex-grow-1">
                      <span className="fw-medium d-block small">
                        {user?.name || "User"}
                      </span>

                      <small className="text-muted">
                        {user?.role || "Member"}
                      </small>
                    </div>
                  </div>
                </a>
              </li>

              <li>
                <div className="dropdown-divider"></div>
              </li>

              {/* Logout Button */}
              <li>
                <div className="d-grid px-4 pt-2 pb-1">
                  <button
                    className="btn btn-sm btn-danger d-flex align-items-center justify-content-center"
                    onClick={handleLogout}
                  >
                    <small className="align-middle">Logout</small>

                    <i className="ri-logout-box-r-line ms-2 ri-16px"></i>
                  </button>
                </div>
              </li>

            </ul>
          </li>
        </ul>
      </div>

      {/* Search Input */}
      <div className="navbar-search-wrapper search-input-wrapper d-none">
        <input
          type="text"
          className="form-control search-input container-xxl border-0"
          placeholder="Search..."
          aria-label="Search..."
        />

        <i className="ri-close-fill search-toggler cursor-pointer"></i>
      </div>
    </nav>
  );
}