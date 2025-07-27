const Connect  = require("connect")
const HTTP = require("http")
const App = Connect()

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
        App.use(PathFile)
        Status = "Yes";
    } catch(e) {
        console.error(e)
        Status = "No";
    }
    LoadedTable.addRow(Path, Status);
}

console.log(LoadedTable.toString());

HTTP.createServer(App).listen(PORT, () => {
    console.log("Your app is now live!");
    console.log();
    console.log("---------------------------");
    console.log(`URL: http://localhost:${PORT}/`);
    console.log("---------------------------");
})