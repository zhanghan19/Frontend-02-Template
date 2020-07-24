const http = require('http');

http.createServer((req, res) => {
    let body = [];
    req.on("error", (err) => {
        console.error(err)
    }).on("data", (chunk) => {
        body.push(chunk.toString());
    }).on('end', () => {
        // body = Buffer.concat(body).toString();
        console.log("body:", body);
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(`<html>
        <head>
            <meta charset="utf-8">
            <title></title>
            <style type="text/css">
    
            </style>
        </head>
        <body>
        <h1>hello world</h1>
            
        </body>
    </html>
    `)
    })
}).listen(3000, () => {
    console.log("server started")
})