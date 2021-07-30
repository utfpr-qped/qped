const fs = require('fs')

function stringifyQuestionsFile(questions) {
    return JSON.stringify(questions, function (key, value) {
        if (typeof value === "function") {
            return value.toString();
        }
        return value;
    })
}

const file = require(__dirname + "/questions.js")

fs.writeFileSync(__dirname + "/questions.json", stringifyQuestionsFile(file), { encoding: "utf-8" })
