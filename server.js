var app = require('./app');
const http = require('http');
const server = http.createServer(app);

// Where your server and express app are being defined:

var models = require('./models');

// ... other stuff

models.User.sync({})
.then(function () {
    return models.Page.sync({})
})
.then(function () {
    server.listen(3001, function () {
        console.log('Server is listening on port 3001!');
    });
})
.catch(console.error);




// server.listen(3000,function(){
// 	console.log('listening to port 3000');
// });