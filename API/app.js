// Modules
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv').config()
const colors = require('colors')

// Port
const port = process.env.PORT || 5000;

// DB
const connectDB = require('./config/db')

// Auth Modules
const passport = require('passport');
const passportAzureAd = require('passport-azure-ad');

// Auth Config
const authConfig = require('./authConfig');

// Router
const router = require('./routes/index');
const { initialize } = require('passport');

// Mongodb Connection
connectDB()

// App initialize
const app = express();

// Apply the rate limiting middleware to all requests
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use(limiter)

//Enable Modules
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));


// Initializing Auth Strategy
const bearerStrategy = new passportAzureAd.BearerStrategy({
    identityMetadata: `https://${authConfig.metadata.authority}/${authConfig.credentials.tenantID}/${authConfig.metadata.version}/${authConfig.metadata.discovery}`,
    issuer: `https://${authConfig.metadata.authority}/${authConfig.credentials.tenantID}/${authConfig.metadata.version}`,
    clientID: authConfig.credentials.clientID,
    audience: authConfig.credentials.clientID, // audience is this application
    validateIssuer: authConfig.settings.validateIssuer,
    passReqToCallback: authConfig.settings.passReqToCallback,
    loggingLevel: authConfig.settings.loggingLevel,
    loggingNoPII: authConfig.settings.loggingNoPII,
}, (req, token, done) => {

    /**
     * Access tokens that have neither the 'scp' (for delegated permissions) nor
     * 'roles' (for application permissions) claim are not to be honored.
     */
    if (!token.hasOwnProperty('scp') && !token.hasOwnProperty('roles')) {
        return done(new Error('Unauthorized'), null, "No delegated or app permission claims found");
    }

    /**
     * If needed, pass down additional user info to route using the second argument below.
     * This information will be available in the req.user object.
     */
    return done(null, {}, token);
});
app.use(passport.initialize());
passport.use(bearerStrategy);

app.use('/auth',(req,res)=>{
    console.log(req.body)
    res.send("Hello AUth")
})

// Initializing Api
app.use('/api', (req, res, next) => {
    passport.authenticate('oauth-bearer', {
        session: false,

    }, (err, user, info) => {
        if (err) {
            /**
             * An error occurred during authorization. Either pass the error to the next function
             */
            return res.status(401).json({ error: err.message });
        }

        if (!user) {
            // If no user object found, send a 401 response.
            return res.status(401).json({ error: 'Unauthorized' });
        }

        if (info) {
            // access token payload will be available in req.authInfo downstream
            req.authInfo = info;
            return next();
        }
    })(req, res, next);
},
    router, // the router with all the routes
    (err, req, res, next) => {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // send error response
        res.status(err.status || 500).send(err);
    }
);


// Initializing Server  
app.listen(port, () => {
    console.log('Listening on port ' + port);
});

module.exports = app;



