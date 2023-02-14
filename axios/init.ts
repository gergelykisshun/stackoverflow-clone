import axios, { CreateAxiosDefaults } from "axios";

const apiParams: CreateAxiosDefaults = {
  baseURL: `http://api.stackexchange.com/2.3/`,
  timeout: 20000,
  params: { site: "stackoverflow", key: process.env.API_PRIVATE_KEY },
};

export const api = axios.create(apiParams);
