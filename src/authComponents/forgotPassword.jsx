import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import { forgotPassword } from "../apiServices/home/homeHttpService";
import { showGlobalAlert } from "../commonComponents/useGlobalAlert";

function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoader(true);
    try {
      const response = await forgotPassword(data);

      if (!response.error) {
        navigate(`/verification?email=${btoa(data.email)}`);
        showGlobalAlert(`Your OTP is: ${response.results.otp}`, "success");
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
      <div className="d-flex align-items-center justify-content-center vh-100">
        <div className="card shadow p-4 border-0 login-card">
          <h3 className="text-center mb-3 text-main fw-bold">
            Forgot Password
          </h3>
          <p className="text-center text mb-4">
            Enter your email and we'll send you OTP.
          </p>
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
                "Send OTP"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default React.memo(ForgotPassword);
