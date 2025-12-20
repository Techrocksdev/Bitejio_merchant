import React, { useState } from "react";
import { Link } from "react-router-dom";
import SideBar from "../commonComponents/sideBar";
import Header from "../commonComponents/header";
import { useUserAuth } from "../commonComponents/authContext";
import { useQuery } from "@tanstack/react-query";
import { getDashboardCounts } from "../apiServices/home/homeHttpService";
import {
  changeOrderStatus,
  getOrders,
} from "../apiServices/home/homeHttpService";
import { showGlobalAlert } from "../commonComponents/useGlobalAlert";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import moment from "moment";
function Dashboard() {
  const { isSidebarHidden } = useUserAuth();

  const [details, setDetails] = useState({});
  const { data: count } = useQuery({
    queryKey: ["getDashboardCount"],
    queryFn: getDashboardCounts,
    onError: (error) => {
      console.log(error);
    },
    select: (data) => data.results.data,
  });

  const {
    data: response,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["ordersList"],
    queryFn: async () => {
      const formData = {
        page: 1,
        pageSize: 5,
        search: "",
        userId: "",
        year: 0,
        month: 0,
        startDate: "",
        endDate: "",
      };
      return getOrders(formData);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const results = response?.results?.orders || [];

  const changeOrderSta = async (id, status) => {
    const formData = {
      orderId: id,
      status: status,
    };
    try {
      const response = await changeOrderStatus(formData);
      if (!response.error) {
        refetch();
      } else {
        showGlobalAlert(response.message, "error");
      }
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      console.log("An error occurred");
    }
  };
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
            <div className="row mb-4 g-3">
              {/* Total Orders */}
              <div className="col-md-3 col-sm-6">
                <div className="card stat-card shadow-sm p-3 d-flex flex-row align-items-center">
                  <div className="icon-circle bg-light-main text-main me-3">
                    <i className="fa-solid fa-box" />
                  </div>
                  <div className="text-start">
                    <h6 className="fw-semibold text-muted mb-1">
                      Total Orders
                    </h6>
                    <h4 className="fw-bold text-dark mb-0">
                      {count?.orderCount || 0}
                    </h4>
                  </div>
                </div>
              </div>
              {/* Pending Orders */}
              <div className="col-md-3 col-sm-6">
                <div className="card stat-card shadow-sm p-3 d-flex flex-row align-items-center">
                  <div className="icon-circle me-3">
                    <i className="fa-solid fa-hourglass-half" />
                  </div>
                  <div className="text-start">
                    <h6 className="fw-semibold text-muted mb-1">
                      Pending Orders
                    </h6>
                    <h4 className="fw-bold text-dark mb-0">
                      {count?.pendingOrderCount || 0}
                    </h4>
                  </div>
                </div>
              </div>
              {/* Delivered Orders */}
              <div className="col-md-3 col-sm-6">
                <div className="card stat-card shadow-sm p-3 d-flex flex-row align-items-center">
                  <div className="icon-circle me-3">
                    <i className="fa-solid fa-truck" />
                  </div>
                  <div className="text-start">
                    <h6 className="fw-semibold text-muted mb-1">
                      Delivered Orders
                    </h6>
                    <h4 className="fw-bold text-dark mb-0">
                      {count?.deliveredOrderCount || 0}
                    </h4>
                  </div>
                </div>
              </div>
              {/* Total Revenue */}
              <div className="col-md-3 col-sm-6">
                <div className="card stat-card shadow-sm p-3 d-flex flex-row align-items-center">
                  <div className="icon-circle me-3">
                    <i className="fa-solid fa-indian-rupee-sign" />
                  </div>
                  <div className="text-start">
                    <h6 className="fw-semibold text-muted mb-1">
                      Total Revenue
                    </h6>
                    <h4 className="fw-bold text-dark mb-0">
                      {" "}
                      ₹{count?.revenue || 0}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <div className="d-flex gap-3 align-items-center justify-content-between">
                      <h3 className="fw-semibold fs-5">Recent Orders</h3>
                    </div>
                  </div>
                  <div className="table-responsive shadow-sm rounded bg-white p-3">
                    <table className="table table-hover align-middle">
                      <thead className="table-light">
                        <tr>
                          <th>S.No</th>
                          <th>Order ID</th>
                          <th>Customer</th>
                          <th>Items</th>
                          <th>Total</th>
                          <th>Status</th>
                          <th>Date</th>
                          <th className="text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {isLoading ? (
                          [...Array(5)].map((_, index) => (
                            <tr key={index}>
                              <td>
                                <Skeleton />
                              </td>
                              <td>
                                <Skeleton />
                              </td>
                              <td>
                                <Skeleton />
                              </td>
                              <td>
                                <Skeleton />
                              </td>
                              <td>
                                <Skeleton />
                              </td>

                              <td>
                                <Skeleton />
                              </td>
                              <td>
                                <Skeleton />
                              </td>
                              <td>
                                <Skeleton />
                              </td>
                            </tr>
                          ))
                        ) : results?.length ? (
                          results?.map((item, index) => (
                            <tr key={item._id}>
                              <td>{index + 1}</td>
                              <td>#{item.orderId}</td>
                              <td>{item.userId.firstName}</td>
                              <td>
                                {item.products &&
                                  item.products.map((product, index) => (
                                    <span key={product._id || index}>
                                      {product.quantity}x{" "}
                                      {product.productId?.name_en}
                                      {index < item.products.length - 1
                                        ? ", "
                                        : ""}
                                    </span>
                                  ))}
                              </td>
                              <td>₹{item.amount}</td>
                              <td>
                                <select
                                  value={item.status}
                                  className="form-select form-select-sm status-dropdown"
                                  onChange={(e) =>
                                    changeOrderSta(item._id, e.target.value)
                                  }
                                >
                                  <option value="Pending">Pending</option>
                                  <option value="Preparing" selected>
                                    Preparing
                                  </option>
                                  <option value="Out for Delivery">
                                    Out for Delivery
                                  </option>
                                  <option value="Delivered">Delivered</option>
                                  <option value="Cancelled">Cancelled</option>
                                </select>
                              </td>
                              <td>
                                {moment(item.createdAt).format(
                                  "DD MMM YYYY, hh:mm A"
                                )}
                              </td>
                              <td className="text-center">
                                <button
                                  className="table-btn bg-main me-2"
                                  data-bs-toggle="modal"
                                  data-bs-target="#viewOrderModal"
                                  onClick={() => setDetails(item)}
                                >
                                  <i className="fa fa-eye" />
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="8" className="text-center">
                              Oops! No Result Found.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
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
        data-bs-backdrop="static"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-main fw-bold">Order Details</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                onClick={() => setDetails({})}
              />
            </div>
            <div className="modal-body">
              <div className="row g-4">
                {/* Customer Details */}
                <div className="col-md-6">
                  <h6 className="fw-bold text-main mb-2">Customer Details</h6>
                  <p>
                    <strong>Name:</strong> {details?.userId?.firstName}{" "}
                    {details?.userId?.lastName}
                  </p>
                  <p>
                    <strong>Email:</strong> {details?.userId?.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {details?.userId?.phoneNumber}
                  </p>
                  <p>
                    <strong>Address:</strong> {details?.address?.address_line2}{" "}
                    {details?.address?.address_line1}
                  </p>
                </div>
                {/* Merchant Details */}
                <div className="col-md-6">
                  <h6 className="fw-bold text-main mb-2">Merchant Details</h6>
                  <p>
                    <strong>Shop:</strong> {details?.merchant?.shopName}
                  </p>
                  <p>
                    <strong>Contact:</strong> {details?.merchant?.phoneNumber}
                  </p>
                  <p>
                    <strong>Location:</strong> {details?.merchant?.address}
                  </p>
                </div>
                {/* Order Details */}
                <div className="col-12">
                  <h6 className="fw-bold text-main mb-2">Order Information</h6>
                  <p>
                    <strong>Order ID:</strong> #{details?.orderId}
                  </p>
                  <p>
                    <strong>Items:</strong>{" "}
                    {details?.products &&
                      details?.products.map((product, index) => (
                        <span key={product._id || index}>
                          {product.quantity}x {product.productId?.name_en}
                          {index < details?.products.length - 1 ? ", " : ""}
                        </span>
                      ))}
                  </p>
                  <p>
                    <strong>Total Amount:</strong> ₹{details?.amount}
                  </p>
                  <p>
                    <strong>Payment Method:</strong> UPI
                  </p>
                  <p>
                    <strong>Status:</strong> {details?.status}
                  </p>
                  <p>
                    <strong>Placed At:</strong>{" "}
                    {moment(details.createdAt).format("DD MMM YYYY, hh:mm A")}
                  </p>
                  <p>
                    <strong>Expected Delivery:</strong> 1 hour
                  </p>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn comman-btn-main"
                onClick={() => setDetails({})}
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default React.memo(Dashboard);
