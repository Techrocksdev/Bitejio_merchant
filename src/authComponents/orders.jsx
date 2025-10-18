import React from "react";
import { Link } from "react-router-dom";
import SideBar from "../commonComponents/sideBar";
import Header from "../commonComponents/header";
import { useUserAuth } from "../commonComponents/authContext";

function Orders() {
  const { isSidebarHidden } = useUserAuth();
  return (
    <>
      <div className="admin-wrapper d-flex">
        <SideBar />

        <div
          className={
            isSidebarHidden
              ? "main-content flex-grow-1 full"
              : "main-content flex-grow-1"
          }
          id="main-content"
        >
          <Header />

          <main className="p-4">
            <div className="card">
              <div className="card-header">
                <div className="d-flex gap-3 align-items-center justify-content-between">
                  <h3 className="fw-semibold fs-5">Order Management</h3>
                </div>
              </div>
              <div className="table-responsive shadow-sm rounded bg-white p-3">
                <table className="table table-hover align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>#</th>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Shop</th>
                      <th>Items</th>
                      <th>Total</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>#ORD1001</td>
                      <td>Aryan Saini</td>
                      <td>Pizza Hut</td>
                      <td>2x Pizza, 1x Coke</td>
                      <td>₹550</td>
                      <td>
                        <select className="form-select form-select-sm status-dropdown">
                          <option value="pending">Pending</option>
                          <option value="preparing" selected>
                            Preparing
                          </option>
                          <option value="out-for-delivery">
                            Out for Delivery
                          </option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td>09 Sep 2025, 7:45 PM</td>
                      <td className="text-center">
                        <button
                          className="table-btn bg-main me-2"
                          data-bs-toggle="modal"
                          data-bs-target="#viewOrderModal"
                        >
                          <i className="fa fa-eye" />
                        </button>
                        <button className="table-btn bg-danger">
                          <i className="fa fa-trash" />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>

      <div
        className="modal fade"
        id="viewOrderModal"
        tabIndex={-1}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-main fw-bold">Order Details</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              />
            </div>
            <div className="modal-body">
              <div className="row g-4">
                {/* Customer Details */}
                <div className="col-md-6">
                  <h6 className="fw-bold text-main mb-2">Customer Details</h6>
                  <p>
                    <strong>Name:</strong> Aryan Saini
                  </p>
                  <p>
                    <strong>Email:</strong> aryan@example.com
                  </p>
                  <p>
                    <strong>Phone:</strong> +91 9876543210
                  </p>
                  <p>
                    <strong>Address:</strong> Sector 62, Noida, UP
                  </p>
                </div>
                {/* Order Details */}
                <div className="col-md-6">
                  <h6 className="fw-bold text-main mb-2">Order Information</h6>
                  <p>
                    <strong>Order ID:</strong> #ORD1001
                  </p>
                  <p>
                    <strong>Items:</strong> 2x Pizza, 1x Coke
                  </p>
                  <p>
                    <strong>Total Amount:</strong> ₹550
                  </p>
                  <p>
                    <strong>Payment Method:</strong> UPI
                  </p>
                  <p>
                    <strong>Status:</strong> Preparing
                  </p>
                  <p>
                    <strong>Placed At:</strong> 09 Sep 2025, 7:45 PM
                  </p>
                  <p>
                    <strong>Expected Delivery:</strong> 09 Sep 2025, 8:30 PM
                  </p>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn comman-btn-main" data-bs-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default React.memo(Orders);
