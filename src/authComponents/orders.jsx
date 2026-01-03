import React, { useState } from "react";
import { Link } from "react-router-dom";
import SideBar from "../commonComponents/sideBar";
import Header from "../commonComponents/header";
import { useUserAuth } from "../commonComponents/authContext";
import { useQuery } from "@tanstack/react-query";
import {
  changeOrderStatus,
  getOrders,
} from "../apiServices/home/homeHttpService";
import { showGlobalAlert } from "../commonComponents/useGlobalAlert";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import moment from "moment";

function Orders() {
  const { isSidebarHidden } = useUserAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setpageSize] = useState(10);
  const [details, setDetails] = useState({});

  const {
    data: response,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["ordersList", currentPage, pageSize],
    queryFn: async () => {
      const formData = {
        page: currentPage,
        pageSize: pageSize,
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
  const totalPages = Math.ceil(response?.results?.totalPages);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

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
                      [...Array(pageSize)].map((_, index) => (
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
                                  {index < item.products.length - 1 ? ", " : ""}
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
            {results?.length ? (
              <div className="col-md-12 mt-3">
                <div className="row align-items-center justify-content-between">
                  <div className="col-auto">
                    <div className="datafilter">
                      <span>Showing</span>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        value={pageSize}
                        onChange={(e) => {
                          setpageSize(parseInt(e.target.value, 10));
                          setCurrentPage(1);
                        }}
                      >
                        <option value="">Select</option>
                        <option value={10}>10</option>
                        <option value={15}>15</option>
                        <option value={20}>20</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-auto">
                    <div className="page_txt"></div>
                  </div>
                  <div className="col-auto">
                    <nav aria-label="Page navigation example">
                      <ul className="pagination border-0 gap-2">
                        <li className="page-item">
                          <button
                            className={`page-link ${
                              currentPage === 1 ? "disabled" : ""
                            }`}
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                          >
                            <i class="fa fa-angle-left"></i>
                          </button>
                        </li>
                        {Array.from({ length: totalPages })
                          .map((_, index) => index + 1)
                          .filter((page) => {
                            return (
                              page === 1 ||
                              page === totalPages ||
                              Math.abs(page - currentPage) <= 2
                            );
                          })
                          .reduce((acc, page, index, array) => {
                            if (index > 0 && page - array[index - 1] > 1) {
                              acc.push("...");
                            }
                            acc.push(page);
                            return acc;
                          }, [])
                          .map((page, index) =>
                            page === "..." ? (
                              <span key={index} className="pagination-ellipsis">
                                ...
                              </span>
                            ) : (
                              <>
                                <li className="page-item">
                                  <button
                                    key={index}
                                    className={`page-link ${
                                      currentPage === page ? "active" : ""
                                    }`}
                                    onClick={() => handlePageChange(page)}
                                  >
                                    {page}
                                  </button>
                                </li>
                              </>
                            )
                          )}
                        <li className="page-item">
                          <button
                            className={`page-link ${
                              currentPage === totalPages ? "disabled" : ""
                            }`}
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                          >
                            <i class="fa fa-angle-right"></i>
                          </button>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
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
                    <strong>Address:</strong>{" "}
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        `${details?.address?.address_line2} ${details?.address?.address_line1}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "#ff6b00",
                        fontWeight: "400",
                        textDecoration: "underline",
                        textUnderlineOffset: "4px",
                      }}
                    >
                      <i className="fas fa-map-marker-alt me-1"></i>
                      {details?.address?.address_line2}{" "}
                      {details?.address?.address_line1}
                    </a>
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
                    <strong>Items:</strong>
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

export default React.memo(Orders);
