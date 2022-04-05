import { watch } from 'chokidar';

const DEFAULT_PATH = "/home/gavr/test"


const watcher = watch(DEFAULT_PATH, {
  ignored: /[\/\\]\./,
  persistent: true,
  depth: 0,
  // ignoreInitial: true
});
startWatch()
function startWatch() {
  function onWatcherReady() {
    console.info("WATCHER READY, watching paths: ", watcher.getWatched);
  }

  watcher.on("add", (path) => {
    console.log("sas: ", path);

  })
}

