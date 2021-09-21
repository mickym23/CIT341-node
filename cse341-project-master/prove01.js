const http = require('http');
const { listenerCount } = require('process');
let users = ["User 1", "User 2", "User 3"];

const serverHandler = (req, res) => {

   const url = req.url;
   const method = req.method;
  

   if (url === '/') {
      res.setHeader('Content-Type', 'text/html');
      res.write('<html><head><title>Home Page</title></head>');
      res.write('<body><h1>Hello there! Welcome to the Home Page!</h1>');
      res.write('<br><form method="post" action="/create-user"><input type="text" name="username"><button type="submit">Enter</button>');
      res.write('</form><br><a href="./users">List of Users</a>');
      res.write('</body></html>');
      return res.end();
   }; 

   if (url === '/users') {
      res.setHeader('Content-Type', 'text/html');
      res.write('<html>');
      res.write('<body><ul>');
      for (user of users) {
      res.write(`<li>${user}</li>`);
      }
      res.write('</ul><p>test</p></body></html>');
      return res.end();
   }; 

   if (url === "/create-user" && method === "POST") {
      const body = [];
      req.on('data', chunk => {
         body.push(chunk);
      });
      req.on('end', () => {
         const parsedBody = Buffer.concat(body).toString();
         let user = parsedBody.split('=')[1];
         users.push(user);
         console.log(user);
      });
         res.statusCode = 302;
         res.setHeader('Location', '/');
         return res.end();
   };
};

const route = serverHandler;

const server = http.createServer(route);

server.listen(3000);