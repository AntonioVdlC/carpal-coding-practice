import qs from "query-string";

import config from "../../config";
import checkStatus from "../../utils/check-http-status";

const api = {
  init: key => {
    this.APPID = key;
  },
  get: async (key, data) => {
    let value;
    let error;

    try {
      console.log(process.env.REACT_APP_OWN_API_KEY);
      value = await fetch(
        `${config.baseUrl}/${key}?${qs.stringify({
          ...data,
          APPID: this.APPID
        })}`
      )
        .then(checkStatus)
        .then(res => res.json());
    } catch (err) {
      error = err;
    }

    return [error, value];
  }
};

export default api;
