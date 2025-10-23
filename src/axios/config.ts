import axios, { isAxiosError } from "axios";
import { API_BASE_URL } from "../utils/env-keys";
import { toast } from "react-toastify";
import * as Sentry from "@sentry/react";

export const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (!isAxiosError(error)) {
      Sentry.captureException(error);
      return Promise.reject(error);
    }

    const status = error.response?.status;
    const message = error.response?.data?.message || "Something went wrong.";

    if (status && status >= 400 && status < 500) {
      toast.warning(message);
      return Promise.reject(error);
    }

    toast.error("Internal error. Please try again later.");
    Sentry.captureException(error);

    return Promise.reject(error);
  },
);
