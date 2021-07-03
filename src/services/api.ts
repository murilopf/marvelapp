import axios from "axios";
import md5 from "md5";

const publickey = process.env.PUBLIC_API_KEY;
const privatekey = process.env.PRIVATE_API_KEY;

const getComics = async (offset: number) => {

  if (!publickey || !privatekey)
    return console.log("Missing PublicKey or PrivateKey in .env.local")

  const md5Hash = md5(1 + privatekey + publickey)

  const params = {
    ts: 1,
    apikey: publickey,
    hash: md5Hash,
    limit: 10,
    offset: offset,
    orderBy: 'title'
  }

  const response = await axios.get('https://gateway.marvel.com:443/v1/public/comics', { params })
  if (response.status === 200) {
    return response.data
  } else {
    console.log('error')
  }
}

const getComicsByCharactersName = async (name: string, offset: number) => {
  const publickey = process.env.PUBLIC_API_KEY;
  const privatekey = process.env.PRIVATE_API_KEY;

  if (!publickey || !privatekey)
    return console.log("Missing PublicKey or PrivateKey in .env.local")

  const md5Hash = md5(1 + privatekey + publickey)

  const params = {
    ts: 1,
    apikey: publickey,
    hash: md5Hash,
    limit: 10,
    offset: offset,
    orderBy: 'name',
    nameStartsWith: name
  }

  const characterApi = await axios.get('https://gateway.marvel.com:443/v1/public/characters', { params })
  if (characterApi.status === 200) {

    let response

    if (characterApi.data.data.result && characterApi.data.data.result.length > 0) {
      response = await axios.get(characterApi.data.data.result.comics.collectionURI, { params })
      console.log("Response::: " + response.data)
    }

  } else {
    console.log('error')
  }
}

export {
  getComics,
  getComicsByCharactersName
}

