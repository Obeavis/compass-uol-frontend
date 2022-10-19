import axios from "axios";

/**
 * @param {object} headerParams - header params of request
 * Return axios customized instance
 * @returns {axios}
 */

const baseService = (headerParams = {}) => {
  const headers = {
    "Content-Type": "application/json",
    ...headerParams,
  };
  return axios.create({
    baseURL: process.env.REACT_APP_WHEATHER_API_URL,
    maxRedirects: 0,
    headers,
  });
};

export default baseService;
