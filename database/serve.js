var mongoose = require("mongoose");

mongoose.connect('mongodb://deeksha:awasthi100@ds149252.mlab.com:49252/pippop', { useNewUrlParser: true });

var loginSchema = mongoose.Schema({

        email: { type: String, required: true },
        password: { type: String, required: true }

    }, { 
        collection: 'login_collection' 
    }
);

var registerSchema = mongoose.Schema({

        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true }

    }, { 
        collection: 'register_collection' 
    }
)

var loginCollection = mongoose.model('login', loginSchema);

var registerCollection = mongoose.model('register',registerSchema);

module.exports = {"signIn": loginCollection, "signUp": registerCollection};