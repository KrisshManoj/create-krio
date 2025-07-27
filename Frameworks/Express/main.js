const Express = require("express")
const App = Express()
const AsciiTable = require("ascii-table")

const FS = require("node:fs")
const Paths = FS.readdirSync("./Paths/").filter(i => i.endsWith("js"))

const LoadedTable = new AsciiTable("Loaded Files")
const PORT = 8080

LoadedTable.setHeading("File", "Status")

for (const Path of Paths) {
    var Status = "No"
    try {
        const PathFile = require(`./Paths/${Path}`)
        App.use(PathFile)
        Status = "Yes"
    } catch(e) {
        Status = "No"
    }
    LoadedTable.addRow(Path, Status)
}

console.log(LoadedTable.toString())

App.listen(PORT, () => {
    console.log("Your app is now live!")
    console.log()
    console.log("---------------------------")
    console.log(`URL: http://localhost:8080`)
    console.log("---------------------------")
})
