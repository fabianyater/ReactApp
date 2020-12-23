const API_KEY = "20994e5f42a7a4c6d150f6c2c8ef51b9";
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

/* const BASE_URL = 'http://gateway.marvel.com/v1/public/comics';

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