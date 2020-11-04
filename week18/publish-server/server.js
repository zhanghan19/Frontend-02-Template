let http = require('http');
let https = require('https');
let unzipper = require('unzipper')
let querystring = require('querystring')

// 2 auth 路由：接受code，用code+client_id + client_secret换token
function auth(request, response) {
  let query = querystring.parse(request.url.match(/^\/auth\?([\s\S]+)$/)[1]);
  console.log(query)
  getToken(query.code, function(info) {
    console.log(info)
    // response.write(JSON.stringify(info))
    response.write(`<a href="http://localhost:3002?token=${info.access_token}">publish</a>`)
    response.end();
  })
}

function getToken(code, callback) {
  let request = https.request({
    hostname: "github.com",
    path: `/login/oauth/access_token?code=${code}&client_id=Iv1.f1ef0ae6f95002ea&client_secret=fbb82b78a095473702f3192165086f0eb1e80339`,
    port: 443,
    method: "POST"
  }, function(response) {
    let body = ""
    response.on('data', chunk => {
      body += chunk.toString()
    })
    
    response.on('end', chunk => {
      console.log(body)
      callback(querystring.parse(body))
    })

  })
 

  request.end();
}

// 4 publish 路由：用token获取用户信息，检查全限，接受发布
function publish(request, response) {
  let query = querystring.parse(request.url.match(/^\/publish\?([\s\S]+)$/)[1])
  getUser(query.token, info => {
    if(info.login === "zhanghan19"){
      request.pipe(unzipper.Extract({path: '../server/public/'}));
      response.on('end', function() {
        response.end("success!")
      })
    }
  })
 
}

function getUser(token, callback) {
  let request = https.request({
    hostname: "api.github.com",
    path: `/user`,
    port: 443,
    method: "GET",
    heaeders: {
      "Authorization": `token ${token}`,
      "User-Agent": "zhanghan19"
    }
  }, function(response) {
    let body = ""
    response.on('data', chunk => {
      body += chunk.toString()
    })
    
    response.on('end', chunk => {
      // "User-Agent" 找不到
      // '\r\nRequest forbidden by administrative rules. Please make sure your request has a User-Agent header (http://developer.github.com/v3/#user-agent-required). Check https://developer.github.com for other possible causes.\r\n'

      console.log(body)
      callback(JSON.parse(body))
    })

  })
  request.end();
}

http.createServer(function(request, response) {
  if(request.url.match(/^\/auth\?/))
    return auth(request, response)
  if(request.url.match(/^\/publish\?/))
    return publish(request, response)
  // let outFile = fs.createWriteStream('../server/public/tmp.zip')
  // request.pipe(outFile)
  // request.pipe(unzipper.Extract({path: '../server/public/'}));
}).listen(3001);

