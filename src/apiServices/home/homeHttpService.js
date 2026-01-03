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
export async function getCategory(formData) {
  try {
    const { data } = await webHttpService.patch(
      `${import.meta.env.VITE_APIENDPOINT}/products/getCategory`,
      formData
    );
    console.log(data);

    return data;
  } catch (error) {
    showGlobalAlert(error.message, "error");
  }
}
export async function addProduct(formData) {
  try {
    const { data } = await webHttpService.post(
      `${import.meta.env.VITE_APIENDPOINT}/products/addProduct`,
      formData
    );
    console.log(data);

    return data;
  } catch (error) {
    showGlobalAlert(error.message, "error");
  }
}
export async function editUser(id, formData) {
  try {
    const { data } = await webHttpService.put(
      `${import.meta.env.VITE_APIENDPOINT}/user/editUser/${id}`,
      formData
    );
    console.log(data);

    return data;
  } catch (error) {
    showGlobalAlert(error.message, "error");
  }
}
export async function getValues(formData) {
  try {
    const { data } = await webHttpService.patch(
      `${import.meta.env.VITE_APIENDPOINT}/products/getValues`,
      formData
    );
    console.log(data);

    return data;
  } catch (error) {
    showGlobalAlert(error.message, "error");
  }
}
export async function getAttributes(formData) {
  try {
    const { data } = await webHttpService.patch(
      `${import.meta.env.VITE_APIENDPOINT}/products/getAttributes`,
      formData
    );
    console.log(data);

    return data;
  } catch (error) {
    showGlobalAlert(error.message, "error");
  }
}

export async function createCombinations(formData) {
  try {
    const { data } = await webHttpService.post(
      `${import.meta.env.VITE_APIENDPOINT}/products/createCombinations`,
      formData
    );
    console.log(data);

    return data;
  } catch (error) {
    showGlobalAlert(error.message, "error");
  }
}

export async function getProduct(formData) {
  try {
    const { data } = await webHttpService.post(
      `${import.meta.env.VITE_APIENDPOINT}/products/getProduct`,
      formData
    );
    console.log(data);

    return data;
  } catch (error) {
    showGlobalAlert(error.message, "error");
  }
}

export async function updateProductStatus(id) {
  try {
    const { data } = await webHttpService.get(
      `${import.meta.env.VITE_APIENDPOINT}/products/updateProductStatus/${id}`
    );
    console.log(data);

    return data;
  } catch (error) {
    showGlobalAlert(error.message, "error");
  }
}

export async function updateProduct(id, formData) {
  try {
    const { data } = await webHttpService.put(
      `${import.meta.env.VITE_APIENDPOINT}/products/updateProduct/${id}`,
      formData
    );
    console.log(data);

    return data;
  } catch (error) {
    showGlobalAlert(error.message, "error");
  }
}

export async function deleteProduct(id) {
  try {
    const { data } = await webHttpService.delete(
      `${import.meta.env.VITE_APIENDPOINT}/products/deleteProduct/${id}`
    );
    console.log(data);

    return data;
  } catch (error) {
    showGlobalAlert(error.message, "error");
  }
}
export async function viewProduct(id) {
  try {
    const { data } = await webHttpService.get(
      `${import.meta.env.VITE_APIENDPOINT}/products/viewProduct/${id}`
    );
    console.log(data);

    return data;
  } catch (error) {
    showGlobalAlert(error.message, "error");
  }
}
export async function getDashboardCounts() {
  try {
    const { data } = await webHttpService.get(
      `${import.meta.env.VITE_APIENDPOINT}/analytics/getDashboardCounts`
    );
    console.log(data);

    return data;
  } catch (error) {
    showGlobalAlert(error.message, "error");
  }
}
export async function getOrders(formData) {
  try {
    const { data } = await webHttpService.patch(
      `${import.meta.env.VITE_APIENDPOINT}/products/getOrders`,
      formData
    );
    console.log(data);

    return data;
  } catch (error) {
    showGlobalAlert(error.message, "error");
  }
}
export async function changeOrderStatus(formData) {
  try {
    const { data } = await webHttpService.patch(
      `${import.meta.env.VITE_APIENDPOINT}/products/changeOrderStatus`,
      formData
    );
    console.log(data);

    return data;
  } catch (error) {
    showGlobalAlert(error.message, "error");
  }
}

export async function addDeliveryBoy(formData) {
  try {
    const { data } = await webHttpService.post(
      `${import.meta.env.VITE_APIENDPOINT}/user/addDeliveryBoy`,
      formData
    );
    console.log(data);

    return data;
  } catch (error) {
    showGlobalAlert(error.message, "error");
  }
}

export async function getMyDeliveryBoys(formData) {
  try {
    const { data } = await webHttpService.patch(
      `${import.meta.env.VITE_APIENDPOINT}/user/getMyDeliveryBoys`,
      formData
    );
    console.log(data);

    return data;
  } catch (error) {
    showGlobalAlert(error.message, "error");
  }
}

export async function editDeliveryBoy(formData) {
  try {
    const { data } = await webHttpService.put(
      `${import.meta.env.VITE_APIENDPOINT}/user/editDeliveryBoy`,
      formData
    );
    console.log(data);

    return data;
  } catch (error) {
    showGlobalAlert(error.message, "error");
  }
}

export async function updateDeliveryBoyStatus(id) {
  try {
    const { data } = await webHttpService.get(
      `${import.meta.env.VITE_APIENDPOINT}/user/updateDeliveryBoyStatus/${id}`
    );
    console.log(data);

    return data;
  } catch (error) {
    showGlobalAlert(error.message, "error");
  }
}

export async function deleteDeliveryBoy(id) {
  try {
    const { data } = await webHttpService.delete(
      `${import.meta.env.VITE_APIENDPOINT}/user/deleteDeliveryBoy/${id}`
    );
    console.log(data);

    return data;
  } catch (error) {
    showGlobalAlert(error.message, "error");
  }
}
export async function assignDeliveryBoy(formData) {
  try {
    const { data } = await webHttpService.patch(
      `${import.meta.env.VITE_APIENDPOINT}/products/assignDeliveryBoy`,
      formData
    );
    console.log(data);

    return data;
  } catch (error) {
    showGlobalAlert(error.message, "error");
  }
}
