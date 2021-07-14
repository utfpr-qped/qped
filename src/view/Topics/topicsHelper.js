export default function helpers() {
  return Object.freeze({
    generateSearchOptions,
    onSelect
  })
  function generateSearchOptions({ questions }) {
    const ids = []
    Object.keys(questions).forEach(topic => {
      questions[topic].forEach((question) => {
        ids.push({ name: question.id, type: "id" })
      })
    })
    const search = [...ids]
    search.forEach((_, index) => {
      search[index].id = index
    })
    return search
  }

  function onSelect({ name, type }, { database }) {
    let questions = {}
    switch (type) {
      case "id":
        questions = getByKey("id")
        break;
      default:
        alert("INVALID SEARCH TYPE")
        break;
    }

    function getByKey(key) {
      let questions = {}
      for (const topic in database) {
        database[topic].forEach((question, index) => {
          if (question[key] === name) {
            if (questions[topic] === undefined) {
              questions[topic] = []
            }
            questions[topic].push(database[topic][index])
          }
        })
      }
      return questions
    }

    return questions
  }

}
