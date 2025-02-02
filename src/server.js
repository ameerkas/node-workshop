var http = require('http');
var fs = require('fs');
var path= require('path');
var message = 'I am so happy to be part of the Node Girls workshop!';
var server = http.createServer(handler);
server.listen(3000, function () {

    console.log("Server is listening on port 3000. Ready to accept requests!");
});

function handler (request, response) {
    var endpoint = request.url;
    var method = request.method;
    console.log(endpoint);

     if(endpoint.indexOf('.')!== -1){
        const extention = endpoint.split('.')[1];
        const extentionType = { 
        html: ' text/html',
        css:'text/css',
        js:'application/javascript',
        icon: 'image/x-icon',
        jpg :'image/jpeg'
        }
        const filepath=path.join(__dirname,'../public',endpoint);
        fs.readFile(filepath,(error,file)=>
        {
            if(error){
                console.log(error);
                response.writeHead(500,{'Content-type':extentionType.html})
                response.end('<h1>We have error</h1>')
            }
            else {
                response.writeHead(200,{'Content-type':extentionType[extention]});
                response.end(file);
            }
        })   
    }

    else if (endpoint === '/') {
        const filepath=path.join(__dirname,'..','public','index.html');
        fs.readFile(filepath, function(error, file)  {
         if (error) {
        console.log(error);
        response.end(error);
        }
        else{ 
        response.writeHead(200,{'Content-type':'text/html'});
        response.end(file);
        }
        });
    }
    else if(endpoint==='/node')
    {
        response.end('NODE');   
    }
    else if (endpoint=== '/girls'){
        response.end('GIRL');   
    }
    else{
        response.writeHead(404);
        response.end('PAGE NOT found');   
    }
  }
  



