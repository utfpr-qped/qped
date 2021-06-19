export default function helpers() {
  return Object.freeze({
    generateSearchOptions,
    onSelect,
    capitalizeFirstLetter
  })
  function generateSearchOptions({ questions }) {
    const topics = []
    const ids = []
    const titles = []
    Object.keys(questions).forEach(topic => {
      topics.push({ name: topic, type: "topic" })
      questions[topic].forEach((question) => {
        ids.push({ name: question.id, type: "id" })
        titles.push({ name: question.title, type: "title" })
      })
    })
    const search = topics.concat(ids, titles)
    search.forEach((_, index) => {
      search[index].id = index
    })
    return search
  }

  function onSelect({ name, type }, { database }) {
    let questions = {}
    switch (type) {
      case "topic":
        questions[name] = database[name]
        break;
      case "id":
        questions = getByKey("id")
        break;
      case "title":
        questions = getByKey("title")
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
            questions[topic] = []
            questions[topic].push(database[topic][index])
          }
        })
      }
      return questions
    }
    return questions
  }

  function capitalizeFirstLetter({ string }) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
