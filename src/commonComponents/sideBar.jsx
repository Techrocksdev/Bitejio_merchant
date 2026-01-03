import React, { useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUserAuth } from "./authContext";

function SideBar() {
  const location = useLocation();
  const { isSidebarHidden } = useUserAuth();

  const navigate = useNavigate();

  const logout = useCallback(() => {
    localStorage.removeItem("token-bit-merchant");
    localStorage.removeItem("rememberMe-bit-merchant");
    navigate("/login");
  }, [navigate]);

  return (
    <>
      <aside
        className={isSidebarHidden ? "sidebar close" : "sidebar"}
        id="sidebar"
      >
        <div className="sidebar-header text-center py-3">
          <div className>
            <div className>
              <img
                src="../../assets/image/project/logo-main.svg"
                alt="Bitezio Logo"
                className="sidebar-logo"
              />
              <h2 className="fs-2 fw-bold text-main">Merchant Panel</h2>
            </div>
          </div>
        </div>
        <ul className="sidebar-menu list-unstyled">
          <li>
            <Link
              className={
                location.pathname.includes("dashboard") ? "active" : ""
              }
              to="/merchant/dashboard"
            >
              <i className="fa fa-home me-2" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              className={location.pathname.includes("products") ? "active" : ""}
              to="/merchant/products"
            >
              <i className="fa fa-shopping-bag  me-2" />
              Products Management
            </Link>
          </li>
          <li>
            <Link
              className={
                location.pathname.includes("deliveryboys") ? "active" : ""
              }
              to="/merchant/deliveryboys"
            >
              <i className="fa fa-user me-2" />
              Delivery Management
            </Link>
          </li>
          <li>
            <Link
              className={location.pathname.includes("orders") ? "active" : ""}
              to="/merchant/orders"
            >
              <i className="fa fa-shopping-cart me-2" />
              Order Management
            </Link>
          </li>
          <li>
            <Link
              to=""
              onClick={(e) => {
                e.preventDefault();
                logout();
              }}
            >
              <i className="fa fa-sign-out me-2" />
              Logout
            </Link>
          </li>
        </ul>
      </aside>
    </>
  );
}

export default React.memo(SideBar);
