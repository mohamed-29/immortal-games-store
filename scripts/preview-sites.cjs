const http = require("node:http")
const fs = require("node:fs")
const path = require("node:path")

const root = path.resolve(process.argv[2] ?? "dist")
const port = Number(process.argv[3] ?? 8010)
const types = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".json": "application/json", ".jpg": "image/jpeg", ".png": "image/png", ".webp": "image/webp", ".woff2": "font/woff2", ".ico": "image/x-icon" }

http.createServer((request, response) => {
  try {
    const url = new URL(request.url, "http://localhost")
    let filename = path.resolve(root, `.${decodeURIComponent(url.pathname)}`)
    if (!filename.startsWith(`${root}${path.sep}`) && filename !== root) {
      response.writeHead(403).end()
      return
    }
    if (fs.existsSync(filename) && fs.statSync(filename).isDirectory()) filename = path.join(filename, "index.html")
    if (!fs.existsSync(filename)) {
      response.writeHead(404).end("Page not found")
      return
    }
    response.writeHead(200, { "Content-Type": types[path.extname(filename)] ?? "application/octet-stream" })
    if (request.method === "HEAD") response.end()
    else fs.createReadStream(filename).pipe(response)
  } catch {
    response.writeHead(400).end("Invalid request")
  }
}).listen(port, "127.0.0.1", () => console.log(`Local: http://127.0.0.1:${port}`))
