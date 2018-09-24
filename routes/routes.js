var loginCollection = require("../database/serve").signIn;
var registerCollection = require("../database/serve").signUp;

var appRouter = function (app) {

    app.get("/", ( req, res ) => {
        res.send("Hello World");
    });

    app.post('/register', ( req, res ) => {
        var localObj = req.body;
        localObj.loggedIn = false;
        req.body = localObj;
        var userToAdd = new registerCollection (req.body);
        userToAdd.save();
        res.status(200).send(req.body);
    });

    app.post('/login', ( req, res ) => {
        var userAuth = new loginCollection (req.body);
        // userAuth.find( { 'email': req.body.email }, function(err, docs) {
        //     console.log("docs found", docs);
        // })
    });
    
}
  
module.exports = appRouter;