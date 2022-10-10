import utils from "@/models/utils";

export default class ModelTask {
  constructor(title) {
    this.id = utils.generateId();
    this.done = false;
    this.title = title;
  }
}
