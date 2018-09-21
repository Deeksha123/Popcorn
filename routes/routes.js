var loginCollection = require("../database/serve").signIn;
var registerCollection = require("../database/serve").signUp;

var appRouter = function (app) {

    app.get("/", (req, res) => {
        res.send("Hello World");
    });

    app.post('/register', (req, res) => {
        console.log("request body is ", req.body);
        
        var userToAdd = new registerCollection (req.body);
        userToAdd.save();
        res.send(200, req.body)
    });
    
}
  
module.exports = appRouter;