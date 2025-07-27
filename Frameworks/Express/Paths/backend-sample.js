const Router = require("express").Router()
const Path = require("node:path")
/* 
Sample Backend Route
Returns a JSON Data
*/
Router.get("/backend", (Request, Response) => {
    Response.send({ message: "Hello World!" })
})

module.exports = Router