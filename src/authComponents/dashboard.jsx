import React from "react";
import { Link } from "react-router-dom";
import SideBar from "../commonComponents/sideBar";
import Header from "../commonComponents/header";
import { useUserAuth } from "../commonComponents/authContext";
import { useQuery } from "@tanstack/react-query";
import { getDashboardCounts } from "../apiServices/home/homeHttpService";

function Dashboard() {
  const { isSidebarHidden } = useUserAuth();
  const { data: count } = useQuery({
    queryKey: ["getDashboardCount"],
    queryFn: getDashboardCounts,
    onError: (error) => {
      console.log(error);
    },
    select: (data) => data.results.data,
  });
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
                          <th>#</th>
                          <th>Order ID</th>
                          <th>Customer</th>
                          <th>Merchant</th>
                          <th>Items</th>
                          <th>Total</th>
                          <th>Status</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* 10 Example Orders */}
                        <tr>
                          <td>1</td>
                          <td>#ORD1001</td>
                          <td>Aryan Saini</td>
                          <td>Pizza Hut</td>
                          <td>2x Pizza, 1x Coke</td>
                          <td>₹550</td>
                          <td>
                            <select className="form-select form-select-sm status-dropdown">
                              <option>Pending</option>
                              <option selected>Preparing</option>
                              <option>Out for Delivery</option>
                              <option>Delivered</option>
                              <option>Cancelled</option>
                            </select>
                          </td>
                          <td>09 Sep 2025, 7:45 PM</td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td>#ORD1002</td>
                          <td>Neha Verma</td>
                          <td>KFC</td>
                          <td>1x Zinger Burger, 1x Pepsi</td>
                          <td>₹320</td>
                          <td>
                            <select className="form-select form-select-sm status-dropdown">
                              <option>Pending</option>
                              <option>Preparing</option>
                              <option>Out for Delivery</option>
                              <option selected>Delivered</option>
                              <option>Cancelled</option>
                            </select>
                          </td>
                          <td>09 Sep 2025, 8:10 PM</td>
                        </tr>
                        <tr>
                          <td>3</td>
                          <td>#ORD1003</td>
                          <td>Rohit Mehra</td>
                          <td>Domino's</td>
                          <td>1x Farmhouse Pizza</td>
                          <td>₹450</td>
                          <td>
                            <select className="form-select form-select-sm status-dropdown">
                              <option selected>Pending</option>
                              <option>Preparing</option>
                              <option>Out for Delivery</option>
                              <option>Delivered</option>
                              <option>Cancelled</option>
                            </select>
                          </td>
                          <td>09 Sep 2025, 8:30 PM</td>
                        </tr>
                        <tr>
                          <td>4</td>
                          <td>#ORD1004</td>
                          <td>Simran Kaur</td>
                          <td>McDonald's</td>
                          <td>2x McAloo Tikki, 2x Coke</td>
                          <td>₹280</td>
                          <td>
                            <select className="form-select form-select-sm status-dropdown">
                              <option>Pending</option>
                              <option selected>Preparing</option>
                              <option>Out for Delivery</option>
                              <option>Delivered</option>
                              <option>Cancelled</option>
                            </select>
                          </td>
                          <td>09 Sep 2025, 9:00 PM</td>
                        </tr>
                        <tr>
                          <td>5</td>
                          <td>#ORD1005</td>
                          <td>Aman Gupta</td>
                          <td>Burger King</td>
                          <td>1x Whopper, Fries</td>
                          <td>₹350</td>
                          <td>
                            <select className="form-select form-select-sm status-dropdown">
                              <option>Pending</option>
                              <option>Preparing</option>
                              <option selected>Out for Delivery</option>
                              <option>Delivered</option>
                              <option>Cancelled</option>
                            </select>
                          </td>
                          <td>09 Sep 2025, 9:15 PM</td>
                        </tr>
                        <tr>
                          <td>6</td>
                          <td>#ORD1006</td>
                          <td>Pooja Sharma</td>
                          <td>Subway</td>
                          <td>1x Veggie Delight Sub</td>
                          <td>₹220</td>
                          <td>
                            <select className="form-select form-select-sm status-dropdown">
                              <option>Pending</option>
                              <option selected>Preparing</option>
                              <option>Out for Delivery</option>
                              <option>Delivered</option>
                              <option>Cancelled</option>
                            </select>
                          </td>
                          <td>09 Sep 2025, 9:30 PM</td>
                        </tr>
                        <tr>
                          <td>7</td>
                          <td>#ORD1007</td>
                          <td>Rahul Jain</td>
                          <td>Café Coffee Day</td>
                          <td>2x Cappuccino</td>
                          <td>₹280</td>
                          <td>
                            <select className="form-select form-select-sm status-dropdown">
                              <option>Pending</option>
                              <option>Preparing</option>
                              <option>Out for Delivery</option>
                              <option selected>Delivered</option>
                              <option>Cancelled</option>
                            </select>
                          </td>
                          <td>09 Sep 2025, 9:50 PM</td>
                        </tr>
                        <tr>
                          <td>8</td>
                          <td>#ORD1008</td>
                          <td>Divya Patel</td>
                          <td>Biryani Blues</td>
                          <td>1x Hyderabadi Biryani</td>
                          <td>₹400</td>
                          <td>
                            <select className="form-select form-select-sm status-dropdown">
                              <option selected>Pending</option>
                              <option>Preparing</option>
                              <option>Out for Delivery</option>
                              <option>Delivered</option>
                              <option>Cancelled</option>
                            </select>
                          </td>
                          <td>09 Sep 2025, 10:00 PM</td>
                        </tr>
                        <tr>
                          <td>9</td>
                          <td>#ORD1009</td>
                          <td>Karan Singh</td>
                          <td>Barbeque Nation</td>
                          <td>2x Paneer Tikka</td>
                          <td>₹600</td>
                          <td>
                            <select className="form-select form-select-sm status-dropdown">
                              <option>Pending</option>
                              <option>Preparing</option>
                              <option selected>Out for Delivery</option>
                              <option>Delivered</option>
                              <option>Cancelled</option>
                            </select>
                          </td>
                          <td>09 Sep 2025, 10:20 PM</td>
                        </tr>
                        <tr>
                          <td>10</td>
                          <td>#ORD1010</td>
                          <td>Sneha Kapoor</td>
                          <td>Haldiram's</td>
                          <td>1x Thali, 1x Gulab Jamun</td>
                          <td>₹480</td>
                          <td>
                            <select className="form-select form-select-sm status-dropdown">
                              <option>Pending</option>
                              <option>Preparing</option>
                              <option>Out for Delivery</option>
                              <option selected>Delivered</option>
                              <option>Cancelled</option>
                            </select>
                          </td>
                          <td>09 Sep 2025, 10:45 PM</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default React.memo(Dashboard);
