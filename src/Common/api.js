const API_KEY = '20994e5f42a7a4c6d150f6c2c8ef51b9'
const HASH = '6c42384a80fc43da35149ed84044a913'
const TS = '3'
const BASE_URL = 'https://gateway.marvel.com/v1/public/comics?'

/*const params = [
    { name: 'apikey', value: API_KEY },
    { name: 'hash', value: HASH },
    { name: 'ts', value: TS },
]
export const Api = async() => (
    //await fetch(BASE_URL + params.map(item => `${item.name}=${item.value}&`))
    await fetch('https://gateway.marvel.com/v1/public/comics?apikey=20994e5f42a7a4c6d150f6c2c8ef51b9&hash=6c42384a80fc43da35149ed84044a913&ts=3')
)*/

export const Api = () => fetch(
        BASE_URL + new URLSearchParams({
            apikey: API_KEY,
            hash: HASH,
            ts: TS
        }))
    .then(resp => resp.json())
    .catch(err => {
        console.log("Ocurrió un error");
    });