import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import { resetPassword } from "../apiServices/home/homeHttpService";
import { showGlobalAlert } from "../commonComponents/useGlobalAlert";

function ResetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ mode: "onChange" });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const encodedEmail = queryParams.get("email");
  const email = encodedEmail ? atob(encodedEmail) : null;

  // eslint-disable-next-line no-unused-vars
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  // eslint-disable-next-line no-unused-vars
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const onSubmit = async (data) => {
    setLoader(true);
    data.email = email;
    try {
      const response = await resetPassword(data);
      if (!response.error) {
        localStorage.removeItem("token-bit-merchant");
        navigate("/login");
        showGlobalAlert(response.message, "success");
      } else {
        showGlobalAlert(response.message, "error");
      }
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      console.log("An error occurred");
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="card shadow p-4 border-0 login-card">
        <h3 className="text-center mb-3 text-main fw-bold">Reset Password</h3>
        <p className="text-center text mb-4">Enter your new password.</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3 position-relative">
            <label className="form-label">New Password</label>
            <div className="position-relative">
              <input
                type={showPassword ? "text" : "password"}
                className={`form-control pe-5 ${
                  errors.newPassword ? "input-error" : ""
                }`}
                placeholder="Enter your new password"
                {...register("newPassword", {
                  required: "New Password is required",
                  pattern: {
                    value:
                      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]{8,}$/,
                    message:
                      "Password must be 8+ characters with uppercase, number and special character",
                  },
                })}
              />
              {/* <span
                className="position-absolute top-50 end-0 translate-middle-y me-2"
                style={{ cursor: "pointer", zIndex: 10 }}
                onClick={togglePasswordVisibility}
              >
                <img
                  src="/assets/images/icons/eye-slash.svg"
                  alt="Toggle password visibility"
                  width="20"
                />
              </span> */}
            </div>
            {errors.newPassword && (
              <p className="form-error">{errors.newPassword.message}</p>
            )}
          </div>

          <div className="mb-3 position-relative">
            <label className="form-label">Confirm Password</label>
            <div className="position-relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className={`form-control pe-5 ${
                  errors.confirmPassword ? "input-error" : ""
                }`}
                placeholder="Confirm your new password"
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === watch("newPassword") || "Passwords do not match",
                })}
              />
              {/* <span
                className="position-absolute top-50 end-0 translate-middle-y me-2"
                style={{ cursor: "pointer", zIndex: 10 }}
                onClick={toggleConfirmPasswordVisibility}
              >
                <img
                  src="/assets/images/icons/eye-slash.svg"
                  alt="Toggle confirm password visibility"
                  width="20"
                />
              </span> */}
            </div>
            {errors.confirmPassword && (
              <p className="form-error">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="btn w-100 comman-btn-main"
            disabled={loader}
          >
            {loader ? (
              <>
                <span className="me-2">Wait...</span>
                <RotatingLines
                  strokeColor="white"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="20"
                  visible={true}
                />
              </>
            ) : (
              "Update Password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default React.memo(ResetPassword);
