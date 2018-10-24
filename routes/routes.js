var registerCollection = require("../database/serve").signUp;
var movieCollection = require("../database/serve").movieData;
var commentsCollection = require("../database/serve").commentsData;
var credentialObj = require("../database/serve").credentialObj;

var appRouter = function (app) {

    app.get("/", ( req, res ) => {
        res.send("Hello World");
    });

    //Add new user in registeration collection after successful registration.
    app.post('/register', ( req, res ) => {
        var localObj = req.body;
        localObj.loggedIn = false;
        req.body = localObj;
        var userToAdd = new registerCollection (req.body);
        userToAdd.save();
        res.status(200).send(req.body);
    });

    //Authenticating login credentials.
    app.post('/login', ( req, res ) => {
        registerCollection.find({ 'email': req.body.email }, function(err, docs) {
            if( docs == undefined || docs == [] )
                res.status(400).send( "Incorrect user ID." );
            else if( docs[0].password != req.body.password )
                res.status(404).send( "Incorrect password." );
            else{
                res.status(200).send( docs );

                //Set logged in user id in login collection.
                var newObj = {};
                newObj.loggedInUser_Id = docs[0]._id;
                var loginIdToUpdate = new credentialObj( newObj );
                loginIdToUpdate.save();
            } 
        })
    });

    //Get all movies from movie collection database.
    app.get('/dashboard', (req, res) => {
        movieCollection.find(function(err, result) {
            if(result == [] || result == undefined) 
                res.status(404).send( "Movie collection is empty." );
            else
                res.status(200).send( result );
        });
        
    });

    app.get('/player/:uid', (req, res) => {
        let tempArr = req.params.uid.split(':');
        let id = tempArr[1];
        movieCollection.find({ _id: id }, function(err, result) {
            if(result == [] || result == undefined) 
                res.status(404).send( "No movie found with this id in collection." );
            else
                res.status(200).send( result );

            //Set movie id selected from dashboard in login collection.
            console.log("result", result);
            // var obj = {};
            credentialObj.find(function(err, eq) {
                eq[0].selectedMovie_id = result[0]._id;
                // eq.save();
            });
              
        })
    });

    app.get('/movieplayer/:uid', (req, res) => {
        let tempArr = req.params.uid.split(':');
        let id = tempArr[1];
        commentsCollection.find({ id: id }, function(err, result) {
            if(result == [] || result == undefined) 
                res.status(404).send( "Comments statck is null." );
            else
                res.status(200).send( result );
        })
    });
    
}
  
module.exports = appRouter;