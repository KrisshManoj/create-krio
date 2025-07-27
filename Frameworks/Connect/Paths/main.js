/* 
Sample Route
Displays Hello World
*/

module.exports = (Request, Response, Next) => {
   if (Request.method === "GET" && Request.url === "/") {
      Response.end("Hello World!")
   } else {
      Next()
   }
}