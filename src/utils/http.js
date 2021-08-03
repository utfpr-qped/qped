const axios = require("axios")

export default function http({ baseUrl, headers = {} }) {
  return Object.freeze({
    get,
  })

  async function get({ url, useBaseUrl = true }) {
    const reqUrl = useBaseUrl ? `${baseUrl}${url}` : url
    const response = await axios({
      headers,
      method: 'get',
      url: reqUrl
    })
    return {
      data: response.data,
      status: response.status,
      headers: response.headers
    }
  }
}
