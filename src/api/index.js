import md5 from "blueimp-md5";
import axios from "axios";

const BASE_URL = "https://gateway.marvel.com:443/v1/public/";
const API_PUBLIC = "085cd4fe0b94f08cf91b97653d7ae64f";
const API_PRIVATE = "ceecd74d0942b6ddf8f9f746b83ba7cccb723de2";
const PAGE_SIZE = 10;

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export function getQueryParams(offset, query) {
  const ts = Date.now();
  const params = {
    ts,
    apikey: API_PUBLIC,
    hash: md5(ts + API_PRIVATE + API_PUBLIC),
    limit: 10,
    offset,
    ...{ ...({query} ?? null) },
  };
  return Object.keys(params)
    .filter((key) => params[key] !== undefined)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
    )
    .join("&");
}

export async function fetchComicsPage(page, characters) {
  const response = await api.get(`comics?${getQueryParams(page * PAGE_SIZE, characters)}`);
  const error = !response.status === 200;
  if (error) {
    throw new Error(response.statusText);
  }
  const data = response.data.data;
  return {
    ...data,
    hasMore: data.total / PAGE_SIZE >= page * PAGE_SIZE,
  };
}

export async function fetchComicDetais(id) {
  const response = await api.get(`comics/${id}?${getQueryParams()}`);
  const error = !response.status === 200;
  if (error) {
    throw new Error(response.statusText);
  }
  const[first] = response.data.data.results;
  return first;
}

export async function fetchCharacters(offset, nameStartsWith) {
  const response = await api.get(`characters?${getQueryParams(offset, nameStartsWith)}`);
  const error = !response.status === 200;
  if (error) {
    throw new Error(response.statusText);
  }
  return response.data.data.results;
}

export async function fetchCharacter(id) {
  const response = await api.get(`characters?${id}?${getQueryParams()}`);
  const error = !response.status === 200;
  if (error) {
    throw new Error(response.statusText);
  }
  return response.data.data.results[0];
}

export default api;
// (https://www.tjvantoll.com/2015/09/13/fetch-and-errors/)
