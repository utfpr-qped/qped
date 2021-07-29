import { parseQuestionsString } from "./index";
import { repositories } from "../repositories";
import helpers from "../helpers"
const repos = repositories()
const helper = helpers()

function getParsedQuestions() {
  const questions = repos.getQuestions()
  return parseQuestions(questions)
}

function setParsedQuestions(questions) {
  repos.saveQuestions(questions)
}

function parseQuestions(questions) {
  return questions ? parseQuestionsString(questions) : {}
}

function getRemoteQuestions() {
  const baseUrl = "https://gist.githubusercontent.com/Tashima42/cbb2caafec9fda2934ce782e53f0a5ef/raw/"
  const questions = helper.httpGet(baseUrl)
  return questions
}


export { getParsedQuestions, setParsedQuestions, getRemoteQuestions }
