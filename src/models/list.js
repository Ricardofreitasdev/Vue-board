import utils from "@/models/utils";

export default class ModelList {
  /**
   *  Model do title
   * @param {String} title
   */
  constructor(title) {
    this.id = utils.generateId();
    this.title = title;
  }

  /**
   * retorna o ID do titulo
   * @returns String
   */
  getId() {
    return this.id;
  }
}
