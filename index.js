var http = require('http')
var config = require('./config.json')

var pg = require('pg')

// var writeData =  require('./writedata.js')

// writeData(config.keys, config.timer)

var server = http.createServer(route)

server.listen(process.env.PORT || 5000, function listening() {
  console.log("Server serving...")
})

function route(req, res) {

  // if (req.url === ('/')) {
  //   res.statusCode = 200
  //   res.end("HELLO")
  //   return res
  // }

  if (req.url === ('/db')) {
    pg.connect(process.env.HEROKU_POSTGRESQL_ROSE_URL, function(err, client, done) {
      if (err) return console.error('error fetching client from pool', err)
      client.query('SELECT * FROM test_table', function(err, result) {
        done()
        if (err)
         { console.error(err); res.send("Error " + err) }
        else
         { console.log(result.rows); res.send(result.rows) }
      })
    })
  }
}
