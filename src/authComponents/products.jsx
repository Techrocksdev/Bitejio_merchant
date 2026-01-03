import React, { useState } from "react";
import { Link } from "react-router-dom";
import SideBar from "../commonComponents/sideBar";
import Header from "../commonComponents/header";
import { useUserAuth } from "../commonComponents/authContext";
import { useQuery } from "@tanstack/react-query";
import {
  deleteProduct,
  getProduct,
  updateProductStatus,
} from "../apiServices/home/homeHttpService";
import { showGlobalAlert } from "../commonComponents/useGlobalAlert";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function Products() {
  const { isSidebarHidden } = useUserAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setpageSize] = useState(10);
  const [delId, setDelId] = useState("");

  const {
    data: response,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["productList", currentPage, pageSize],
    queryFn: async () => {
      const formData = {
        page: currentPage,
        pageSize: pageSize,

        search: "",
      };
      return getProduct(formData);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const results = response?.results?.products || [];
  const totalPages = Math.ceil(response?.results?.totalPages);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const changeStatus = async (id) => {
    try {
      const response = await updateProductStatus(id);
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
  const deletePro = async (id) => {
    try {
      const response = await deleteProduct(id);
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
                  <h3 className="fw-semibold fs-5">Products Management</h3>
                  <Link
                    className="btn btn-sm btn-light"
                    to="/merchant/add-product"
                  >
                    <i className="fa fa-plus" /> Add
                  </Link>
                </div>
              </div>
              <div className="table-responsive shadow-sm rounded bg-white p-3">
                <table className="table table-hover align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>S.No</th>
                      <th>Product Name</th>
                      <th>Category</th>
                      <th>Subcategory</th>
                      <th>Type</th>
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
                          <td>
                            <Skeleton />
                          </td>
                        </tr>
                      ))
                    ) : results?.length ? (
                      results?.map((item, index) => (
                        <tr>
                          <td>{index + 1}</td>
                          <td>{item.name_en}</td>
                          <td>{item.categoryId.name_en}</td>
                          <td>{item.subCategoryId.name_en}</td>
                          <td>{item.type}</td>
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
                            <Link
                              to={`/merchant/product-details/${item._id}`}
                              className="table-btn bg-main me-2"
                            >
                              <i className="fa fa-eye" />
                            </Link>
                            <Link
                              to={`/merchant/edit-product/${item._id}`}
                              className="table-btn bg-main me-2"
                            >
                              <i className="fa fa-edit" />
                            </Link>
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
                        <td colSpan="7" className="text-center">
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
                      onClick={() => deletePro(delId)}
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

export default React.memo(Products);
