import { github } from "../env.js"
import httpHelper from "../http.js"
const { baseUrl, org, questionsRepo } = github
const http = httpHelper({ baseUrl })

export default function githubProvider() {
  return Object.freeze({
    getQuestionsDatabasesNames,
    getQuestionsDatabase
  })

  async function getQuestionsDatabasesNames() {
    const contents = await getContentsQuestionsRepo()
    const names = contents.map(content => {
      const name = content.name.split(".")[0]
      return name
    })
    return names
  }

  async function getQuestionsDatabase({ name }) {
    const { download_url } = await getQuestionsRepoFile({ filename: `${name}.json` })
    const { data } = await http.get({ url: download_url, useBaseUrl: false })
    return JSON.stringify(data)
  }

  async function getContentsQuestionsRepo() {
    const { data } = await http.get({ url: `/repos/${org}/${questionsRepo}/contents` })
    return data
  }

  async function getQuestionsRepoFile({ filename }) {
    const { data } = await http.get({ url: `/repos/${org}/${questionsRepo}/contents/${filename}` })
    return data
  }
}
