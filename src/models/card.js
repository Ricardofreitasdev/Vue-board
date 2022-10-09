import utils from "@/functions/utils";

export default class ModelCard {
  task = [];
  /**
   *  Model do card
   * @param {String} listID
   * @param {String} title
   * @param {String} description
   */
  constructor(listID, title) {
    this.id = utils.generateId();
    this.listID = listID;
    this.title = title;
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

  /**
   *
   * @param {String} task
   */
  setTask(task) {
    this.task.push(task);
  }

  updateTask(event, taskId) {
    const task = this.task.find((task) => task.id == taskId);
    task.done = event.target.checked;
  }
}
