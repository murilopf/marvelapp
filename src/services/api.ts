import axios from 'axios'
import md5 from 'md5'

const publickey = process.env.PUBLIC_API_KEY
const privatekey = process.env.PRIVATE_API_KEY

const getComics = async (offset: number) => {
  if (!publickey || !privatekey)
    return console.log('Missing PublicKey or PrivateKey in .env.local')

  const md5Hash = md5(1 + privatekey + publickey)

  const params = {
    ts: 1,
    apikey: publickey,
    hash: md5Hash,
    limit: 10,
    offset,
    orderBy: 'title',
  }

  const response = await axios.get(
    'https://gateway.marvel.com:443/v1/public/comics',
    { params }
  )
  if (response.status === 200) {
    return response.data
  }
  return []
}

const getComicsByCharactersName = async (
  name: string,
  characterOffset: number,
  offset: number
) => {
  if (!publickey || !privatekey)
    return console.log('Missing PublicKey or PrivateKey in .env.local')

  const md5Hash = md5(1 + privatekey + publickey)

  const params = {
    ts: 1,
    apikey: publickey,
    hash: md5Hash,
    limit: 10,
  }

  const characterParams = {
    ...params,
    orderBy: 'name',
    nameStartsWith: name,
    offset: characterOffset,
  }

  const characterApi = await axios.get(
    'https://gateway.marvel.com:443/v1/public/characters',
    { params: characterParams }
  )
  if (characterApi.status === 200) {
    let response

    if (
      characterApi.data.data.results &&
      characterApi.data.data.results.length > 0
    ) {
      Object.assign(params, {
        orderBy: 'title',
        offset,
      })

      let apiUrl = characterApi.data.data.results[0].comics.collectionURI

      apiUrl = apiUrl.replace(/^http:\/\//i, 'https://')

      response = await axios.get(apiUrl, { params })

      if (response.status === 200) {
        return response.data
      }
      return []
    }
  }
  return []
}

export { getComics, getComicsByCharactersName }
