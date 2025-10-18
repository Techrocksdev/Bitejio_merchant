/* eslint-disable no-undef */

import { showGlobalAlert } from "../../commonComponents/useGlobalAlert";
import webHttpService from "../webHttpService";

export async function userLogin(formData) {
  try {
    const { data } = await webHttpService.post(
      `${import.meta.env.VITE_APIENDPOINT}/auth/login`,
      formData
    );
    console.log(data);

    return data;
  } catch (error) {
    showGlobalAlert(error.message, "error");
  }
}

export async function forgotPassword(formData) {
  try {
    const { data } = await webHttpService.post(
      `${import.meta.env.VITE_APIENDPOINT}/auth/forgetPassword`,
      formData
    );
    console.log(data);

    return data;
  } catch (error) {
    showGlobalAlert(error.message, "error");
  }
}

export async function verifyOTP(formData) {
  try {
    const { data } = await webHttpService.post(
      `${import.meta.env.VITE_APIENDPOINT}/auth/verifyOtp`,
      formData
    );
    console.log(data);

    return data;
  } catch (error) {
    showGlobalAlert(error.message, "error");
  }
}

export async function resetPassword(formData) {
  try {
    const { data } = await webHttpService.post(
      `${import.meta.env.VITE_APIENDPOINT}/auth/resetPassword`,
      formData
    );
    console.log(data);

    return data;
  } catch (error) {
    showGlobalAlert(error.message, "error");
  }
}

export async function addMerchant(formData) {
  try {
    const { data } = await webHttpService.post(
      `${import.meta.env.VITE_APIENDPOINT}/user/addMerchant`,
      formData
    );
    console.log(data);

    return data;
  } catch (error) {
    showGlobalAlert(error.message, "error");
  }
}

export async function changePassword(formData) {
  try {
    const { data } = await webHttpService.post(
      `${import.meta.env.VITE_APIENDPOINT}/user/changePassword`,
      formData
    );
    console.log(data);

    return data;
  } catch (error) {
    showGlobalAlert(error.message, "error");
  }
}

export async function editUserProfile(formData) {
  try {
    const { data } = await webHttpService.post(
      `${import.meta.env.VITE_APIENDPOINT}/user/editUserProfile`,
      formData
    );
    console.log(data);

    return data;
  } catch (error) {
    showGlobalAlert(error.message, "error");
  }
}

export async function getMyProfile() {
  try {
    const { data } = await webHttpService.get(
      `${import.meta.env.VITE_APIENDPOINT}/user/getMyProfile`
    );
    console.log(data);

    return data;
  } catch (error) {
    showGlobalAlert(error.message, "error");
  }
}

export async function getDashboardCounts() {
  try {
    const { data } = await webHttpService.post(
      `${import.meta.env.VITE_APIENDPOINT}/analytics/getDashboardCounts`
    );
    console.log(data);

    return data;
  } catch (error) {
    showGlobalAlert(error.message, "error");
  }
}

export async function getContent(formData) {
  try {
    const { data } = await webHttpService.post(
      `${import.meta.env.VITE_APIENDPOINT}/content/getContent`,
      formData
    );
    console.log(data);

    return data;
  } catch (error) {
    showGlobalAlert(error.message, "error");
  }
}

export async function addCategory(formData) {
  try {
    const { data } = await webHttpService.post(
      `${import.meta.env.VITE_APIENDPOINT}/products/addCategory`,
      formData
    );
    console.log(data);

    return data;
  } catch (error) {
    showGlobalAlert(error.message, "error");
  }
}

export async function getCategory(formData) {
  try {
    const { data } = await webHttpService.post(
      `${import.meta.env.VITE_APIENDPOINT}/products/getCategory`,
      formData
    );
    console.log(data);

    return data;
  } catch (error) {
    showGlobalAlert(error.message, "error");
  }
}

export async function updateCategoryStatus(id) {
  try {
    const { data } = await webHttpService.get(
      `${import.meta.env.VITE_APIENDPOINT}/products/updateCategoryStatus/${id}`
    );
    console.log(data);

    return data;
  } catch (error) {
    showGlobalAlert(error.message, "error");
  }
}

export async function viewCategory(id) {
  try {
    const { data } = await webHttpService.get(
      `${import.meta.env.VITE_APIENDPOINT}/products/viewCategory/${id}`
    );
    console.log(data);

    return data;
  } catch (error) {
    showGlobalAlert(error.message, "error");
  }
}

export async function updateCategory(formData, id) {
  try {
    const { data } = await webHttpService.post(
      `${import.meta.env.VITE_APIENDPOINT}/products/updateCategory/${id}`,
      formData
    );
    console.log(data);

    return data;
  } catch (error) {
    showGlobalAlert(error.message, "error");
  }
}
