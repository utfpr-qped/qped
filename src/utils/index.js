import { QuestionParser } from "./QuestionParser"
import { questions as rawQuestions } from "./questions"

const questions = {}

for (const topic in rawQuestions) {
  rawQuestions[topic].forEach(question => {
    const parser = new QuestionParser(question.text)
    if (questions[topic] === undefined) {
      questions[topic] = []
    }
    questions[topic].push({
      id: question.id,
      title: question.title,
      text: parser.getText(),
      answer: question.answer.toString(),
      subject: question.subject,
      level: question.level,
      tags: question.tags,
      values: parser.getAllValues(),
      //type: question.type,
    })
  })
}

export { questions }