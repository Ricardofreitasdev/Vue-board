import utils from "@/models/utils";

export default class ModelCard {
  /**
   * @param {number} listID
   * @param {string} title
   * @param {arr} task
   * @param {string} id
   * @param {string} description
   */
  constructor(listID, title, task = [], id = null, description = "") {
    this.listID = listID;
    this.task = task;
    this.id = id ? id : utils.generateId();
    this.title = title;
    this.description = description;
  }

  /**
   * retorna o ID do card
   * @returns String
   */
  getId() {
    return this.id;
  }

  /**
   *
   * @param {String} description
   */
  setDescription(description) {
    this.description = description;
  }

  updateTitle(title) {
    this.title = title;
  }

  /**
   *
   * @param {String} task
   */
  setTask(task) {
    this.task.push(task);
  }

  updateTask(status, taskId) {
    const task = this.task.find((task) => task.id == taskId);
    task.done = status;
  }

  taskLength() {
    return this.task.length;
  }

  tasksDone() {
    return this.task.filter((item) => item.done === true).length;
  }
}
