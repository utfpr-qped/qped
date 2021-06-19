/* eslint-disable */
import { QuestionParser } from "./QuestionParser"
import { questions as rawQuestions } from "./questions"
import helpers from "./helpers"
const helper = helpers()

const questions = {}

for (const topic in rawQuestions) {
  rawQuestions[topic].forEach(question => {
    if (questions[topic] === undefined) {
      questions[topic] = []
    }
    questions[topic].push({
      id: question.id,
      title: question.title,
      subject: question.subject
    })
  })
}

function parseQuestion(question) {
  const parser = new QuestionParser(question.text)

  function generateOptions(trueOrFalse) {
    let numberOfOptions = 4
    const options = [parser.getAllValues()]
    if (trueOrFalse) {
      numberOfOptions = 2
    }
    for (let i = 0; i < numberOfOptions - 1; i++) {
      options.push(parser.getAllValues(i))
    }
    return helper.shuffleArray(options)
  }

  const parsedQuestion = {
    id: question.id,
    title: question.title,
    text: parser.getText(),
    answer: question.answer.toString(),
    subject: question.subject,
    level: question.level,
    tags: question.tags,
    values: parser.getAllValues(),
    options: generateOptions(false),
    trueOrFalseOptions: generateOptions(true)
  }
  /*
  console.log(parsedQuestion.values)
  console.log(parsedQuestion.options)
  console.log(parsedQuestion.trueOrFalseOptions)
  */
  return parsedQuestion
}

export { questions, rawQuestions, parseQuestion }