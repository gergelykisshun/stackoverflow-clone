import axios, { CreateAxiosDefaults } from "axios";

const apiParams: CreateAxiosDefaults = {
  baseURL: `http://api.stackexchange.com/2.3/`,
  timeout: 20000,
  params: { site: "stackoverflow" },
};

export const api = axios.create(apiParams);
