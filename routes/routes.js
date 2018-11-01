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

                //Set logged in user id in login collection object.
                var newObj = {};
                newObj.loggedInUser_Id = docs[0]._id;
                credentialObj.find(function(err, result) {
                    if(result.length == 0) {
                        let loginIdToUpdate = new credentialObj( newObj );
                        loginIdToUpdate.save();
                    }
                    else {
                        console.log("Already existing document of login collection", result);
                        let oldLoggedInUser_Id = result[0].loggedInUser_Id;
                        credentialObj.update( {"loggedInUser_Id": oldLoggedInUser_Id}, newObj , function(err, docs) {
                            //For future user, done something after updating login collection with new user 
                        })
                    }
                });
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
        let tempArr = req.params.uid.split("_");
        let currLoginId = tempArr[1];
        let currMovieId = tempArr[0].split(":")[1];
        movieCollection.find({ _id: currMovieId }, function(err, result) {
            if(result == [] || result == undefined) 
                res.status(404).send( "No movie found with this id in collection." );
            else{
                res.status(200).send( result );
                //Set movie id selected from dashboard in login collection.
                var obj = {};
                obj.loggedInUser_Id = currLoginId;
                obj.selectedMovie_Id = currMovieId;
                credentialObj.find(function(err, result) {
                    if(result[0].selectedMovie_Id == undefined) {
                        credentialObj.updateOne( {'loggedInUser_Id': currLoginId}, obj , function(err, doc) {
                            // For future use.
                        })
                    } else {
                        credentialObj.updateMany( {'loggedInUser_Id': currLoginId}, {
                            'selectedMovie_Id' : currMovieId
                        }, function(err, doc) {
                            // For future use.
                        })
                    }
                    
                })
            }
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

    app.get('/login_user', (req, res) => {
        credentialObj.find(function(err, result) {
            if(result == []) 
                res.status(404).send("No user found");
            else
                res.status(200).send(result);
        })
    });
    
}
  
module.exports = appRouter;