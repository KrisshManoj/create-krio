const Router = require("express").Router()
const Path = require("node:path")
/* 
Sample Frontend Route
Returns a Web page (NO CSS)
*/
Router.get("/", (Request, Response) => {
    Response.sendFile(Path.join(__dirname, "../Pages/main.html"))
})

module.exports = Router