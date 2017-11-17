const cache = {
  init: () => {
    if (localStorage.getItem("cities") == null) {
      localStorage.setItem("cities", JSON.stringify([]));
    }
  },
  get: key => {
    let value, error;

    try {
      value = JSON.parse(localStorage.getItem(key));
    } catch (err) {
      error = err;
    }

    return [error, value];
  },
  set: (key, data) => {
    let value, error;

    try {
      localStorage.setItem(key, JSON.stringify(data));
      value = data;
    } catch (err) {
      error = err;
    }

    return [error, value];
  },
  remove: key => {
    let value, error;

    try {
      localStorage.removeItem(key);
      value = true;
    } catch (err) {
      error = err;
    }

    return [error, value];
  }
};

export default cache;
