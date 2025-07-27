const AsciiTable = require("ascii-table");
const FS = require("node:fs");
const Paths = FS.readdirSync("./Paths/").filter(i => i.endsWith("js")).map(i => require(`./Paths/${i}`));
const PORT = 8080;

const TurboHttp = require("turbo-http");

const App = TurboHttp.createServer((Request, Response) => {
    const Method = Request.method
    const Url = Request.url

    const Route = Paths.find(i => i.Method === Method && i.Path === Url)

    if (Route) {
        try {
            Route.Route(Request, Response)
        } catch(e) {
            console.log(e)
        }
    }
})

App.listen(PORT, () => {
    console.log("Your app is now live!");
    console.log();
    console.log("---------------------------");
    console.log(`URL: http://localhost:${PORT}/`);
    console.log("---------------------------");
})