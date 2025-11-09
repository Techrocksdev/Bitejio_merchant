import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import { showGlobalAlert } from "../commonComponents/useGlobalAlert";
import { verifyOTP, forgotPassword } from "../apiServices/home/homeHttpService";
import OTPTimer from "../commonComponents/OTPTimer";
import { useUserAuth } from "../commonComponents/authContext";

function Verification() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const [loader, setLoader] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { refetch } = useUserAuth();

  const queryParams = new URLSearchParams(location.search);
  const encodedEmail = queryParams.get("email");
  const email = encodedEmail ? atob(encodedEmail) : null;

  const onSubmit = async (data) => {
    setLoader(true);
    let otp = Object.values(data);
    otp = otp.join("");

    const formData = {
      email: email,
      otp: otp,
    };

    try {
      const response = await verifyOTP(formData);
      if (!response.error) {
        if (location?.state?.type) {
          localStorage.setItem("token-bit-merchant", response.results.token);
          refetch();
        } else {
          navigate(`/reset-password?email=${btoa(email)}`);
        }
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

  const moveOnMax = (event, field, nextField, preField) => {
    if (event.keyCode !== 9) {
      if (event.key === "ArrowLeft" || event.key === "Backspace") {
        preField?.focus();
      } else {
        if (field?.value?.length >= field.maxLength) {
          nextField?.focus();
        }
      }
    }
  };

  const resend = async () => {
    const formData = {
      email: email,
    };
    try {
      const response = await forgotPassword(formData);
      if (!response.error) {
        showGlobalAlert(`Your OTP is: ${response.results.otp}`, "success");
      } else {
        showGlobalAlert(response.message, "error");
      }
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      console.log("An error occurred");
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="card shadow p-4 border-0 login-card">
        <h3 className="text-center mb-3 text-main fw-bold">Verify OTP</h3>
        <p className="text-center text mb-4">
          Enter the 6-digit OTP sent to your email.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="text-center">
          <div className="d-flex justify-content-center mb-4">
            <input
              type="number"
              maxLength={1}
              className={`form-control text-center mx-1 ${
                errors.otp1 ? "input-error" : ""
              }`}
              style={{ width: "50px", height: "50px" }}
              {...register("otp1", { required: true })}
              onKeyUp={(event) => {
                moveOnMax(
                  event,
                  document.getElementById("otp1"),
                  document.getElementById("otp2")
                );
              }}
              onInput={(e) => {
                if (e.target.value.length > 1)
                  e.target.value = e.target.value.slice(0, 1);
              }}
              id="otp1"
            />
            <input
              type="number"
              maxLength={1}
              className={`form-control text-center mx-1 ${
                errors.otp2 ? "input-error" : ""
              }`}
              style={{ width: "50px", height: "50px" }}
              {...register("otp2", { required: true })}
              onKeyUp={(event) => {
                moveOnMax(
                  event,
                  document.getElementById("otp2"),
                  document.getElementById("otp3"),
                  document.getElementById("otp1")
                );
              }}
              onInput={(e) => {
                if (e.target.value.length > 1)
                  e.target.value = e.target.value.slice(0, 1);
              }}
              id="otp2"
            />
            <input
              type="number"
              maxLength={1}
              className={`form-control text-center mx-1 ${
                errors.otp3 ? "input-error" : ""
              }`}
              style={{ width: "50px", height: "50px" }}
              {...register("otp3", { required: true })}
              onKeyUp={(event) => {
                moveOnMax(
                  event,
                  document.getElementById("otp3"),
                  document.getElementById("otp4"),
                  document.getElementById("otp2")
                );
              }}
              onInput={(e) => {
                if (e.target.value.length > 1)
                  e.target.value = e.target.value.slice(0, 1);
              }}
              id="otp3"
            />
            <input
              type="number"
              maxLength={1}
              className={`form-control text-center mx-1 ${
                errors.otp4 ? "input-error" : ""
              }`}
              style={{ width: "50px", height: "50px" }}
              {...register("otp4", { required: true })}
              onKeyUp={(event) => {
                moveOnMax(
                  event,
                  document.getElementById("otp4"),
                  document.getElementById("otp5"),
                  document.getElementById("otp3")
                );
              }}
              onInput={(e) => {
                if (e.target.value.length > 1)
                  e.target.value = e.target.value.slice(0, 1);
              }}
              id="otp4"
            />
            {/* <input
              type="number"
              maxLength={1}
              className={`form-control text-center mx-1 ${
                errors.otp5 ? "input-error" : ""
              }`}
              style={{ width: "50px", height: "50px" }}
              {...register("otp5", { required: true })}
              onKeyUp={(event) => {
                moveOnMax(
                  event,
                  document.getElementById("otp5"),
                  document.getElementById("otp6"),
                  document.getElementById("otp4")
                );
              }}
              onInput={(e) => {
                if (e.target.value.length > 1)
                  e.target.value = e.target.value.slice(0, 1);
              }}
              id="otp5"
            />
            <input
              type="number"
              maxLength={1}
              className={`form-control text-center mx-1 ${
                errors.otp6 ? "input-error" : ""
              }`}
              style={{ width: "50px", height: "50px" }}
              {...register("otp6", { required: true })}
              onKeyUp={(event) => {
                moveOnMax(
                  event,
                  document.getElementById("otp6"),
                  "",
                  document.getElementById("otp5")
                );
              }}
              onInput={(e) => {
                if (e.target.value.length > 1)
                  e.target.value = e.target.value.slice(0, 1);
              }}
              id="otp6"
            /> */}
          </div>

          <div className="mt-3 mb-3 text">
            <OTPTimer
              seconds={30}
              onResendClick={resend}
              resendButtonText="Resend OTP"
              text="Time Left: "
              style={{ fontSize: "14px", textAlign: "center" }}
            />
          </div>

          <button
            type="submit"
            className="btn w-100 comman-btn-main "
            disabled={loader}
          >
            {loader ? (
              <>
                <span className="me-2">Verifying...</span>
                <RotatingLines
                  strokeColor="white"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="20"
                  visible={true}
                />
              </>
            ) : (
              "Verify OTP"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default React.memo(Verification);
