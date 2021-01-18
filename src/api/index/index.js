import fetch from "@/api/fetch";

export default {
  getOpenID(params) {
    return fetch.post("/api/wechat/auth", params);
  },
  postPayment(params) {
    return fetch.post("/api/gassorder/payh5", params);
  },
  getConfig(params) {
    return fetch.get("/api/wechat/config", params);
  }
};
