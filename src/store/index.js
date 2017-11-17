import api from "./api";

const store = {
  init: key => {
    api.init(key);
  },
  get: async (key, data) => {
    let value;
    let error;

    [error, value] = await api.get(key, data);

    return new Promise((resolve, reject) => {
      value != null ? resolve(value) : reject(error);
    });
  },
  post: async (key, data) => {
    let value;
    let error;

    return new Promise((resolve, reject) => {
      value != null ? resolve(value) : reject(error);
    });
  },
  put: async (key, data) => {
    let value;
    let error;

    return new Promise((resolve, reject) => {
      value != null ? resolve(value) : reject(error);
    });
  },
  delete: async (key, data) => {
    let value;
    let error;

    return new Promise((resolve, reject) => {
      value != null ? resolve(value) : reject(error);
    });
  }
};

export default store;
