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
    .catch((err) => {
      err.json();
    });
