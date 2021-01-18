import axios from "axios";
import qs from "qs";

export default {
  get(url, params = {}) {
    return axios({
      method: "get",
      url,
      params,
      paramsSerializer: query => qs.stringify(query)
    });
  },
  post(url, params) {
    return axios({
      method: "post",
      url,
      data: qs.stringify(params)
    });
  },
  put(url, params = {}) {
    return axios({
      method: "put",
      url,
      data: qs.stringify(params)
    });
  },
  delete(url, params = {}) {
    return axios({
      method: "delete",
      url,

      params
    });
  }
};
