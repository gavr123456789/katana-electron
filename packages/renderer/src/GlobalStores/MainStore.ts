import { computed } from "mobx"
import { model, Model, prop, modelAction } from "mobx-keystone"

@model("myCoolApp/Todo")
export class Todo extends Model({
  text: prop<string>(), // a required string
  done: prop(false), // an optional boolean that will default to `false` when the input is `null` or `undefined`
  count: prop(0)
}) {

  @modelAction
  setDone(done: boolean) {
    this.done = done
  }

  @modelAction
  setText(text: string) {
    this.text = text
  }

  @modelAction
  inc() {
    this.count += 1
    console.log(this.count);
    
  }

  @computed
  get asString() {
    return `${!this.done ? "TODO" : "DONE"} ${this.text}`
  }
}


export const counter = new Todo({ text: '' });
