import utils from "@/functions/utils";

export default class ModelTask {
  constructor(title) {
    this.id = utils.generateId();
    this.done = false;
    this.title = title;
  }
}
