import axios from "axios";

const api = axios.create();

api.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token-bit-admin");
    if (token) {
      req.headers["x-auth-token-user"] = token;
    }

    req.headers["x-auth-user-type"] = "Admin";

    return req;
  },
  (error) => Promise.reject(error)
);

const errorCallBack = (error) => {
  const isExpectedError =
    error.response?.status >= 400 && error.response?.status < 500;

  if (!isExpectedError) {
    console.error("Unexpected error:", error);
  }

  if (error.response?.status === 401) {
    localStorage.removeItem("token-bit-admin");
    window.location.href = "/login";
  }

  return Promise.reject(error);
};

api.interceptors.response.use((response) => response, errorCallBack);

export default {
  get: api.get,
  post: api.post,
  put: api.put,
  delete: api.delete,
  patch: api.patch,
};
