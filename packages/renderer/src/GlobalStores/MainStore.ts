import { computed } from "mobx"
import { model, Model, prop, modelAction, modelFlow, _async, _await } from "mobx-keystone"
import { DirOrFileRow, Page } from "../components/types"
import { openDir } from "../services/DirReader"
import { $selectedPages } from "./SelectedStore";

@model("katana/PagesStore")
export class PagesStore extends Model({
  pages: prop<Page[]>(() => [])
}) {



  @modelFlow
  addPage = _async(function* (this: PagesStore, path: string) {
    const newPage = yield* _await(openDir(path)) 
    this.pages.push({...newPage})
    $selectedPages.selectPage({...newPage})
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

}


export const $pages = new PagesStore({});
