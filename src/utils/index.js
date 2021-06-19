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
    const options = [question.answer(parser.getAllValues())]
    let numberOfOptions = 4
    if (trueOrFalse) {
      numberOfOptions = 2
    }
    for (let i = 0; i < numberOfOptions - 1; i++) {
      const option = question.answer(parser.getAllValues(i))
      //console.log(options.includes(option))
      /*
      if (options.includes(option)) {
        //i--
        continue
      }
      */
      options.push(option)
    }
    return helper.shuffleArray(options)
  }

  const parsedQuestion = {
    id: question.id,
    title: question.title,
    text: parser.getText(),
    verifyAnswer: question.verifyAnswer.toString(),
    answer: question.answer(parser.getAllValues()),
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