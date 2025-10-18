import React from "react";
import { Link } from "react-router-dom";
import SideBar from "../commonComponents/sideBar";
import Header from "../commonComponents/header";
import { useUserAuth } from "../commonComponents/authContext";

function Products() {
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
                      <th>#</th>
                      <th>Product Name</th>
                      <th>Category</th>
                      <th>Subcategory</th>
                      <th>Price</th>
                      <th>Veg/Non-Veg</th>
                      <th>Status</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Example Product */}
                    <tr>
                      <td>1</td>
                      <td>Cheese Pizza</td>
                      <td>Pizza</td>
                      <td>Veg Pizza</td>
                      <td>₹250</td>
                      <td>
                        <span className="badge bg-success">Veg</span>
                      </td>
                      <td>
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            defaultChecked
                          />
                        </div>
                      </td>
                      <td className="text-center">
                        <Link
                          to="/merchant/product-details"
                          className="table-btn bg-main me-2"
                        >
                          <i className="fa fa-eye" />
                        </Link>
                        <Link
                          to="/merchant/edit-product"
                          className="table-btn bg-main me-2"
                        >
                          <i className="fa fa-edit" />
                        </Link>
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
    </>
  );
}

export default React.memo(Products);
