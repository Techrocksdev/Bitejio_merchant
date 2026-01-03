import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { showGlobalAlert } from "../commonComponents/useGlobalAlert";
import {
  addDeliveryBoy,
  editDeliveryBoy,
} from "../apiServices/home/homeHttpService";
import { RotatingLines } from "react-loader-spinner";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

// eslint-disable-next-line no-unused-vars
function AddDeliBoy({ details, setDetails, refetch, setCurrentPage }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    mode: "onChange",
  });

  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (details?.firstName) {
      setValue("firstName", details?.firstName);
      setValue("lastName", details?.lastName);
      setValue("address", details?.address);
      setValue("email", details?.email);
      if (details?.phoneNumber) {
        const phoneNumber = details?.phoneNumber.replace(/^\+/, "");
        const countryCode = `${details?.countryCode}`;

        setValue("phoneNumber", {
          phoneNumber: phoneNumber,
          countryCode: countryCode,
        });
      }
      setValue("status", details?.status);
    } else {
      reset();
    }
  }, [details]);

  const onSubmit = async (data) => {
    setLoader(true);
    data.countryCode = data.phoneNumber.countryCode;
    data.phoneNumber = data.phoneNumber.phoneNumber;
    details?.firstName ? (data.userId = details._id) : "";

    try {
      const response = details?.firstName
        ? await editDeliveryBoy(data)
        : await addDeliveryBoy(data);
      if (!response.error) {
        showGlobalAlert(response.message, "success");
        setCurrentPage(1);
        await refetch();
        document.getElementById("closeAddMerchantModal").click();
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
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title text-main fw-bold">
            {details?.firstName ? "Edit" : "Add"} Delivery Boy
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            id="closeAddMerchantModal"
            onClick={() => {
              reset();
              setDetails({});
            }}
          />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="modal-body row g-3">
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                First Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className={`form-control ${
                  errors.firstName ? "input-error" : ""
                }`}
                placeholder="Enter first name"
                {...register("firstName", {
                  required: "First name is required",
                  minLength: {
                    value: 2,
                    message: "First name must be at least 2 characters",
                  },
                  maxLength: {
                    value: 50,
                    message: "First name must be less than 50 characters",
                  },
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "First name can only contain letters and spaces",
                  },
                })}
              />
              {errors.firstName && (
                <p className="form-error">{errors.firstName.message}</p>
              )}
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Last Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className={`form-control ${
                  errors.lastName ? "input-error" : ""
                }`}
                placeholder="Enter last name"
                {...register("lastName", {
                  required: "Last name is required",
                  minLength: {
                    value: 2,
                    message: "Last name must be at least 2 characters",
                  },
                  maxLength: {
                    value: 50,
                    message: "Last name must be less than 50 characters",
                  },
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Last name can only contain letters and spaces",
                  },
                })}
              />
              {errors.lastName && (
                <p className="form-error">{errors.lastName.message}</p>
              )}
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Email <span className="text-danger">*</span>
              </label>
              <input
                type="email"
                className={`form-control ${errors.email ? "input-error" : ""}`}
                placeholder="Enter email address"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                readOnly={details?.firstName ? true : false}
              />
              {errors.email && (
                <p className="form-error">{errors.email.message}</p>
              )}
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Phone Number <span className="text-danger">*</span>
              </label>
              <Controller
                className={`form-control ${
                  errors.phoneNumber ? "input-error" : ""
                }`}
                name="phoneNumber"
                control={control}
                rules={{ required: "Phone number is required" }}
                render={({ field }) => (
                  <PhoneInput
                    country={"in"}
                    inputClass={`form-control ${
                      errors.phoneNumber ? "input-error" : ""
                    }`}
                    inputStyle={{
                      padding: "unset",
                      paddingLeft: "48px",
                    }}
                    value={
                      field?.value?.phoneNumber
                        ? `${field?.value?.countryCode}${field?.value?.phoneNumber}`
                        : ""
                    }
                    onChange={(value, countryData) => {
                      const phoneNumberWithoutCountry = value.slice(
                        countryData.dialCode.length
                      );

                      field.onChange({
                        phoneNumber: phoneNumberWithoutCountry,
                        countryCode: `+${countryData.dialCode}`,
                      });
                    }}
                  />
                )}
              />
              {errors.phoneNumber && (
                <p className="form-error">{errors.phoneNumber.message}</p>
              )}
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Address <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className={`form-control ${
                  errors.address ? "input-error" : ""
                }`}
                placeholder="Enter address"
                {...register("address", {
                  required: "Address is required",
                })}
              />
              {errors.address && (
                <p className="form-error">{errors.address.message}</p>
              )}
            </div>
            <div className="col-md-6 d-flex align-items-center">
              <label className="form-label fw-semibold me-3">Status</label>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  defaultChecked={details?.firstName ? "" : true}
                  {...register("status")}
                />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="submit"
              className="btn comman-btn-main"
              disabled={loader}
            >
              {loader ? (
                <>
                  <span className="me-2">Saving...</span>
                  <RotatingLines
                    strokeColor="white"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="20"
                    visible={true}
                  />
                </>
              ) : details?.firstName ? (
                "Edit"
              ) : (
                "Save"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default React.memo(AddDeliBoy);
