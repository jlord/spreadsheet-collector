var http = require('http')

var server = http.createServer(route)

server.listen(process.env.PORT || 5000, function listening() {
  console.log("Server serving...")
})

function route(req, res) {
  if (req.url === ('/')) {
    res.statusCode = 200
    res.end("HELLO")
    return res
  }
}
