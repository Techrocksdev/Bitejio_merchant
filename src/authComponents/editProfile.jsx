import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { showGlobalAlert } from "../commonComponents/useGlobalAlert";
import { editUser } from "../apiServices/home/homeHttpService";
import { RotatingLines } from "react-loader-spinner";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useUserAuth } from "../commonComponents/authContext";
import { Link, useNavigate } from "react-router-dom";
import Header from "../commonComponents/header";
import SideBar from "../commonComponents/sideBar";

// eslint-disable-next-line no-unused-vars
function EditMerchant() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    mode: "onChange",
  });

  const [loader, setLoader] = useState(false);
  const { profile, refetch, isSidebarHidden } = useUserAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (profile?.firstName) {
      setValue("firstName", profile?.firstName);
      setValue("lastName", profile?.lastName);
      setValue("userName", profile?.name);
      setValue("shopName", profile?.shopName);
      setValue("address", profile?.address);
      setValue("email", profile?.email);
      if (profile?.phoneNumber) {
        const phoneNumber = profile?.phoneNumber.replace(/^\+/, "");
        const countryCode = `${profile?.countryCode}`;

        setValue("phoneNumber", {
          phoneNumber: phoneNumber,
          countryCode: countryCode,
        });
      }
    }
  }, [profile]);

  const onSubmit = async (data) => {
    setLoader(true);
    data.countryCode = data.phoneNumber.countryCode;
    data.phoneNumber = data.phoneNumber.phoneNumber;

    try {
      const response = await editUser(profile._id, data);

      if (!response.error) {
        showGlobalAlert(response.message, "success");
        await refetch();
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
                  <h3 className="fw-semibold fs-5"> Edit Profile</h3>
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
                            message:
                              "First name must be less than 50 characters",
                          },
                          pattern: {
                            value: /^[A-Za-z\s]+$/,
                            message:
                              "First name can only contain letters and spaces",
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
                            message:
                              "Last name must be less than 50 characters",
                          },
                          pattern: {
                            value: /^[A-Za-z\s]+$/,
                            message:
                              "Last name can only contain letters and spaces",
                          },
                        })}
                      />
                      {errors.lastName && (
                        <p className="form-error">{errors.lastName.message}</p>
                      )}
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        Username <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className={`form-control ${
                          errors.userName ? "input-error" : ""
                        }`}
                        placeholder="Enter username"
                        {...register("userName", {
                          required: "Username is required",
                          minLength: {
                            value: 3,
                            message: "Username must be at least 3 characters",
                          },
                          maxLength: {
                            value: 30,
                            message: "Username must be less than 30 characters",
                          },
                        })}
                      />
                      {errors.userName && (
                        <p className="form-error">{errors.userName.message}</p>
                      )}
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        Email <span className="text-danger">*</span>
                      </label>
                      <input
                        type="email"
                        className={`form-control ${
                          errors.email ? "input-error" : ""
                        }`}
                        placeholder="Enter email address"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address",
                          },
                        })}
                        disabled
                      />
                      {errors.email && (
                        <p className="form-error">{errors.email.message}</p>
                      )}
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        Shop Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className={`form-control ${
                          errors.shopName ? "input-error" : ""
                        }`}
                        placeholder="Enter shop name"
                        {...register("shopName", {
                          required: "Shop name is required",
                          minLength: {
                            value: 2,
                            message: "Shop name must be at least 2 characters",
                          },
                          maxLength: {
                            value: 100,
                            message:
                              "Shop name must be less than 100 characters",
                          },
                        })}
                      />
                      {errors.shopName && (
                        <p className="form-error">{errors.shopName.message}</p>
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
                        <p className="form-error">
                          {errors.phoneNumber.message}
                        </p>
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
                      ) : (
                        "Save"
                      )}
                    </button>
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

export default React.memo(EditMerchant);
