const Restana  = require("restana")
const App = Restana()

const AsciiTable = require("ascii-table");
const FS = require("node:fs");
const Paths = FS.readdirSync("./Paths/").filter(i => i.endsWith("js"));

const LoadedTable = new AsciiTable("Loaded Files");
const PORT = 8080;

LoadedTable.setHeading("File", "Status");

for (const Path of Paths) {
    let Status = "No";
    try {
        const PathFile = require(`./Paths/${Path}`);
        if (PathFile.Type === "GET") {
           App.get(PathFile.Path, PathFile.Route)
        } else if (PathFile.Type === "POST") {
           App.post(PathFile.Path, PathFile.Route)
        } else if (PathFile.Type === "PUT") {
           App.put(PathFile.Path, PathFile.Route)
        }
        Status = "Yes";
    } catch(e) {
        Status = "No";
    }
    LoadedTable.addRow(Path, Status);
}

console.log(LoadedTable.toString());

App.start(PORT)
.then(() => {
    console.log("Your app is now live!");
    console.log();
    console.log("---------------------------");
    console.log(`URL: http://localhost:${PORT}/`);
    console.log("---------------------------");
})
