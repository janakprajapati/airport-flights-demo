import { get } from "../utilities/api.config.js";

export const getDepartureDetailsApi = (queryString) => {
  const request = {
    subUrl: `/flights/departure${queryString ? `?${queryString}` : ``}`,
  };
  return get(request);
};

export const getArrivalDetailsApi = (queryString) => {
  const request = {
    subUrl: `/flights/arrival${queryString ? `?${queryString}` : ``}`,
  };
  return get(request);
};
