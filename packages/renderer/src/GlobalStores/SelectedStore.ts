import { model, Model, prop, modelAction, modelFlow, _async, _await } from "mobx-keystone"
import { DirOrFileRow, DirOrFileWithPath, Page } from "../components/types"
import { echo } from "../utils/printUtils"

@model("katana/SelectedStore")
export class SelectedStore extends Model({
  selectedPages: prop<DirOrFileWithPath[]>(() => []),
  lastSelectedPage: prop<Page>(() => {
    return {
      path: '!!!!!',
      dirsAndFiles: [],
      selected: true
    }
  })
}) {


  @modelAction
  selectFile(file: DirOrFileWithPath){
    this.selectedPages.push(file)
    echo("file selected ", file)
  }

  @modelAction
  unselectFile(file: DirOrFileWithPath){
    this.selectedPages = this.selectedPages.filter(x => x.fullPath !== file.fullPath)
    echo("file unselected ", file)
  }

  @modelAction
  selectPage(page: Page){
    this.lastSelectedPage.selected = false
    echo("unselect page: ", page)
    page.selected = true
    const x: Page = {
      dirsAndFiles: [...page.dirsAndFiles],
      path: page.path,
      selected: page.selected,
      lastSelected: page.lastSelected
    }
    this.lastSelectedPage = x
    echo("selectPage ", page)
  }




  // @computed
  // get asString() {
  //   return `${!this.done ? "TODO" : "DONE"} ${this.text}`
  // }
}


export const $selectedPages = new SelectedStore({});
