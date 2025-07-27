/* 
Sample Route
Displays Hello World
*/

module.exports.Path = "/";  
module.exports.Type = "GET"    
module.exports.Route = (Request, Response, Next) => {
   Response.end("Hello World")
}