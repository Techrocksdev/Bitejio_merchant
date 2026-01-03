import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import SideBar from "../commonComponents/sideBar";
import Header from "../commonComponents/header";
import { useUserAuth } from "../commonComponents/authContext";
import { useQuery } from "@tanstack/react-query";
import {
  createCombinations,
  getAttributes,
  getCategory,
  getValues,
  updateProduct,
  viewProduct,
} from "../apiServices/home/homeHttpService";
import { useForm, Controller } from "react-hook-form";
import { showGlobalAlert } from "../commonComponents/useGlobalAlert";
import Select from "react-select";
import { RotatingLines } from "react-loader-spinner";
import Compressor from "compressorjs";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

function AddProduct() {
  const { isSidebarHidden } = useUserAuth();
  const [loader, setLoader] = useState(false);
  const [combination, setCombination] = useState(false);
  const [files, setFiles] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  let { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
    setValue,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      categoryId: "",
      subCategoryId: "",
    },
  });

  const { data: results } = useQuery({
    queryKey: ["proDetails", id],
    queryFn: () => viewProduct(id),
    onError: (error) => {
      console.log(error);
    },
    select: (data) => data.results.product[0],
  });

  // useEffect(() => {
  //   setValue("subCategoryId", "");
  // }, [watch("categoryId")]);
  // useEffect(() => {
  //   setValue("valueId", "");
  //   setCombination([]);
  // }, [watch("attributeId")]);
  // useEffect(() => {
  //   setCombination([]);
  // }, [watch("valueId")]);

  const { data: response } = useQuery({
    queryKey: ["categoryList"],
    queryFn: async () => {
      const formData = {
        page: 1,
        pageSize: 1000,
        categoryId: "",
        allSubcategory: false,
        search: "",
      };
      return getCategory(formData);
    },

    onError: (error) => {
      console.log(error);
    },
  });

  const catList = response?.results?.categories || [];

  const { data: response2 } = useQuery({
    queryKey: ["subCategoryList", watch("categoryId")],
    queryFn: async () => {
      const formData = {
        page: 1,
        pageSize: 1000,
        categoryId: watch("categoryId"),
        allSubcategory: true,
        search: "",
      };
      return getCategory(formData);
    },
    enabled: !!watch("categoryId"),
    onError: (error) => {
      console.log(error);
    },
  });
  const subCatList = response2?.results?.categories || [];

  const { data: response3 } = useQuery({
    queryKey: ["attList"],
    queryFn: async () => {
      const formData = {
        page: 1,
        pageSize: 1000,
        search: "",
      };
      return getAttributes(formData);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const attist = response3?.results?.attributes || [];

  const { data: response4 } = useQuery({
    queryKey: ["valueList", watch("attributeId")],
    queryFn: async () => {
      const formData = {
        page: 1,
        pageSize: 1000,
        attributeIds: watch("attributeId"),
        search: "",
      };
      return getValues(formData);
    },
    enabled: !!watch("attributeId"),
    onError: (error) => {
      console.log(error);
    },
  });
  const valueList = response4?.results?.values || [];

  const initialCategoryIdRef = useRef(null);

  useEffect(() => {
    if (results?.images && results.images.length > 0) {
      setExistingImages(results.images);
    }
  }, [results]);

  useEffect(() => {
    if (results?.name_en && catList?.length > 0) {
      setValue("name_en", results?.name_en);
      setValue("type", results?.type);
      setValue("calories", results?.calories);
      setValue("description_en", results?.description_en);
      setValue("categoryId", results?.categoryId?._id);

      if (initialCategoryIdRef.current === null) {
        initialCategoryIdRef.current = results?.categoryId?._id;
      }

      if (subCatList?.length > 0) {
        setValue("subCategoryId", results?.subCategoryId?._id);
      }
    }
  }, [results, catList, subCatList, setValue]);

  useEffect(() => {
    const currentCategory = watch("categoryId");

    if (
      initialCategoryIdRef.current !== null &&
      currentCategory !== initialCategoryIdRef.current
    ) {
      setValue("subCategoryId", "");
    }
  }, [watch("categoryId"), setValue]);
  useEffect(() => {
    if (results?.name_en && results?.variants?.length && attist?.length) {
      const attributeIds = results.variants
        .flatMap((variant) =>
          variant.combination?.map((comb) => comb.attributeId?._id)
        )
        .filter((id) => id && id !== undefined)
        .filter((id, index, self) => self.indexOf(id) === index);

      if (attributeIds.length > 0) {
        setValue("attributeId", attributeIds);
      }
    }
  }, [results, attist, setValue]);

  useEffect(() => {
    if (
      results?.name_en &&
      results?.variants?.length &&
      watch("attributeId")?.length &&
      valueList?.length
    ) {
      const valueIds = results.variants
        .flatMap((variant) =>
          variant.combination?.map((comb) => comb.valueId?._id)
        )
        .filter((id) => id && id !== undefined)
        .filter((id, index, self) => self.indexOf(id) === index);

      if (valueIds.length > 0) {
        setValue("valueId", valueIds);
      }

      const existingCombinations = results.variants
        .map((variant) => {
          if (!variant.combination?.[0]) return null;

          return {
            attributeId: variant.combination[0].attributeId?._id,
            valueId: variant.combination[0].valueId?._id,
            attributeName: variant.combination[0].attributeId?.name_en,
            valueName: variant.combination[0].valueId?.name_en,
            price: variant.price,
            discountPrice: variant.discountPrice,
            quantity: variant.quantity,
          };
        })
        .filter(Boolean);

      if (existingCombinations.length > 0) {
        setCombination(existingCombinations);
      }
    }
  }, [results, watch("attributeId"), valueList, setValue]);

  const showCombinations = async () => {
    if (!watch("attributeId")?.length && !watch("valueId")?.length) {
      showGlobalAlert("Please select attribute & value", "error");
      return;
    }
    console.log(watch("attributeId"), watch("valueId"));
    const formData = {
      selectedAttributes: watch("attributeId"),
      selectedValues: watch("valueId"),
    };

    try {
      const response = await createCombinations(formData);
      if (!response.error) {
        setCombination(response.results.combinations[0]);
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

  const onSubmit = async (data) => {
    const totalImages = existingImages.length + files.length;

    if (totalImages < 5) {
      showGlobalAlert("Please upload at least 5 images", "error");
      return;
    }

    const invalidVariations = combination.filter(
      (item) => !item.quantity || !item.price || !item.discountPrice
    );

    const invalidDiscount = combination.filter(
      (item) => Number(item.discountPrice) > Number(item.price)
    );

    if (invalidDiscount.length > 0) {
      return;
    }

    if (invalidVariations.length > 0) {
      showGlobalAlert(
        "Please fill all required fields for variations",
        "error"
      );
      return;
    }

    setLoader(true);
    const formData = new FormData();
    formData.append("name_en", data.name_en);
    formData.append("description_en", data.description_en);
    formData.append("categoryId", data.categoryId);
    formData.append("subCategoryId", data.subCategoryId);
    formData.append("calories", data.calories);
    formData.append("type", data.type);

    if (existingImages.length > 0) {
      formData.append("existingImages", JSON.stringify(existingImages));
    }

    files.forEach((file) => {
      formData.append("images", file);
    });

    const variants = combination.map((item) => ({
      quantity: item.quantity || 0,
      price: item.price || 0,
      discountPrice: item.discountPrice || 0,
      combination: [
        {
          attributeId: item.attributeId,
          valueId: item.valueId,
        },
      ],
    }));

    formData.append("variants", JSON.stringify(variants));

    try {
      const response = await updateProduct(id, formData, (progress) => {
        setProgress(Math.round((100 * progress.loaded) / progress.total));
      });
      if (!response.error) {
        showGlobalAlert(response.message, "success");
        navigate("/merchant/products");
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

  const handleImageUpload = (event) => {
    const selectedFiles = Array.from(event.target.files);
    const maxSize = 5 * 1024 * 1024;
    let hasError = false;

    selectedFiles.forEach((file) => {
      if (file.size > maxSize) {
        hasError = true;
        return;
      }

      new Compressor(file, {
        quality: 0.6,
        success(compressedFile) {
          setFiles((prevFiles) => [...prevFiles, compressedFile]);
        },
        // eslint-disable-next-line no-unused-vars
        error(err) {
          showGlobalAlert(`Failed to compress ${file.name}`, "error");
        },
      });
    });

    if (hasError) {
      showGlobalAlert(
        "Some files exceed 5MB limit and were not added",
        "error"
      );
    }

    event.target.value = "";
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
  };

  console.log(combination);

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
                  <h3 className="fw-semibold fs-5"> Add Product</h3>
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
                  <div className="row g-3">
                    <div className="w-100">
                      <div className="upload-img">
                        <input
                          type="file"
                          id="productImage"
                          className="d-none"
                          accept="image/*"
                          multiple
                          onChange={handleImageUpload}
                        />
                        <label
                          htmlFor="productImage"
                          className="upload-content"
                        >
                          <i className="fa fa-cloud-upload" />
                          <p className="mb-0">
                            {" "}
                            Click to upload at least 5 images
                          </p>
                          <small className="text-muted">
                            PNG, JPG, JPEG (Max 5MB)
                          </small>
                        </label>
                      </div>

                      {(existingImages.length > 0 || files.length > 0) && (
                        <div className="row mt-3 g-2">
                          {existingImages.map((imageUrl, index) => (
                            <div
                              key={`existing-${index}`}
                              className="col-3 position-relative img-wrap"
                            >
                              <img
                                src={imageUrl}
                                alt={`Existing ${index + 1}`}
                                className="img-fluid rounded shadow-sm"
                                style={{
                                  width: "100%",
                                  height: "100px",
                                  objectFit: "cover",
                                }}
                              />
                              <i
                                className="fas fa-remove"
                                onClick={() => {
                                  const updatedImages = existingImages.filter(
                                    (_, i) => i !== index
                                  );
                                  setExistingImages(updatedImages);
                                }}
                              ></i>
                            </div>
                          ))}

                          {files.map((file, index) => (
                            <div
                              key={`new-${index}`}
                              className="col-3 position-relative img-wrap"
                            >
                              <img
                                src={URL.createObjectURL(file)}
                                alt={`Preview ${index + 1}`}
                                className="img-fluid rounded shadow-sm"
                                style={{
                                  width: "100%",
                                  height: "100px",
                                  objectFit: "cover",
                                }}
                              />
                              <i
                                className="fas fa-remove"
                                onClick={() => handleRemoveFile(index)}
                              ></i>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="col-md-4">
                      <label className="form-label">Product Name</label>
                      <input
                        type="text"
                        placeholder="Enter product name"
                        className={`form-control ${
                          errors.name_en ? "input-error" : ""
                        }`}
                        {...register("name_en", {
                          required: "Product Name is required",
                        })}
                      />
                      {errors.name_en && (
                        <p className="form-error">{errors.name_en.message}</p>
                      )}
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Category</label>
                      <select
                        className={`form-control form-select ${
                          errors.categoryId ? "input-error" : ""
                        }`}
                        {...register("categoryId", {
                          required: "Category  is required",
                        })}
                      >
                        <option value="" hidden>
                          Select Category
                        </option>
                        {catList?.map((item) => (
                          <option key={item._id} value={item._id}>
                            {item.name_en}
                          </option>
                        ))}
                      </select>
                      {errors.categoryId && (
                        <p className="form-error">
                          {errors.categoryId.message}
                        </p>
                      )}
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Subcategory</label>
                      <select
                        className={`form-control form-select ${
                          errors.subCategoryId ? "input-error" : ""
                        }`}
                        {...register("subCategoryId", {
                          required: "Sub Category  is required",
                        })}
                      >
                        <option hidden value="">
                          Select Sub Category
                        </option>
                        {subCatList?.map((item) => (
                          <option key={item._id} value={item._id}>
                            {item.name_en}
                          </option>
                        ))}
                      </select>
                      {errors.subCategoryId && (
                        <p className="form-error">
                          {errors.subCategoryId.message}
                        </p>
                      )}
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Calories</label>
                      <input
                        type="number"
                        placeholder="Enter calories"
                        className={`form-control ${
                          errors.calories ? "input-error" : ""
                        }`}
                        {...register("calories", {
                          required: false,
                        })}
                      />
                      {errors.calories && (
                        <p className="form-error">{errors.calories.message}</p>
                      )}
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Type</label>
                      <select
                        className={`form-control form-select ${
                          errors.type ? "input-error" : ""
                        }`}
                        {...register("type", {
                          required: "Type is required",
                        })}
                      >
                        <option value="" hidden>
                          Select Type
                        </option>
                        <option value="Veg">Veg</option>
                        <option value="Non Veg">Non-Veg</option>
                      </select>
                      {errors.type && (
                        <p className="form-error">{errors.type.message}</p>
                      )}
                    </div>
                    <div className="col-md-12">
                      <label className="form-label">Description</label>
                      <Controller
                        name="description_en"
                        control={control}
                        rules={{
                          required: "Description is required",
                          validate: (value) => {
                            const text = value?.replace(/<[^>]*>/g, "").trim();
                            return text.length > 0 || "Description is required";
                          },
                        }}
                        render={({ field }) => (
                          <ReactQuill
                            theme="snow"
                            value={field.value || ""}
                            onChange={(content) => {
                              field.onChange(content);
                              if (
                                content.replace(/<[^>]*>/g, "").trim() === ""
                              ) {
                                field.onChange("");
                              }
                            }}
                            onBlur={() => {
                              field.onBlur();
                            }}
                            placeholder="Enter description"
                            className={
                              errors.description_en ? "input-error" : ""
                            }
                            style={{ height: "130px", marginBottom: "65px" }}
                            modules={{
                              toolbar: [
                                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                                [{ font: [] }],
                                [{ size: ["small", false, "large", "huge"] }],
                                ["bold", "italic", "underline", "strike"],
                                [{ color: [] }, { background: [] }],
                                [{ script: "sub" }, { script: "super" }],
                                [{ list: "ordered" }, { list: "bullet" }],
                                [{ indent: "-1" }, { indent: "+1" }],
                                [{ align: [] }],
                                ["blockquote", "code-block"],
                                ["clean"],
                              ],
                            }}
                          />
                        )}
                      />
                      {errors.description_en && (
                        <p className="form-error" style={{ marginTop: "75px" }}>
                          {errors.description_en.message}
                        </p>
                      )}
                    </div>
                    <div className="col-12">
                      <h2 className="fs-5 fw-bold">Create Attribute</h2>
                      <div className="mt-3">
                        <div className="row g-3">
                          <div className="col-md-5 multi">
                            <label className="form-label">Attribute </label>
                            <Controller
                              name="attributeId"
                              control={control}
                              rules={{ required: "Attribute is required" }}
                              render={({ field }) => (
                                <Select
                                  {...field}
                                  isMulti
                                  options={attist?.map((item) => ({
                                    value: item._id,
                                    label: item.name_en,
                                  }))}
                                  placeholder="Select Attribute"
                                  className={
                                    errors.attributeId
                                      ? "react-select-error"
                                      : ""
                                  }
                                  classNamePrefix="react-select"
                                  onChange={(selected) =>
                                    field.onChange(
                                      selected?.map((item) => item.value) || []
                                    )
                                  }
                                  value={
                                    attist
                                      ?.filter((item) =>
                                        field.value?.includes(item._id)
                                      )
                                      .map((item) => ({
                                        value: item._id,
                                        label: item.name_en,
                                      })) || []
                                  }
                                />
                              )}
                            />
                            {errors.attributeId && (
                              <p className="form-error">
                                {errors.attributeId.message}
                              </p>
                            )}
                          </div>
                          <div className="col-md-5 multi">
                            <label className="form-label">Value</label>

                            <Controller
                              name="valueId"
                              control={control}
                              rules={{ required: "Value is required" }}
                              render={({ field }) => (
                                <Select
                                  {...field}
                                  isMulti
                                  options={valueList?.map((item) => ({
                                    value: item._id,
                                    label: item.name_en,
                                  }))}
                                  placeholder="Select Value"
                                  className={
                                    errors.valueId ? "react-select-error" : ""
                                  }
                                  classNamePrefix="react-select"
                                  onChange={(selected) =>
                                    field.onChange(
                                      selected?.map((item) => item.value) || []
                                    )
                                  }
                                  value={
                                    valueList
                                      ?.filter((item) =>
                                        field.value?.includes(item._id)
                                      )
                                      .map((item) => ({
                                        value: item._id,
                                        label: item.name_en,
                                      })) || []
                                  }
                                />
                              )}
                            />
                            {errors.valueId && (
                              <p className="form-error">
                                {errors.valueId.message}
                              </p>
                            )}
                          </div>
                          <div className="col-md-auto pt-4">
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                showCombinations();
                              }}
                              className="comman-btn-main w-100 fs-6 mt-1"
                            >
                              Show Combination
                            </button>
                          </div>
                          {combination?.length ? (
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
                                          <th>S.No</th>
                                          <th>Attribute Name</th>
                                          <th>Combination</th>
                                          <th>Price</th>
                                          <th>Discounted Price</th>
                                          <th>Quantity</th>
                                          <th className="text-center">
                                            Actions
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {combination?.map((item, index) => (
                                          <tr key={item._id}>
                                            <td>{index + 1}</td>
                                            <td>{item.attributeName}</td>
                                            <td>
                                              <div className="badge bg-main">
                                                {item.valueName}
                                              </div>
                                            </td>
                                            <td>
                                              <input
                                                type="number"
                                                className="form-control small-width"
                                                value={item.price || ""}
                                                onChange={(e) => {
                                                  const updatedCombinations = [
                                                    ...combination,
                                                  ];
                                                  updatedCombinations[index] = {
                                                    ...updatedCombinations[
                                                      index
                                                    ],
                                                    price: e.target.value,
                                                  };
                                                  setCombination(
                                                    updatedCombinations
                                                  );
                                                }}
                                              />
                                            </td>
                                            <td>
                                              <input
                                                type="number"
                                                className="form-control small-width"
                                                value={item.discountPrice || ""}
                                                onChange={(e) => {
                                                  const updatedCombinations = [
                                                    ...combination,
                                                  ];
                                                  updatedCombinations[index] = {
                                                    ...updatedCombinations[
                                                      index
                                                    ],
                                                    discountPrice:
                                                      e.target.value,
                                                  };
                                                  setCombination(
                                                    updatedCombinations
                                                  );
                                                }}
                                              />
                                              {Number(item.discountPrice) >=
                                                Number(item.price) && (
                                                <p className="form-error">
                                                  Discounted price cannot be
                                                  greater than base price
                                                </p>
                                              )}
                                            </td>
                                            <td>
                                              <input
                                                type="number"
                                                className="form-control small-width"
                                                value={item.quantity || ""}
                                                onChange={(e) => {
                                                  const updatedCombinations = [
                                                    ...combination,
                                                  ];
                                                  updatedCombinations[index] = {
                                                    ...updatedCombinations[
                                                      index
                                                    ],
                                                    quantity: e.target.value,
                                                  };
                                                  setCombination(
                                                    updatedCombinations
                                                  );
                                                }}
                                              />
                                            </td>

                                            <td className="text-center">
                                              <button
                                                className="table-btn bg-danger"
                                                onClick={(e) => {
                                                  e.preventDefault();
                                                  const updatedCombinations =
                                                    combination.filter(
                                                      (_, i) => i !== index
                                                    );
                                                  setCombination(
                                                    updatedCombinations
                                                  );
                                                }}
                                              >
                                                <i className="fa fa-trash" />
                                              </button>
                                            </td>
                                          </tr>
                                        ))}
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
                      <button
                        type="submit"
                        className="btn comman-btn-main"
                        disabled={loader}
                      >
                        {loader ? (
                          <>
                            <RotatingLines
                              strokeColor="white"
                              strokeWidth="5"
                              animationDuration="0.75"
                              width="20"
                              visible={true}
                            />
                            <span className="ms-2"> Wait... {progress}%</span>
                          </>
                        ) : (
                          "Add"
                        )}
                      </button>
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

export default React.memo(AddProduct);
