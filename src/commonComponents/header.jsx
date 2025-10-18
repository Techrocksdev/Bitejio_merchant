import React from "react";
import { useUserAuth } from "./authContext";

function Header() {
  const { toggleSidebar } = useUserAuth();
  return (
    <>
      <header className="admin-header d-flex justify-content-between align-items-center px-4">
        <div>
          <button
            className="toggle-btn"
            id="toggle-btn"
            onClick={() => toggleSidebar()}
          >
            <i className="fa fa-bars" />
          </button>
          {/* <div class="header-logo">
                        <img src="../../assets/image/project/logo-main.svg" alt="Bitezio Logo" class="header-logo-img">
                    </div> */}
        </div>
        <div className="dropdown">
          <a
            href="#"
            className="d-flex align-items-center text-decoration-none dropdown-toggle profile-dropdown"
            id="accountMenu"
            data-bs-toggle="dropdown"
          >
            <img
              src="../../assets/image/users/user.png"
              className="rounded-circle me-2 user"
              alt="Admin"
            />
            <span className="fw-semibold">Admin</span>
          </a>
          <ul
            className="dropdown-menu dropdown-menu-end"
            aria-labelledby="accountMenu"
          >
            <li>
              <a className="dropdown-item" href="#">
                <i className="fa fa-cog me-2" />
                Settings
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                <i className="fa fa-sign-out me-2" />
                Logout
              </a>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
}

export default React.memo(Header);
