const http = require('http');
const app = require('./app');
require('dotenv').config();

const server = http.createServer(app);


server.listen(process.env.port,(req,res,next)=>{
    console.log('server Started');
});
