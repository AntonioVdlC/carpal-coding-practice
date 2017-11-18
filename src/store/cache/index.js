const cache = {
  init: (validity = 1 * 86400000 /* 1 day */) => {
    // Cache validity duration
    this.validity = validity;

    // Initialise cache elements
    if (localStorage.getItem("cities") == null) {
      localStorage.setItem("cities", JSON.stringify([]));
    }
  },
  get: key => {
    let value, error;

    let validUntil = localStorage.getItem(`${key}-valid-until`);
    let isValid = validUntil == null || new Date() < new Date(validUntil);

    // Flag the value as outdated if cache is not valid
    // but still retrieve the value in case the subsequent
    // HTTP request fails
    if (!isValid) error = true;

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

      // We want to keep cities forever (or until the user clears it)
      // so we don't upadte the validity date of this key!
      //
      // Ideally we'd have a list of keys we don't want to update!
      if (key !== "cities") {
        localStorage.setItem(
          `${key}-valid-until`,
          new Date(new Date().getTime() + this.validity).toString()
        );
      }

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
      localStorage.removeItem(`${key}-valid-until`);
      value = true;
    } catch (err) {
      error = err;
    }

    return [error, value];
  }
};

export default cache;
