const http = require('http')
const fs = require('fs')
const path = require('path')

http.createServer((Request, Response) => {
  const file = Request.url === '/' ? 'index.html' : Request.url
  const filePath = path.join(__dirname, 'public', file)
  const extname = path.extname(filePath)

  const allowedFileTypes = ['.html', '.css', '.js']
  const alowed = allowedFileTypes.find(item => item == extname)

  if(!alowed) return

  fs.readFile(filePath, (err, content) => {
    if(err) throw err

    Response.end(content)
  })
}).listen(5000, () => console.log('Server is running'))
