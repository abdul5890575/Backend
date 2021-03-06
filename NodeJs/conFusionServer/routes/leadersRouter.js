const express = require('express');
const bodyParser = require('body-parser');
const leadersRouter = express.Router({ mergeParams: true });

leadersRouter.use(bodyParser.json());
const Leaders = require('../models/leaders');

leadersRouter.route('/')

.get((req,res,next) => {
    Leaders.find({})
    .then((Leaders) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(Leaders);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    Leaders.create(req.body)
    .then((Leader) => {
        console.log('Leader Created ', Leader);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(Leader);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes');
})
.delete((req, res, next) => {
    Leaders.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});


leadersRouter.route('/:leaderId')

.get((req,res,next) => {
    Leaders.findById(req.params.leaderId)
    .then((Leader) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(Leader);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /dishes/'+ req.params.dishId);
})
.put((req, res, next) => {
    Leaders.findByIdAndUpdate(req.params.leaderId, {
        $set: req.body
    }, { new: true })
    .then((Promotion) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(PLeader);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Leaders.findByIdAndRemove(req.params.leaderId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
})

module.exports = leadersRouter;