export function repositories() {
  return Object.freeze({
    getQuestions,
    saveQuestions,
    saveHistory,
    getHistory
  })
  /**
   * get questions saved on the local storage
   * @returns {String}
   */
  function getQuestions() {
    return get('questions')
  }
  /**
   * saves questions on the local storage (replaces the old entry)
   * @param {Object} data questions to be saved
   */
  function saveQuestions(data) {
    set('questions', data)
  }
  /**
   * get history saved on the local storage
   * @returns {String}
   */
  function getHistory() {
    return get('history')
  }
  /**
   * saves history on the local storage (replaces the old entry)
   * @param {Object} data history to be saved
   */
  function saveHistory(data) {
    set('history', data)
  }

  /**
   * 
   * @param {String} key name of the localStorage key saved
   * @returns 
   */
  function get(key) {
    return localStorage.getItem(key)
  }
  /**
   * 
   * @param {String} key name of the localStorage key saved
   * @param {String} data data to be saved in JSON
   * @returns 
   */
  function set(key, data) {
    localStorage.setItem(key, data)
  }
}