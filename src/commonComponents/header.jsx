import React from "react";
import { useUserAuth } from "./authContext";
import { Link } from "react-router-dom";

function Header() {
  const { toggleSidebar, profile } = useUserAuth();
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
            <i className="fa fa-user me-2"></i>
            <span className="fw-semibold">{profile?.name}</span>
          </a>
          <ul
            className="dropdown-menu dropdown-menu-end"
            aria-labelledby="accountMenu"
          >
            <li>
              <Link className="dropdown-item" to="/merchant/profile">
                <i className="fa fa-cog me-2" />
                Settings
              </Link>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
}

export default React.memo(Header);
