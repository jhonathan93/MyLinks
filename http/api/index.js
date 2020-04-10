const http = require('http')
const URL = require('url')
const fs = require('fs')
const path = require('path')
const data = require('./urls.json')

function writeFile(CallBack) {
  fs.writeFile(path.join(__dirname, 'urls.json'), JSON.stringify(data, null, 2), (err) => {
    if (err) throw err
    CallBack(JSON.stringify({message: "ok"}))
  })
}

http.createServer((Request, Response) => {
  const { name, url, del } = URL.parse(Request.url, true).query

  Response.writeHead(200,  {
    'Access-Control-Allow-Origin': "http://localhost:5000"
  })

  if(!name || !url) {
    return Response.end(JSON.stringify(data))
  }

  if (del) {
    data.urls = data.urls.filter(item => String(item.url) !== String(url))
    return writeFile((message) => {
      Response.end(message)
    })
  }

  data.urls.push({name, url})

  return writeFile((message) => {
    Response.end(message)
  })

}).listen(3000, () => console.log('Api is running'))
