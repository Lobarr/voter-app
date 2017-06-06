const helmet = require('helmet');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const passport = require('passport');
const expressValidator = require('express-validator');
const flash = require('connect-flash')
const morgan = require('morgan')


module.exports = (app) => {
  app.use(helmet())
  app.use(morgan('common'))  
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))  
  app.use(cookieParser());
  app.use(session({
    secret: 'pollerAppSecret',
    resave: true,
    saveUninitialized: true
  }))
  app.use(passport.initialize())
  app.use(passport.session({}))
  app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
        , root    = namespace.shift()
        , formParam = root;

      while(namespace.length) {
        formParam += '[' + namespace.shift() + ']';
      }
      return {
        param : formParam,
        msg   : msg,
        value : value
      };
    }
  })); 
  app.use(flash())  
  app.use((req, res, next) => {
    res.locals.messages = require('express-messages')(req,res);
    next();
  })
}