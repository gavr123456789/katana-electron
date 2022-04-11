import { computed } from "mobx"
import { model, Model, prop, modelAction, modelFlow, _async, _await } from "mobx-keystone"
import { DirOrFileRow, Page } from "../components/types"
import { openDir } from "../services/DirReader"

@model("myCoolApp/Todo")
export class PagesStore extends Model({
  text: prop<string>(), // a required string
  done: prop(false), // an optional boolean that will default to `false` when the input is `null` or `undefined`
  count: prop(0),
  pages: prop<Page[]>(() => [])
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
  addPage(page: Page) {
    this.pages.push(page)
  }


  @modelFlow
  // note: `_async` is a function that has to be imported, we have to use `this: THISCLASS`
  addPage2 = _async(function* (this: PagesStore, path: string) {
    // we use `yield* _await(X)` where we would use `await X`
    // note: it is `yield*`, NOT just `yield`; `_await` is a function that has to be imported

    const newDir = yield* _await(openDir(path)) 
    this.pages.push(newDir)
  });

  @modelAction
  removePage(path: string) {
    this.pages = this.pages.filter(x => x.path !== path)
  }

  @modelAction
  addFile(pageNum: number, file: DirOrFileRow){
    const page = this.pages[pageNum]
    if (page) {
      page.dirsAndFiles.push(file)
    }
  }





  @computed
  get asString() {
    return `${!this.done ? "TODO" : "DONE"} ${this.text}`
  }
}


export const $pages = new PagesStore({ text: '' });
