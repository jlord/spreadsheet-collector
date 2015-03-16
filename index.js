var http = require('http')
var Tabletop = require('tabletop')
var pg = require('pg')

var config = require('./config.json')

var server = http.createServer(route)
pg.defaults.ssl = true

server.listen(process.env.PORT || 5000, function listening() {
  console.log("Server serving...")
})

function route(req, res) {

  if (req.url === ('/')) {
    res.statusCode = 200
    res.end("Hai.")
    return res
  }

  if (req.url === ('/fetch')) {

    config.keys.forEach(function(key) {
      var sskey = Object.keys(key)
      var opts = {key: sskey[0], callback: writeDatabase, simpleSheet: true}
      Tabletop.init(opts)
    })

    // TABLE SPREADSHEETS(SSKEY, SSNAME, SSJSON);
    function writeDatabase(data, tabletop) {
      console.log(tabletop.foundSheetNames)
      pg.connect(process.env.HEROKU_POSTGRESQL_ROSE_URL, function(err, client, done) {
        if (err) return console.error('error fetching client from pool', err)
        var querytext = 'INSERT INTO spreadsheets VALUES ($1,$2,$3)'
        client.query(querytext, [tabletop.key, tabletop.foundSheetNames, JSON.stringify(data)], function(err, result) {
          done()
          if (err)
           { console.error(err); res.end("Error " + err) }
          else
           { res.end("Great. Thanks.") }
        })
      })
    }
  }

}
