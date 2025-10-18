import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SideBar from "../commonComponents/sideBar";
import Header from "../commonComponents/header";
import { useUserAuth } from "../commonComponents/authContext";

function EditProduct() {
  const { isSidebarHidden } = useUserAuth();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
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
                  <h3 className="fw-semibold fs-5">Products Update</h3>
                  <Link
                    to=""
                    onClick={() => navigate(-1)}
                    className="btn btn-sm btn-light"
                  >
                    <i className="fa fa-arrow-left me-2" /> Go Back
                  </Link>
                </div>
              </div>
              <div className="card-body">
                <form>
                  <div className="row g-3">
                    <div className="w-20">
                      <div className="upload-img">
                        <input
                          type="file"
                          id="productImage"
                          className="d-none"
                          accept="image/*"
                        />
                        <label
                          htmlFor="productImage"
                          className="upload-content"
                        >
                          <i className="fa fa-cloud-upload" />
                          <p className="mb-0">Click to Upload Image</p>
                          <small className="text-muted">
                            PNG, JPG, JPEG (Max 2MB)
                          </small>
                        </label>
                        <div className="preview mt-3 text-center d-none">
                          <img
                            id="previewImage"
                            src
                            alt="Preview"
                            className="img-fluid rounded shadow-sm"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="w-20">
                      <div className="upload-img">
                        <input
                          type="file"
                          id="productImage"
                          className="d-none"
                          accept="image/*"
                        />
                        <label
                          htmlFor="productImage"
                          className="upload-content"
                        >
                          <i className="fa fa-cloud-upload" />
                          <p className="mb-0">Click to Upload Image</p>
                          <small className="text-muted">
                            PNG, JPG, JPEG (Max 2MB)
                          </small>
                        </label>
                        <div className="preview mt-3 text-center d-none">
                          <img
                            id="previewImage"
                            src
                            alt="Preview"
                            className="img-fluid rounded shadow-sm"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="w-20">
                      <div className="upload-img">
                        <input
                          type="file"
                          id="productImage"
                          className="d-none"
                          accept="image/*"
                        />
                        <label
                          htmlFor="productImage"
                          className="upload-content"
                        >
                          <i className="fa fa-cloud-upload" />
                          <p className="mb-0">Click to Upload Image</p>
                          <small className="text-muted">
                            PNG, JPG, JPEG (Max 2MB)
                          </small>
                        </label>
                        <div className="preview mt-3 text-center d-none">
                          <img
                            id="previewImage"
                            src
                            alt="Preview"
                            className="img-fluid rounded shadow-sm"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="w-20">
                      <div className="upload-img">
                        <input
                          type="file"
                          id="productImage"
                          className="d-none"
                          accept="image/*"
                        />
                        <label
                          htmlFor="productImage"
                          className="upload-content"
                        >
                          <i className="fa fa-cloud-upload" />
                          <p className="mb-0">Click to Upload Image</p>
                          <small className="text-muted">
                            PNG, JPG, JPEG (Max 2MB)
                          </small>
                        </label>
                        <div className="preview mt-3 text-center d-none">
                          <img
                            id="previewImage"
                            src
                            alt="Preview"
                            className="img-fluid rounded shadow-sm"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="w-20">
                      <div className="upload-img">
                        <input
                          type="file"
                          id="productImage"
                          className="d-none"
                          accept="image/*"
                        />
                        <label
                          htmlFor="productImage"
                          className="upload-content"
                        >
                          <i className="fa fa-cloud-upload" />
                          <p className="mb-0">Click to Upload Image</p>
                          <small className="text-muted">
                            PNG, JPG, JPEG (Max 2MB)
                          </small>
                        </label>
                        <div className="preview mt-3 text-center d-none">
                          <img
                            id="previewImage"
                            src
                            alt="Preview"
                            className="img-fluid rounded shadow-sm"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <label className="form-label">Product Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter product name"
                      />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label">Category</label>
                      <select className="form-select">
                        <option>Pizza</option>
                        <option>Burger</option>
                        <option>Drinks</option>
                      </select>
                    </div>
                    <div className="col-md-3">
                      <label className="form-label">Subcategory</label>
                      <select className="form-select">
                        <option>Veg Pizza</option>
                        <option>Non-Veg Pizza</option>
                      </select>
                    </div>
                    <div className="col-md-3">
                      <label className="form-label">Type</label>
                      <select className="form-select">
                        <option>Veg</option>
                        <option>Non-Veg</option>
                      </select>
                    </div>
                    <div className="col-12">
                      <h2 className="fs-5 fw-bold">Create Attribute</h2>
                      <div className="mt-3">
                        <div className="row g-3">
                          <div className="col-md-3">
                            <label className="form-label">Attribute </label>
                            <select className="form-select">
                              <option value className>
                                select Attribute
                              </option>
                            </select>
                          </div>
                          <div className="col-md-3">
                            <label className="form-label">Value</label>
                            <select className="form-select">
                              <option value className>
                                select Value
                              </option>
                            </select>
                          </div>
                          <div className="col-md-2 pt-4">
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                setShow(!show);
                              }}
                              className="comman-btn-main w-100 fs-6 mt-1"
                            >
                              Show Combination
                            </button>
                          </div>
                          {show ? (
                            <div className="col-12">
                              <div className="card shadow">
                                <div className="card-header">
                                  <h3 className="fw-semibold fs-5">
                                    Attribute
                                  </h3>
                                </div>
                                <div className="card-body">
                                  <div className="table-responsive shadow-sm rounded bg-white p-3">
                                    <table className="table table-hover align-middle">
                                      <thead className="table-light">
                                        <tr>
                                          <th>#</th>
                                          <th>Attribute Name</th>
                                          <th>Combination</th>
                                          <th>Price</th>
                                          <th>Discounted Price</th>
                                          <th>Stock</th>
                                          <th>Status</th>
                                          <th className="text-center">
                                            Actions
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {/* Example Product */}
                                        <tr>
                                          <td>1</td>
                                          <td>Cheese Pizza</td>
                                          <td>
                                            <div className="badge bg-main">
                                              XL , Capsicum Pizza
                                            </div>
                                          </td>
                                          <td>
                                            <input
                                              type="text"
                                              className="form-control small-width"
                                            />
                                          </td>
                                          <td>
                                            <input
                                              type="text"
                                              className="form-control small-width"
                                            />
                                          </td>
                                          <td>
                                            <input
                                              type="text"
                                              className="form-control small-width"
                                            />
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
                                            <button className="table-btn bg-danger">
                                              <i className="fa fa-trash" />
                                            </button>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>2</td>
                                          <td>Cheese Pizza</td>
                                          <td>
                                            <div className="badge bg-main">
                                              L , Capsicum Pizza
                                            </div>
                                          </td>
                                          <td>
                                            <input
                                              type="text"
                                              className="form-control small-width"
                                            />
                                          </td>
                                          <td>
                                            <input
                                              type="text"
                                              className="form-control small-width"
                                            />
                                          </td>
                                          <td>
                                            <input
                                              type="text"
                                              className="form-control small-width"
                                            />
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
                                            <button className="table-btn bg-danger">
                                              <i className="fa fa-trash" />
                                            </button>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>3</td>
                                          <td>Cheese Pizza</td>
                                          <td>
                                            <div className="badge bg-main">
                                              S , Capsicum Pizza
                                            </div>
                                          </td>
                                          <td>
                                            <input
                                              type="text"
                                              className="form-control small-width"
                                            />
                                          </td>
                                          <td>
                                            <input
                                              type="text"
                                              className="form-control small-width"
                                            />
                                          </td>
                                          <td>
                                            <input
                                              type="text"
                                              className="form-control small-width"
                                            />
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
                                            <button className="table-btn bg-danger">
                                              <i className="fa fa-trash" />
                                            </button>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-12 mt-4">
                      <button className="comman-btn-main">Update</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default React.memo(EditProduct);
