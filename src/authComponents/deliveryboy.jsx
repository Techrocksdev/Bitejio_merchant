import React, { useEffect, useState } from "react";
import SideBar from "../commonComponents/sideBar";
import Header from "../commonComponents/header";
import { useUserAuth } from "../commonComponents/authContext";
import { useQuery } from "@tanstack/react-query";
import {
  deleteDeliveryBoy,
  getMyDeliveryBoys,
  updateDeliveryBoyStatus,
} from "../apiServices/home/homeHttpService";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { showGlobalAlert } from "../commonComponents/useGlobalAlert";
import { Link } from "react-router-dom";
import AddDeliveryboy from "./addDeliveryboy";

function DeliveryBoy() {
  const { isSidebarHidden } = useUserAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setpageSize] = useState(10);
  const [details, setDetails] = useState({});
  const [delId, setDelId] = useState("");

  useEffect(() => {}, [details]);

  const {
    data: response,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["deliveryBoyList", currentPage, pageSize],
    queryFn: async () => {
      const formData = {
        page: currentPage,
        pageSize: pageSize,
        search: "",
        from: "",
        to: "",
        status: "",
      };
      return getMyDeliveryBoys(formData);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const results = response?.results?.deliveryBoys || [];
  const totalPages = Math.ceil(response?.results?.totalPages);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const changeStatus = async (id) => {
    try {
      const response = await updateDeliveryBoyStatus(id);
      if (!response.error) {
        showGlobalAlert(response.message, "success");
        refetch();
      } else {
        showGlobalAlert(response.message, "error");
      }
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      console.log("An error occurred");
    }
  };
  const deleteMerchant = async (id) => {
    try {
      const response = await deleteDeliveryBoy(id);
      if (!response.error) {
        showGlobalAlert(response.message, "success");
        document.getElementById("close").click();
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
                  <h3 className="fw-semibold fs-5">Delivery Boy Management</h3>
                  <button
                    className="btn btn-sm btn-light w-auto"
                    data-bs-toggle="modal"
                    data-bs-target="#addMerchantModal"
                  >
                    <i className="fa fa-plus me-1" /> Add
                  </button>
                </div>
              </div>
              <div className="table-responsive shadow-sm rounded bg-white p-3">
                <table className="table table-hover align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>S.No</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                      <th>Status</th>
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
                        </tr>
                      ))
                    ) : results?.length ? (
                      results?.map((item, index) => (
                        <tr>
                          <td>{index + 1}</td>
                          <td>{item.firstName}</td>
                          <td>{item.lastName}</td>
                          <td>{item.email}</td>
                          <td>
                            <div className="form-check form-switch">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={item.status}
                                onChange={() => changeStatus(item._id)}
                              />
                            </div>
                          </td>
                          <td className="text-center">
                            <button
                              className="table-btn bg-main me-2"
                              data-bs-toggle="modal"
                              data-bs-target="#viewMerchantModal"
                              onClick={() => setDetails(item)}
                            >
                              <i className="fa fa-eye" />
                            </button>
                            <button
                              className="table-btn bg-main me-2"
                              data-bs-toggle="modal"
                              data-bs-target="#addMerchantModal"
                              onClick={() => setDetails(item)}
                            >
                              <i className="fa fa-edit" />
                            </button>
                            <button
                              className="table-btn bg-danger"
                              data-bs-toggle="modal"
                              data-bs-target="#delete"
                              onClick={(e) => {
                                e.stopPropagation();
                                setDelId(item._id);
                              }}
                            >
                              <i className="fa fa-trash" />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center">
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

      {/* View Merchant Modal */}
      <div
        className="modal fade"
        id="viewMerchantModal"
        tabIndex={-1}
        aria-hidden="true"
        data-bs-backdrop="static"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-main fw-bold">
                Delivery Boy Details
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                onClick={() => setDetails({})}
              />
            </div>
            <div className="modal-body">
              <p>
                <strong>First Name:</strong> {details?.firstName}
              </p>
              <p>
                <strong>Last Name:</strong> {details?.lastName}
              </p>

              <p>
                <strong>Email:</strong> {details?.email}
              </p>

              <p>
                <strong>Address:</strong> {details?.address}
              </p>
              <p>
                <strong> Phone Number:</strong> {details?.phoneNumber}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                {details?.status ? "Active" : "Inactive"}
              </p>
            </div>
            <div className="modal-footer">
              <button
                className="btn comman-btn-main"
                data-bs-dismiss="modal"
                onClick={() => setDetails({})}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Merchant Modal */}

      <div
        className="modal fade"
        id="addMerchantModal"
        tabIndex={-1}
        aria-hidden="true"
        data-bs-backdrop="static"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <AddDeliveryboy
            details={details}
            setDetails={setDetails}
            refetch={refetch}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
      <div
        className="modal fade logoutmodal"
        id="delete"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="paymentmodal_main text-center">
                <div className="payment_head mb-3 mt-1">
                  <h2>Confirmation</h2>
                  <p>Are you sure? This action can not be reverted.</p>
                </div>
                <div className="row justify-content-center mb-2">
                  <div className="col-auto">
                    <button
                      className="comman-btn-main"
                      onClick={() => deleteMerchant(delId)}
                    >
                      Yes
                    </button>
                  </div>
                  <div className="col-auto">
                    <Link
                      className="comman-btn-main white"
                      data-bs-dismiss="modal"
                      to=""
                      onClick={() => setDelId("")}
                      id="close"
                    >
                      No
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default React.memo(DeliveryBoy);
