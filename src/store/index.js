import deepEqual from "deep-equal";
import isObject from "is-obj";

import api from "./api";
import cache from "./cache";

const store = {
  init: key => {
    api.init(key);
    cache.init();
  },
  get: async (key, data) => {
    let value, error;

    // Try first to look into the cache!
    //
    // As we can query the weather either with the name of a city `q`
    // or an `id` we might end up with duplicated data, and querying
    // twice for the same information ...
    // This is far from ideal, and a better strategy would be to merge
    // that data and cross-checking it with the `cities`.
    [error, value] = await cache.get(
      key === "weather" ? `${key}-${data.id || data.q}` : key
    );

    // Something went wrong or cache outdated
    if (error || value == null) {
      // Key is safelisted by API, so let's retrieve data from there!
      if (api.safelist(key)) {
        [error, value] = await api.get(key, data);

        // Save value into cache
        if (!error) {
          await cache.set(
            key === "weather" ? `${key}-${data.id || data.q}` : key,
            value
          );
        }
      } else {
        // The data cannot be retrieved from the API
        // If the data is only outdated, let's just return it and
        // swallow the error
        if (value != null) error = null;
      }
    }

    return new Promise((resolve, reject) => {
      value != null ? resolve(value) : reject(error);
    });
  },
  post: async (key, data) => {
    let value, error;

    [error, value] = cache.set(key, data);

    return new Promise((resolve, reject) => {
      value != null ? resolve(value) : reject(error);
    });
  },
  put: async (key, data) => {
    let value, error;

    [error, value] = cache.get(key);

    if (!error) {
      if (Array.isArray(value)) {
        // We are storing an array, so let's just push the new data
        // into it.
        // To get fancy and optimize a bit the cache memory, let's
        // make sure we ain't putting no duplicates!
        if (!value.some(v => deepEqual(v, data))) {
          value.push(data);
        }
      } else if (isObject(value)) {
        // We are storing an object, so let's merge it with the new data
        value = { ...value, data };
      } else {
        // We are storing a primitive data, so let's just replace it? 🤷🏾‍♂️
        // This should be a POST though ... 😅
        value = data;
      }

      cache.set(key, value);
    }

    return new Promise((resolve, reject) => {
      value != null ? resolve(value) : reject(error);
    });
  },
  delete: async key => {
    let value, error;

    [error, value] = cache.remove(key);

    return new Promise((resolve, reject) => {
      value != null ? resolve(value) : reject(error);
    });
  }
};

export default store;
