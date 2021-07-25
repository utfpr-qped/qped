import { parseQuestionsString } from "./index";
import { repositories } from "../repositories";
const repos = repositories()

function getParsedQuestions() {
  const questions = repos.getQuestions()
  return questions ? parseQuestionsString(questions) : {}
}

function setParsedQuestions(questions) {
  repos.saveQuestions(questions)   
}

export { getParsedQuestions, setParsedQuestions }
