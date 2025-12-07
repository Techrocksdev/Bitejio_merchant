import React, { Suspense, lazy, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { AuthProvider } from "./commonComponents/authContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ScrollToTop from "./commonComponents/scrollToTop";
import ProtectedRoute from "./commonComponents/protectedRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetails = lazy(() => import("./authComponents/productDetails"));
const EditProduct = lazy(() => import("./authComponents/editProduct"));
const AddProduct = lazy(() => import("./authComponents/addProduct"));
const Products = lazy(() => import("./authComponents/products"));
const Login = lazy(() => import("./authComponents/login"));
const ForgotPassword = lazy(() => import("./authComponents/forgotPassword"));
const Verification = lazy(() => import("./authComponents/verification"));
const ResetPassword = lazy(() => import("./authComponents/resetPassword"));
const Dashboard = lazy(() => import("./authComponents/dashboard"));
const Orders = lazy(() => import("./authComponents/orders"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      cacheTime: 10 * 60 * 1000,
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      refetchOnReconnect: true,
      retry: 2,
    },
  },
});

const LoadingFallback = () => (
  <div className="d-flex justify-content-center align-items-center vh-100">
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

const OfflineScreen = () => (
  <div className="offline-container pb-5">
    <img
      src="/assets/image/project/internet.gif"
      alt="No Internet Connection"
      className="offline-image"
      loading="lazy"
    />
    <h1 className="offline-title">You are offline!</h1>
    <p className="offline-message text-center">
      It seems that your internet connection is lost. <br />
      Please check your connection and try reloading the page.
    </p>
    <button
      className="comman-btn-main mt-3"
      onClick={() => window.location.reload()}
    >
      Retry
    </button>
  </div>
);

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    if (!localStorage.getItem("uid-bit-merchant")) {
      localStorage.setItem("uid-bit-merchant", uuidv4());
    }

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!isOnline) {
    return <OfflineScreen />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <ToastContainer />
          <Suspense fallback={<LoadingFallback />}>
            <ScrollToTop />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/verification" element={<Verification />} />
              <Route path="/reset-password" element={<ResetPassword />} />

              <Route element={<ProtectedRoute />}>
                <Route path="/merchant/dashboard" element={<Dashboard />} />
                <Route path="/merchant/products" element={<Products />} />
                <Route path="/merchant/add-product" element={<AddProduct />} />
                <Route
                  path="/merchant/edit-product"
                  element={<EditProduct />}
                />
                <Route
                  path="/merchant/product-details/:id"
                  element={<ProductDetails />}
                />
                <Route path="/merchant/orders" element={<Orders />} />
              </Route>

              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </Suspense>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
