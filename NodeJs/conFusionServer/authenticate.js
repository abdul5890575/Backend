var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');
var JwtStrategy= require('passport-jwt').Strategy;
var ExtractJkt= require('passport-jwt').ExtractJwt;
var jwt= require('jsonwebtoken');

var config=require('./config');

passport.use(new LocalStrategy(User.authenticate())); //local strategy
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken=function(user){                        //token authentication
    return jwt.sign(user, config.secretKey, 
        {expiresIn:100000});
};

var opts={};
opts.jwtFromRequest= ExtractJkt.fromAuthHeaderAsBearerToken();
opts.secretOrKey= config.secretKey;

exports.jwtPassport= passport.use(new JwtStrategy(opts,
    (jwt_payload,done)=>{
       
        User.findOne({_id: jwt_payload._id},(err,user)=>{
            if (err){
                return done(err,false);
            }
            else if (user){
                return done(null,user);
            }
            else{
                return done(null,false);
            }
        });

    }));

    

exports.verifyUser= passport.authenticate('jwt',{session:false});

exports.verifyAdmin = (req, res, next) =>{
    if(req.user.admin == true){
        res.statusCode = 200;
        next();
    }
    else{
        res.statusCode = 403;
        var err = new Error('You are not authorized to perform this operation!');
        next(err);
    }
};





  