import axios from "axios";
import Config from "react-native-config";
import { getAsyncStorage } from "../../utils/asyncStorage";

axios.defaults.baseURL = Config.BASE_URL;
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common.Accept = "application/json";
axios.defaults.timeout = 15000;

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.log("interceptor response error", error.response.data);
    return Promise.reject(error);
  }
);

axios.interceptors.request.use(
  function (response) {
    // console.log("interceptor response", response);
    return response;
  },
  function (error) {
    console.log("interceptor request error", error.response.data);
    return Promise.reject(error);
  }
);

const AxiosService = function async() {
  let Authorization = null;

  async function addHeaders(userConfig) {
    const { params, headers, timeout, ...restConfigs } = userConfig;
    let globalHeaders = {};

    const authToken = await getAsyncStorage("authToken");
    if (Authorization || authToken) {
      globalHeaders.Authorization = `bearer ${Authorization || authToken}`;
    }

    const { filter, ...restParams } = params || {};

    return {
      ...restConfigs,
      headers: {
        ...globalHeaders,
        ...headers,
      },
      params: {
        ...restParams,
      },
      timeout,
    };
  }

  function getAuthorizationToken() {
    return Authorization;
  }

  function setAuthorizationToken(token) {
    Authorization = token;
  }

  function resetAuthorizationToken() {
    Authorization = null;
  }

  async function get(endPoint, userConfig = {}) {
    const headers = await addHeaders(userConfig);
    return axios.get(endPoint, headers);
  }

  async function post(endPoint, params = {}, userConfig = {}) {
    const headers = await addHeaders(userConfig);
    return axios.post(endPoint, params, headers);
  }

  async function put(endPoint, params = {}, userConfig = {}) {
    const headers = await addHeaders(userConfig);
    return axios.put(endPoint, params, headers);
  }

  async function remove(endPoint, params = {}, userConfig = {}) {
    const headers = await addHeaders(userConfig);
    return axios.delete(endPoint, { ...headers, data: params });
  }

  async function postFormData(endPoint, formData, userConfig = {}) {
    const headers = await addHeaders(userConfig);
    return axios.post(endPoint, formData, headers);
  }

  return {
    setAuthorizationToken,
    getAuthorizationToken,
    resetAuthorizationToken,
    get,
    post,
    put,
    remove,
    postFormData,
  };
};

export default AxiosService();
