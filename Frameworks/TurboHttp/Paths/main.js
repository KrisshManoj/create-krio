module.exports.Path = "/"
module.exports.Method = "GET"
module.exports.Route = (Request, Response) => {
    Response.setHeader("Content-Type", "text/plain")
    Response.end("Hello World!")
}