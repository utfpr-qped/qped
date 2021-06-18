import { QuestionParser } from "./QuestionParser"
import { questions as rawQuestions } from "./questions"

const questions = {}

for (const topic in rawQuestions) {
  rawQuestions[topic].forEach(question => {
    if (questions[topic] === undefined) {
      questions[topic] = []
    }
    questions[topic].push(parseQuestion(question))
  })
}

function parseQuestion(question) {
  const parser = new QuestionParser(question.text)
  return {
    id: question.id,
    title: question.title,
    text: parser.getText(),
    answer: question.answer.toString(),
    subject: question.subject,
    level: question.level,
    tags: question.tags,
    values: parser.getAllValues(),
    //type: question.type,
  }
}

export { questions, rawQuestions, parseQuestion }