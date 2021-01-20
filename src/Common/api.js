const apiUrl = 'http://localhost:3001'
export class Api {

  post(url, data, formData) {
    let dataBody

    if (formData) {
      dataBody = new FormData();
      Object.keys(data).map(key => {

        if (!Array.isArray(data[key])) {
          const isFile = data[key] && data[key].size
          const isJson = typeof data[key] === 'object'

          dataBody.append(key, isFile || !isJson ? data[key] : JSON.stringify(data[key]));
        } else
          data[key].forEach(item => {
            const isFile = item && item.size
            const isJson = typeof item === 'object'

            dataBody.append(key, isFile || !isJson ? item : JSON.stringify(item))
          })
      })
    } else
      dataBody = JSON.stringify(data);

    return fetch(`${apiUrl}${url}`, {
      method: 'POST',
      headers: (formData ? {
      } : {
          'Accept': 'application/json',
          'Content-type': 'application/json',
        }),
      body: dataBody
    }).then(async response => {
      response.payload = await response.json()
      return response;
    }).catch(err => err)
  }

  put(url, data, formData) {
    let dataBody

    if (formData) {
      dataBody = new FormData();
      Object.keys(data).map(key => {

        if (!Array.isArray(data[key])) {
          const isFile = data[key] && data[key].size
          const isJson = typeof data[key] === 'object'

          dataBody.append(key, isFile || !isJson ? data[key] : JSON.stringify(data[key]));
        } else
          data[key].forEach(item => {
            const isFile = item && item.size
            const isJson = typeof item === 'object'

            dataBody.append(key, isFile || !isJson ? item : JSON.stringify(item))
          })
      })
    } else
      dataBody = JSON.stringify(data);

    return fetch(`${apiUrl}${url}`, {
      method: 'PUT',
      headers: (formData ? {
      } : {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        }),
      body: dataBody
    }).then(async response => {
      response.payload = await response.json()
      return response;
    }).catch(err => err)
  }

  delete(url) {
    return fetch(`${apiUrl}${url}`, {
      method: 'DELETE'
    }).then(async response => {
      response.payload = await response.json()
      return response;
    }).catch(err => err)
  }

  get(url, params) {
    url = new URL(`${apiUrl}${url}`);
    if (params)
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    return fetch(url, {
      method: 'GET'
    }).then(async response => {
      response.payload = await response.json()
      return response;
    }).catch(err => err)
  }
}

export default new Api();

/*const API_KEY = "20994e5f42a7a4c6d150f6c2c8ef51b9";
const HASH = "6c42384a80fc43da35149ed84044a913";
const TS = "3";
const BASE_URL = "https://gateway.marvel.com/v1/public/comics?";

export const Api = () =>
  fetch(
    BASE_URL +
    new URLSearchParams({
      apikey: API_KEY,
      hash: HASH,
      ts: TS,
    })
  )
    .then((resp) => resp.json())
    .then(json => json)
    .catch((err) => {
      err.json();
    });

const BASE_URL = 'http://gateway.marvel.com/v1/public/comics';

const params = [
  { name: 'ts', value: TS },
  { name: 'apikey', value: API_KEY },
  { name: 'hash', value: HASH }
];

export const Api = async () => {
  let a = '?';
  params.map(i => {
    a = a + `&${i.name}=${i.value}`
  })
  return await fetch(BASE_URL + a)
}; */