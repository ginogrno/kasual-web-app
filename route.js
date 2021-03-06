const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/') {
        res.write('<head><title>Enter Message</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
        res.write('</html>');
        res.write('<html>');
        return res.end();
    
    } if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFile('message.txt', message, err => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
    }
    // process.exit();
    res.setHeader('Content-Type', 'text`/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title></head>');
    res.write('<body>Hello from node.js server!</body>');
    res.write('</html>');
    res.end();
};

// first way to export module
// module.exports = requestHandler;

// second way to export module
// module.exports = {
//     handler: requestHandler,
//     someText: 'Some hard coded text'0
// };

//third way to export module
module.exports.handler = requestHandler;
module.exports.someText = 'Some hard coded text';
