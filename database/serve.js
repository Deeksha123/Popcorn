var mongoose = require("mongoose");

mongoose.connect('mongodb://deeksha:awasthi100@ds149252.mlab.com:49252/pippop', { useNewUrlParser: true });

var registerSchema = mongoose.Schema({

        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true }

    }, { 
        collection: 'register_collection' 
    }
);

var movieCollectionSchema = mongoose.Schema({

        name: { type: String },
        IMDB: { type: String },
        caste: [{
            Actor: String,
            Actress: String,
            Director: String,
            Producer: String
        }],
        release_date: { type: String },
        genure: { type: String },
        description: { type: String },
        running_time: { type: String },
        src: { type: String }

    },{
        collection: 'movie_details'
    }
)

var userCommentsCollection = mongoose.Schema({

        img: { type: String },
        user_info: [{
            user_id: { type: String },
            name: { type: String },
            comment: { type: String },
            comment_date: { type: String },
            user_rating: { type: Number },
            loggedIn: { type: Boolean },
        }]
    }, {
        collection: "user_details"
    }
);

var loginCredentialCollection = mongoose.Schema({

        loggedInUser_Id: { type: String },
        selectedMovie_Id: { type: String }
    }, {
        collection: "login_collection"
    }
)

var registerCollection = mongoose.model('register',registerSchema);
var moviecollection = mongoose.model('movieData',movieCollectionSchema);
var commentsStack = mongoose.model('CommentsData',userCommentsCollection);
var credentialsObj = mongoose.model('credentialObj',loginCredentialCollection);

module.exports = {"signUp": registerCollection, "movieData": moviecollection, "commentsData": commentsStack, "credentialObj": credentialsObj };