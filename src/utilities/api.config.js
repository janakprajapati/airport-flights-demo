import axios from "axios";

let baseUrl = "https://opensky-network.org/api";
//https://opensky-network.org/apidoc/rest.html#id17
//https://www.world-airport-codes.com/world-top-30-airports.html

const getFullUrl = (url) => {
  return `${baseUrl}${url}`;
};

export const getBaseUrl = () => {
  return `${baseUrl}`;
};

export const get = (request) => {
  return commonFetch({ method: "get", ...request });
};

export const post = (request) => {
  return commonFetch({ method: "post", ...request });
};

export const patch = (request) => {
  return commonFetch({ method: "patch", ...request });
};

export const put = (request) => {
  return commonFetch({ method: "put", ...request });
};

export const deletee = (request) => {
  return commonFetch({ method: "delete", ...request });
};

const commonFetch = (request) => {
  const { subUrl, method, data = {}, params = {}, headers = {} } = request;
  const url = request.url || getFullUrl(subUrl);
  return axios({
    method,
    url,
    data,
    headers: { ...headers },
    params,
  })
    .then((response) => {
      if (handleResponseStatus(response)) {
        return Promise.resolve(response);
      } else {
        return Promise.reject(response);
      }
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

const handleResponseStatus = (response) => {
  if (response.status >= 200 || response.status < 300) {
    return true;
  }
  return false;
};

export const getErrorObject = (error) => {
  let message = "Error!";
  if (error && error.response && error.response.data) {
    // API server error message
    let errorResponse = error.response.data;
    if (errorResponse.message) {
      message = errorResponse.message;
    } else if (errorResponse.errors) {
      message = errorResponse.errors;
    } else if (errorResponse.error_description) {
      message = errorResponse.error_description;
    } else if (errorResponse.error) {
      message = errorResponse.error;
    }
  } else if (error && error.message) {
    // js error message
    message = error.message;
  }
  return {
    message,
  };
};
