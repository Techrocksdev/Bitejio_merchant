import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import SideBar from "../commonComponents/sideBar";
import Header from "../commonComponents/header";
import { useUserAuth } from "../commonComponents/authContext";
import { useQuery } from "@tanstack/react-query";
import { viewProduct } from "../apiServices/home/homeHttpService";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function ProductDetails() {
  const { isSidebarHidden } = useUserAuth();
  let { id } = useParams();
  const navigate = useNavigate();

  const { data: results, isLoading } = useQuery({
    queryKey: ["proDetails", id],
    queryFn: () => viewProduct(id),
    onError: (error) => {
      console.log(error);
    },
    select: (data) => data.results.product[0],
  });

  const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} custom-arrow custom-next-arrow`}
        style={{ ...style }}
        onClick={onClick}
      >
        <i className="fa fa-chevron-right"></i>
      </div>
    );
  };

  const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} custom-arrow custom-prev-arrow`}
        style={{ ...style }}
        onClick={onClick}
      >
        <i className="fa fa-chevron-left"></i>
      </div>
    );
  };

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: Math.min(3, results?.images?.length || 1),
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(2, results?.images?.length || 1),
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
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
                  <h3 className="fw-semibold fs-5">Products Details</h3>
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
                <div className="row">
                  <div className="col-md-12 mb-3">
                    {results?.images && results.images.length > 0 ? (
                      <div className="slider-container">
                        <Slider {...sliderSettings}>
                          {results.images.map((item, index) => (
                            <div key={index} className="px-2">
                              <img
                                src={item}
                                alt={`Product ${index + 1}`}
                                className="img-fluid rounded"
                                style={{
                                  height: "300px",
                                  width: "100%",
                                  objectFit: "cover",
                                }}
                              />
                            </div>
                          ))}
                        </Slider>
                      </div>
                    ) : isLoading ? (
                      <Skeleton height={300} />
                    ) : (
                      <div className="text-center p-4 border rounded">
                        <p className="text-muted">No images available</p>
                      </div>
                    )}
                  </div>
                  <div className="col-md-12 my-2">
                    <div className="row g-3">
                      <div className="col-md-3">
                        <h2 className="fs-5 fw-semibold m-0">Products Name</h2>
                        <p className="fs-6 fw-normal text-main m-0">
                          {results?.name_en || <Skeleton />}
                        </p>
                      </div>
                      <div className="col-md-3">
                        <h2 className="fs-5 fw-semibold m-0">Category</h2>
                        <p className="fs-6 fw-normal text-main m-0">
                          {results?.categoryId?.name_en || <Skeleton />}
                        </p>
                      </div>
                      <div className="col-md-3">
                        <h2 className="fs-5 fw-semibold m-0">Sub Category</h2>
                        <p className="fs-6 fw-normal text-main m-0">
                          {results?.subCategoryId?.name_en || <Skeleton />}
                        </p>
                      </div>
                      <div className="col-md-3">
                        <h2 className="fs-5 fw-semibold m-0">Type</h2>
                        <p className="fs-6 fw-normal text-main m-0"></p>
                        {results?.type ? (
                          <div
                            className={
                              results?.type === "Veg"
                                ? "badge bg-success"
                                : "badge bg-danger"
                            }
                          >
                            {results?.type}
                          </div>
                        ) : (
                          <Skeleton />
                        )}
                        <p />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row ">
                  <div className="col-12">
                    <div className="card shadow">
                      <div className="card-header">
                        <h3 className="fw-semibold fs-5">Attribute</h3>
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
                              </tr>
                            </thead>
                            <tbody>
                              {isLoading
                                ? [...Array(5)].map((_, index) => (
                                    <tr key={index}>
                                      <td>
                                        <Skeleton />
                                      </td>
                                      <td>
                                        <Skeleton />
                                      </td>
                                      <td>
                                        <Skeleton />
                                      </td>
                                      <td>
                                        <Skeleton />
                                      </td>
                                      <td>
                                        <Skeleton />
                                      </td>
                                      <td>
                                        <Skeleton />
                                      </td>
                                    </tr>
                                  ))
                                : results?.variants?.map((item, index) => (
                                    <tr key={item._id}>
                                      <td>{index + 1}</td>
                                      <td>
                                        {
                                          item.combination?.[0]?.attributeId
                                            ?.name_en
                                        }
                                      </td>
                                      <td>
                                        <div className="badge bg-main">
                                          {
                                            item.combination?.[0]?.valueId
                                              ?.name_en
                                          }
                                        </div>
                                      </td>
                                      <td>{item.price}</td>
                                      <td>{item.discountPrice}</td>
                                      <td>{item.quantity}</td>
                                    </tr>
                                  ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
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

export default React.memo(ProductDetails);
