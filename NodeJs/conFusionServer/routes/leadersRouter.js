const express = require('express');
const bodyParser = require('body-parser');
const leadersRouter = express.Router();

leadersRouter.use(bodyParser.json());

leadersRouter.route('/')

.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-type', 'text/plain');
    next();
})

.get((req, res, next) => {
    res.end("Will send all the leaders to you!");
})

.post((req, res, next) => {
    res.end('Will add the leader: ' + req.body.name +
    ' with details: ' + req.body.description);
})

.put((req, res, next) =>{
    res.statusCode = 403;
    res.end('PUT not supported'); 
})

.delete((req, res, next) => {
    res.end('Deleting all the leaders');
});

leadersRouter.route('/:leaderId')

.get((req, res, next) => {
    res.end("Will send details of the leader: " +
    req.params.leaderId + " to you");
})

.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST not supported ' +  req.params.leaderId); 
})

.put((req, res, next) =>{
   res.write('Updating the leader: ' + req.params.leaderId + '\n');
   res.end('Will update the leader: ' + req.body.name + 
   ' with details: ' + req.body.description);
})

.delete((req, res, next) => {
    res.end('Deleting the leader: ' + req.params.leaderId);
});


module.exports = leadersRouter;