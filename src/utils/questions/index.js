/* eslint-disable */
import { QuestionParser } from "./QuestionParser"
import helpers from "../helpers"
const helper = helpers()

function questionsTopics(rawQuestions) {
  const questions = []
  for (const topic in rawQuestions) {
    rawQuestions[topic].forEach(question => {
      if (questions[topic] === undefined) {
        questions[topic] = []
      }
      questions[topic].push({
        subject: question.subject,
        id: question.id,
        title: question.title,
        subject: question.subject
      })
    })
  }
  return questions
}

function parseQuestion(question) {
  const parser = new QuestionParser(question.text)
  return Object.freeze({
    id: question.id,
    title: question.title,
    text: parser.getText(),
    answer: question.answer.toString(),
    subject: question.subject,
    level: question.level,
    tags: question.tags,
    values: parser.getAllValues(),
    blocks: parser.options,
    options: generateOptions(false),
    trueOrFalseOptions: generateOptions(true)
  })


  /**
   * Gera opcoes para uma questao com a resposta correta e mais valores gerados aleatoriamente
   * @param {Boolean} trueOrFalse Se o tipo da questao for verdadeiro ou falso, apenas duas opcoes sao retornadas
   * @returns {Array}
   */
  function generateOptions(trueOrFalse) {
    const seeds = []
    const options = [question.answer(parser.getAllValues(), parser.options)]

    let numberOfOptions = 5
    if (trueOrFalse) {
      numberOfOptions = 2
    }

    // os labels para os loops sao necessarios nesse caso, porque caso a opcao gerada for repetida,
    // o loop precisa ser iterado mais uma vez e isso precisa ser feito por um loop nested
    // mais info sobre labels: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/label
    generate:
    for (let i = 0; i < numberOfOptions - 1;) {
      const randomInt = generateSeed(seeds)
      const option = question.answer(parser.getAllValues(randomInt), parser.options)
      for (let j = 0; j < options.length; j++) {
        if (helper.compareArrays(options[j], option)) {
          continue generate
        }
      }
      options.push(option)
      i++
    }
    return helper.shuffleArray(options)
  }

  /**
   * Gera uma seed aleatoria que nao tenha sido usada anteriormente 
   * @param {Array} seeds Todas as seeds ja usadas e que nao podem ser repetidas
   * @returns {Number} Numero inteiro aleatorio entre 1 e 10000
   */
  // Usa a propriedade do javascript que os arrays sao passados por referencia e nao por valor,
  // entao todas as alteracoes feitas em um array passado como parametro para uma funcao, sao 
  // mantidas 
  function generateSeed(seeds) {
    const randomInt = helper.randomInt(1, 10000)
    // Verfica se a seed gerada ja existe no array passado como parametro e se existir, chama recursivamente
    // a funcao ate que uma diferente seja gerada
    if (seeds.includes(randomInt)) {
      return generateSeed(seeds)
    }
    seeds.push(randomInt)
    return randomInt
  }
}

function parseQuestionsString(rawQuestions) {
  const questions = {}
  const parsedQuestions = JSON.parse(rawQuestions)
  for (const topic in parsedQuestions) {
    parsedQuestions[topic].forEach(question => {
      if (questions[topic] === undefined) {
        questions[topic] = []
      }
      question.answer = parseFunction(question.answer) // transform answer from string to function
      questions[topic].push(question)
    })
  }
  return questions

  function parseFunction(fn) {
    return (0, eval)("(" + fn + ")")
  }
}

function stringifyQuestionsFile(questions) {
  return JSON.stringify(questions, function (key, value) {
    if (typeof value === "function") {
      return value.toString();
    }
    return value;
  })
}

export { questionsTopics, parseQuestion, parseQuestionsString, stringifyQuestionsFile }