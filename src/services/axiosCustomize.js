import axios from "axios";
import { appLocalStorage } from "../utils/localstorage";
import { useNavigate } from "react-router-dom";

const instance = axios.create({
  // baseURL: "https://192.168.1.4:7290",
  baseURL: "https://localhost:44333",
});

instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const userInfo = appLocalStorage.get("UserInfo");
    let accessToken;
    let userObject;

    if (userInfo) {
      userObject = JSON.parse(userInfo);
      accessToken = userObject.accessToken;
    }

    if (config.url.includes("/api/user/signout")) {
      config.data = userObject;
    }

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

let isRefreshing = false;

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      appLocalStorage.get("UserInfo")
    ) {
      originalRequest._retry = 3;
      const userInfo = appLocalStorage.get("UserInfo");
      let accessToken, refreshToken;
      if (userInfo) {
        const userObject = JSON.parse(userInfo);
        accessToken = userObject.accessToken;
        refreshToken = userObject.refreshToken;
      }
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const response = await instance.post(
            "https://localhost:44333/api/User/refresh",
            {
              accessToken,
              refreshToken,
            }
          );
          isRefreshing = false;
          appLocalStorage.set("UserInfo", JSON.stringify(response.data));
          const newUserInfo = appLocalStorage.get("UserInfo");
          let newAccessToken, newRefreshToken;
          if (newUserInfo) {
            const userObject = JSON.parse(newUserInfo);
            newAccessToken = userObject.accessToken;
            newRefreshToken = userObject.refreshToken;
          }
          originalRequest.headers.accessToken = newAccessToken;
          originalRequest.headers.refreshToken = newRefreshToken;

          return instance(originalRequest);
        } catch (error) {
          isRefreshing = false;
          appLocalStorage.remove("UserInfo");
          const navigate = useNavigate();
          navigate("/login");
        }
      } else {
        await new Promise((resolve) => {
          const interval = setInterval(() => {
            if (!isRefreshing) {
              clearInterval(interval);
              resolve();
            }
          }, 100);
        });
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
