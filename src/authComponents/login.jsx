import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { userLogin } from "../apiServices/home/homeHttpService";
import { showGlobalAlert } from "../commonComponents/useGlobalAlert";
import { RotatingLines } from "react-loader-spinner";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const [showPassword, setShowPassword] = useState(false);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  // const { refetch } = useUserAuth();

  useEffect(() => {
    if (
      localStorage.getItem("token-bit-merchant") &&
      localStorage.getItem("rememberMe-bit-merchant")
    ) {
      navigate("/merchant/dashboard");
    }
  }, [navigate]);

  // eslint-disable-next-line no-unused-vars
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const onSubmit = async (data) => {
    setLoader(true);

    data.fcmToken = localStorage.getItem("fcmTokenBit");
    data.deviceId = localStorage.getItem("uid-bit-merchant");
    data.deviceOS = "web";
    try {
      const response = await userLogin(data);

      if (!response.error) {
        localStorage.setItem("token-bit-merchant", response.results.token);
        showGlobalAlert(response.message, "success");
        navigate("/merchant/dashboard");
        // refetch();
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
    <>
      <div className="overflow-x-hidden d-flex align-items-center justify-content-center vh-100">
        <div className="card shadow p-4 border-0 login-card">
          <div className="login-img">
            <img
              src="/assets/image/project/logo-main.svg"
              className="w-100 h-100 object-fit-contain"
              alt=""
            />
          </div>
          <h3 className="text-center mb-4 text-main fw-bold">Welcome Back</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label className="form-label">Email Address</label>
              <input
                type="text"
                className={`form-control ${errors.email ? "input-error" : ""}`}
                placeholder="Enter your email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value:
                      /^(?!.*\.\.)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Enter a valid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="form-error">{errors.email.message}</p>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                className={`form-control pe-5 ${
                  errors.password ? "input-error" : ""
                }`}
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value:
                      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]{8,}$/,
                    message:
                      "Password must be 8+ characters with uppercase, number and special character",
                  },
                })}
              />
              {/* <img
                      src={
                        showPassword
                          ? "/assets/images/icons/eye-slash.svg"
                          : "/assets/images/icons/eye-slash.svg"
                      }
                      onClick={togglePasswordVisibility}
                      className="position-absolute top-50 end-0 translate-middle-y me-2 cursor-pointer"
                      alt="toggle password"
                    /> */}

              {errors.password && (
                <p className="form-error">{errors.password.message}</p>
              )}
            </div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="rememberMe"
                  onChange={(e) =>
                    localStorage.setItem(
                      "rememberMe-bit-merchant",
                      e.target.checked
                    )
                  }
                />
                <label className="form-check-label text" htmlFor="rememberMe">
                  Remember me
                </label>
              </div>
              <Link to="/forgot-password" className="view-all">
                Forgot Password?
              </Link>
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
                "Login"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default React.memo(Login);
